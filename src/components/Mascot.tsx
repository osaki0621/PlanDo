import React from 'react';
import { Theme } from '../types';

interface Props {
  theme: Theme;
  onChatOpen: () => void;
}

const Mascot: React.FC<Props> = ({ theme, onChatOpen }) => {
  return (
    <div>
      <h2 style={{ color: theme.accentColor }}>Mascot</h2>
      {/* TODO: 実装 */}
      <button onClick={onChatOpen}>Chatを開く</button>
    </div>
  );
};

export default Mascot;
