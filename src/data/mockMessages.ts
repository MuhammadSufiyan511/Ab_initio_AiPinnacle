export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  text: string
  timestamp: string
  isOwn: boolean
}

export interface Conversation {
  id: string
  participantName: string
  participantAvatar: string
  participantRole: string
  lastMessage: string
  lastTime: string
  unread: number
  online: boolean
}

export const mockConversations: Conversation[] = [
  { id: 'conv1', participantName: 'Dr. Sarah Chen', participantAvatar: '', participantRole: 'Instructor', lastMessage: 'Great work on the last assignment!', lastTime: '10:42 AM', unread: 2, online: true },
  { id: 'conv2', participantName: 'Prof. Raj Patel', participantAvatar: '', participantRole: 'Instructor', lastMessage: 'The project deadline has been extended.', lastTime: 'Yesterday', unread: 0, online: false },
  { id: 'conv3', participantName: 'Emma Williams', participantAvatar: '', participantRole: 'Instructor', lastMessage: 'Check the updated resources I uploaded.', lastTime: 'Mon', unread: 1, online: true },
  { id: 'conv4', participantName: 'Study Group #1', participantAvatar: '', participantRole: 'Group', lastMessage: 'Anyone free for a study session tonight?', lastTime: 'Sun', unread: 5, online: false },
]

export const mockMessages: Message[] = [
  { id: 'msg1', senderId: 'usr-002', senderName: 'Dr. Sarah Chen', senderAvatar: '', text: 'Hi Alex! How are you finding the TypeScript module?', timestamp: '10:30 AM', isOwn: false },
  { id: 'msg2', senderId: 'usr-001', senderName: 'Alex Johnson', senderAvatar: '', text: 'It\'s been really insightful! The generics section was a bit tricky though.', timestamp: '10:32 AM', isOwn: true },
  { id: 'msg3', senderId: 'usr-002', senderName: 'Dr. Sarah Chen', senderAvatar: '', text: 'That\'s completely normal. I\'ve added extra exercises to the resources. Check lesson 7 again!', timestamp: '10:35 AM', isOwn: false },
  { id: 'msg4', senderId: 'usr-001', senderName: 'Alex Johnson', senderAvatar: '', text: 'Thank you so much! Also, great work on the last assignment!', timestamp: '10:40 AM', isOwn: true },
  { id: 'msg5', senderId: 'usr-002', senderName: 'Dr. Sarah Chen', senderAvatar: '', text: 'Great work on the last assignment!', timestamp: '10:42 AM', isOwn: false },
]
