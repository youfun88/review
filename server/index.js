import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

// Webhook handling for subscription events
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle subscription events
  switch (event.type) {
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      await updateSubscriptionStatus(subscription);
      break;
    case 'invoice.payment_failed':
      const invoice = event.data.object;
      await handleFailedPayment(invoice);
      break;
  }

  res.json({ received: true });
});

app.post('/api/create-subscription', async (req, res) => {
  try {
    const { email, paymentMethod, priceId, storeId } = req.body;

    // Create customer
    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethod,
      invoice_settings: { default_payment_method: paymentMethod },
    });

    // Create subscription with automatic renewal
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      payment_behavior: 'default_incomplete',
      collection_method: 'charge_automatically',
    });

    // Save subscription details to database
    await saveSubscription({
      storeId,
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      plan: subscription.items.data[0].price.recurring.interval,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    });

    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      customerId: customer.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check subscription status
app.get('/api/subscription/:storeId', async (req, res) => {
  try {
    const subscription = await getSubscription(req.params.storeId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Check if subscription is active
    const isActive = subscription.status === 'active' && 
                    new Date() <= new Date(subscription.currentPeriodEnd);

    res.json({
      isActive,
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel subscription at period end
app.post('/api/subscription/:subscriptionId/cancel', async (req, res) => {
  try {
    const subscription = await stripe.subscriptions.update(req.params.subscriptionId, {
      cancel_at_period_end: true
    });

    await updateSubscriptionStatus(subscription);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resume canceled subscription
app.post('/api/subscription/:subscriptionId/resume', async (req, res) => {
  try {
    const subscription = await stripe.subscriptions.update(req.params.subscriptionId, {
      cancel_at_period_end: false
    });

    await updateSubscriptionStatus(subscription);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});