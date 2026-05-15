import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Paperclip, Send, Phone, Video, MessageSquare } from 'lucide-react';
import messageService from '../../services/messageService';

const CONVERSATIONS = [
  { id: 1, name: "David Kimani", avatar: "https://i.pravatar.cc/150?img=11", lastMessage: "I'll be there at 9 AM tomorrow.", time: "10:30 AM", unread: 2, online: true },
  { id: 2, name: "Alice N.", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "Thank you for the excellent work!", time: "Yesterday", unread: 0, online: false },
  { id: 3, name: "Brian O.", avatar: "https://i.pravatar.cc/150?img=15", lastMessage: "Can you send the quotation?", time: "Mon", unread: 0, online: true },
  { id: 4, name: "Sarah Wanjiku", avatar: "https://i.pravatar.cc/150?img=5", lastMessage: "Yes, that schedule works for me.", time: "Sun", unread: 0, online: false },
];

const MESSAGES = [
  { id: 1, sender: "David Kimani", text: "Hello! I saw your plumbing request.", time: "10:15 AM", isOutgoing: false },
  { id: 2, sender: "You", text: "Hi David, yes. The sink is leaking quite badly.", time: "10:20 AM", isOutgoing: true },
  { id: 3, sender: "David Kimani", text: "I can come over and take a look. Are you available tomorrow morning?", time: "10:25 AM", isOutgoing: false },
  { id: 4, sender: "You", text: "Tomorrow morning is perfect. Say, around 9 AM?", time: "10:28 AM", isOutgoing: true },
  { id: 5, sender: "David Kimani", text: "I'll be there at 9 AM tomorrow.", time: "10:30 AM", isOutgoing: false },
];

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await messageService.getConversations();
        const convs = Array.isArray(data) ? data : data.conversations || [];
        setConversations(convs);
        if (convs.length > 0) setActiveChat(convs[0]);
      } catch (err) {
        console.warn("Backend not reachable. Falling back to dummy conversations.");
        setConversations(CONVERSATIONS);
        setActiveChat(CONVERSATIONS[0]);
      } finally {
        setLoadingConvs(false);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!activeChat) return;
    const fetchMessages = async () => {
      setLoadingMsgs(true);
      try {
        const data = await messageService.getMessages(activeChat.id || activeChat._id);
        setMessages(Array.isArray(data) ? data : data.messages || []);
      } catch (err) {
        console.warn("Backend not reachable. Falling back to dummy messages.");
        setMessages(MESSAGES);
      } finally {
        setLoadingMsgs(false);
      }
    };
    fetchMessages();
  }, [activeChat]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeChat) return;
    
    // Optimistic UI update
    const newMsg = {
      id: Date.now(),
      text: messageText,
      isOutgoing: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setMessageText("");

    try {
      await messageService.sendMessage(activeChat.id || activeChat._id, newMsg.text);
    } catch (err) {
      console.warn("Message failed to send to backend.");
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white font-outfit overflow-hidden">
      
      {/* Sidebar (30%) */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-100 flex flex-col bg-[#F9FAFB]">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-700"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {loadingConvs ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-10 text-slate-500">No conversations yet.</div>
          ) : (
            conversations.map((conv) => (
              <div 
                key={conv.id || conv._id} 
                onClick={() => setActiveChat(conv)}
                className={`flex items-center gap-3 p-4 border-b border-slate-50 cursor-pointer transition-colors ${
                  activeChat?.id === conv.id || activeChat?._id === conv._id ? 'bg-blue-50' : 'hover:bg-slate-50 bg-white'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={conv.avatar || `https://ui-avatars.com/api/?name=${conv.name}`} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
                  {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 truncate text-sm">{conv.name}</h3>
                    <span className="text-xs text-slate-400 shrink-0">{conv.time || 'Now'}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{conv.lastMessage || '...'}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center rounded-full shrink-0">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area (70%) */}
      {activeChat ? (
        <div className="hidden md:flex flex-col flex-1 bg-white">
          
          {/* Chat Header */}
          <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={activeChat.avatar || `https://ui-avatars.com/api/?name=${activeChat.name}`} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                {activeChat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              <div>
                <h2 className="font-bold text-slate-900">{activeChat.name}</h2>
                <p className="text-xs text-green-500 font-medium">{activeChat.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-[#2563EB] transition-colors"><Phone className="w-5 h-5" /></button>
              <button className="hover:text-[#2563EB] transition-colors"><Video className="w-5 h-5" /></button>
              <button className="hover:text-slate-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Messages Display */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#F9FAFB]">
            <div className="text-center mb-8">
              <span className="bg-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Today
              </span>
            </div>
            
            {loadingMsgs ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id || msg._id} className={`flex ${msg.isOutgoing ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${msg.isOutgoing ? 'order-1' : 'order-2'}`}>
                      <div 
                        className={`px-5 py-3 rounded-2xl ${
                          msg.isOutgoing 
                            ? 'bg-[#2563EB] text-white rounded-tr-sm' 
                            : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm shadow-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text || msg.content}</p>
                      </div>
                      <p className={`text-xs mt-1 text-slate-400 ${msg.isOutgoing ? 'text-right' : 'text-left'}`}>
                        {msg.time || 'Just now'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
              <button className="p-2 text-slate-400 hover:text-[#2563EB] transition-colors shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-slate-50 border border-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-slate-700"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage} className="p-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-full transition-colors shrink-0 flex items-center justify-center shadow-sm">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="hidden md:flex flex-col flex-1 bg-[#F9FAFB] items-center justify-center text-slate-400">
          <MessageSquare className="w-16 h-16 mb-4 text-slate-300" />
          <p>Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default Chat;