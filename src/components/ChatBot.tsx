import React from 'react';
import { Theme } from '../types';

interface Props {
  theme: Theme;
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<Props> = ({ theme, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div style={{ background: theme.backgroundColor, border: `2px solid ${theme.primaryColor}` }}>
      <h2 style={{ color: theme.primaryColor }}>ChatBot</h2>
      {/* TODO: 実装 */}
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};

export default ChatBot;
