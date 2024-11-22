import React, { useState } from 'react';
import { MessageSquare, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Ticket {
  id: string;
  storeId: string;
  storeName: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
  }[];
}

export function SupportTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      storeId: '1',
      storeName: '自己的眼鏡',
      title: '優惠券系統無法使用',
      description: '客戶反映無法領取優惠券，請協助查看',
      status: 'pending',
      priority: 'high',
      createdAt: '2024-03-18 14:30',
      updatedAt: '2024-03-18 14:30',
      messages: [
        {
          id: '1',
          sender: '店家',
          content: '客戶反映無法領取優惠券，請協助查看',
          timestamp: '2024-03-18 14:30'
        }
      ]
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;

    const updatedTicket = {
      ...selectedTicket,
      messages: [
        ...selectedTicket.messages,
        {
          id: Date.now().toString(),
          sender: '系統管理員',
          content: newMessage,
          timestamp: new Date().toLocaleString()
        }
      ],
      updatedAt: new Date().toLocaleString()
    };

    setTickets(prev => prev.map(ticket =>
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    ));
    setSelectedTicket(updatedTicket);
    setNewMessage('');
  };

  const updateTicketStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets(prev => prev.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, status, updatedAt: new Date().toLocaleString() }
        : ticket
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status } : null);
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* 問題列表 */}
      <div className="col-span-12 lg:col-span-5">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold">問題列表</h3>
          </div>
          <div className="divide-y">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedTicket?.id === ticket.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{ticket.title}</h4>
                    <p className="text-sm text-gray-500">{ticket.storeName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status === 'pending' ? '待處理' :
                     ticket.status === 'processing' ? '處理中' : '已解決'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className={`flex items-center gap-1 ${getPriorityColor(ticket.priority)}`}>
                    <AlertCircle size={16} />
                    {ticket.priority === 'high' ? '高' :
                     ticket.priority === 'medium' ? '中' : '低'}優先
                  </span>
                  <span className="text-gray-500">{ticket.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 問題詳情 */}
      {selectedTicket ? (
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{selectedTicket.title}</h3>
                <p className="text-sm text-gray-500">{selectedTicket.storeName}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateTicketStatus(selectedTicket.id, 'processing')}
                  className={`p-2 rounded-lg ${
                    selectedTicket.status === 'processing'
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-blue-50 text-blue-600'
                  }`}
                >
                  <MessageSquare size={20} />
                </button>
                <button
                  onClick={() => updateTicketStatus(selectedTicket.id, 'resolved')}
                  className={`p-2 rounded-lg ${
                    selectedTicket.status === 'resolved'
                      ? 'bg-green-100 text-green-700'
                      : 'hover:bg-green-50 text-green-600'
                  }`}
                >
                  <CheckCircle size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedTicket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === '系統管理員' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === '系統管理員'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}>
                    <div className="text-sm mb-1">
                      {message.sender} · {message.timestamp}
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="輸入回覆內容..."
                  className="flex-1 px-4 py-2 border rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                >
                  發送
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white rounded-xl shadow-lg h-full flex items-center justify-center text-gray-500">
            選擇一個問題來查看詳情
          </div>
        </div>
      )}
    </div>
  );
}