import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import messageService from '../services/messageService';

const ChatContext = createContext(null);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used inside <ChatProvider>');
  return ctx;
};

const POLL_INTERVAL = 5000; // ms — poll every 5 seconds when a chat is open

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations]     = useState([]);
  const [activeMessages, setActiveMessages]   = useState([]);
  const [activeRecipientId, setActiveRecipientId] = useState(null);
  const [unreadCount, setUnreadCount]         = useState(0);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState(null);

  const pollIntervalRef = useRef(null);
  const lastMessageTimestampRef = useRef(null);

  // ── Fetch conversations list ─────────────────────────────────────────────────
  const fetchConversations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await messageService.getConversations();
      setConversations(data);
      const total = data.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
      setUnreadCount(total);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Open a conversation ──────────────────────────────────────────────────────
  const fetchMessages = useCallback(async (recipientId) => {
    setLoading(true);
    setActiveRecipientId(recipientId);
    try {
      const data = await messageService.getMessages(recipientId);
      setActiveMessages(data);
      // Track the timestamp of the newest message for polling
      if (data.length > 0) {
        lastMessageTimestampRef.current = data[data.length - 1].createdAt;
      }
      // Mark conversation as read
      await messageService.markAsRead(recipientId);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Send a message ───────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (recipientId, content) => {
    try {
      const newMessage = await messageService.sendMessage(recipientId, content);
      setActiveMessages((prev) => [...prev, newMessage]);
      lastMessageTimestampRef.current = newMessage.createdAt;
      // Refresh conversation list so the last-message preview updates
      fetchConversations();
      return newMessage;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchConversations]);

  // ── Polling: new messages while a chat is open ───────────────────────────────
  useEffect(() => {
    if (!activeRecipientId) return;

    const poll = async () => {
      try {
        const newMsgs = await messageService.pollNewMessages(
          activeRecipientId,
          lastMessageTimestampRef.current
        );
        if (newMsgs && newMsgs.length > 0) {
          setActiveMessages((prev) => [...prev, ...newMsgs]);
          lastMessageTimestampRef.current = newMsgs[newMsgs.length - 1].createdAt;
        }
      } catch {
        // Silent fail — polling errors should not disrupt the UI
      }
    };

    pollIntervalRef.current = setInterval(poll, POLL_INTERVAL);
    return () => clearInterval(pollIntervalRef.current);
  }, [activeRecipientId]);

  // ── Close a conversation (stop polling) ──────────────────────────────────────
  const closeChat = useCallback(() => {
    clearInterval(pollIntervalRef.current);
    setActiveRecipientId(null);
    setActiveMessages([]);
    lastMessageTimestampRef.current = null;
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeMessages,
        activeRecipientId,
        unreadCount,
        loading,
        error,
        fetchConversations,
        fetchMessages,
        sendMessage,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
