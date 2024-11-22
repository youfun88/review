import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
    unique: true
  },
  stripeCustomerId: {
    type: String,
    required: true
  },
  stripeSubscriptionId: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true,
    enum: ['monthly', 'yearly']
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'past_due', 'canceled', 'unpaid']
  },
  currentPeriodStart: {
    type: Date,
    required: true
  },
  currentPeriodEnd: {
    type: Date,
    required: true
  },
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});