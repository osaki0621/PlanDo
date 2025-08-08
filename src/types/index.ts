export interface Assignment {
  id: string;
  title: string;
  date: Date;
  description?: string;
  completed?: boolean;
  type: 'assignment' | 'event';
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  accentColor: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}