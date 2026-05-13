import api from './api';

const messageService = {
  /**
   * Get the list of all conversations for the current user.
   * Each conversation contains the last message and the other participant.
   */
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  /**
   * Get all messages exchanged with a specific recipient.
   * @param {string} recipientId
   */
  getMessages: async (recipientId) => {
    const response = await api.get(`/messages/${recipientId}`);
    return response.data;
  },

  /**
   * Send a message to a recipient.
   * @param {string} recipientId
   * @param {string} content
   */
  sendMessage: async (recipientId, content) => {
    const response = await api.post('/messages', { recipientId, content });
    return response.data;
  },

  /**
   * Mark all messages in a conversation as read.
   * @param {string} recipientId
   */
  markAsRead: async (recipientId) => {
    const response = await api.put(`/messages/${recipientId}/read`);
    return response.data;
  },

  /**
   * Poll for new messages since a given timestamp.
   * Used as a lightweight alternative to WebSockets.
   * @param {string} recipientId
   * @param {string} since - ISO timestamp of the last message received
   */
  pollNewMessages: async (recipientId, since) => {
    const response = await api.get(`/messages/${recipientId}/poll`, {
      params: { since },
    });
    return response.data;
  },
};

export default messageService;
