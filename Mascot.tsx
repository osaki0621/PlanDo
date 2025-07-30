import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Theme } from '../types';

interface MascotProps {
  theme: Theme;
  onChatOpen: () => void;
}

const Mascot: React.FC<MascotProps> = ({ theme, onChatOpen }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [message, setMessage] = useState('おつかれ！');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // ランダムなまばたき
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 3000);

    // メッセージローテーション
    const messages = ['おつかれ！', 'がんばって！', 'あと少し！', '休憩も大事だよ！'];
    const messageInterval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 8000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
      <h3 
        className="text-xl font-bold mb-4"
        style={{ color: theme.primaryColor }}
      >
        🐻 マスコット
      </h3>
      
      {/* マスコットキャラクター */}
      <div className="relative inline-block mb-4">
        <div className="mascot-container">
          {/* メインボディ */}
          <div className="mascot-body">
            {/* 耳 */}
            <div className="mascot-ear mascot-ear-left"></div>
            <div className="mascot-ear mascot-ear-right"></div>
            
            {/* 顔 */}
            <div className="mascot-face">
              {/* 目 */}
              <div className={`mascot-eye mascot-eye-left ${isBlinking ? 'blinking' : ''}`}></div>
              <div className={`mascot-eye mascot-eye-right ${isBlinking ? 'blinking' : ''}`}></div>
              
              {/* 鼻 */}
              <div className="mascot-nose"></div>
              
              {/* 口 */}
              <div className="mascot-mouth"></div>
              
              {/* ほっぺ */}
              <div className="mascot-cheek mascot-cheek-left"></div>
              <div className="mascot-cheek mascot-cheek-right"></div>
            </div>
            
            {/* 体 */}
            <div className="mascot-belly"></div>
          </div>
        </div>
      </div>

      {/* メッセージ */}
      <div className="message-bubble">
        <p className="text-lg font-medium" style={{ color: theme.primaryColor }}>
          {message}
        </p>
      </div>

      {/* Chat Button */}
      <button
        onClick={onChatOpen}
        className="mt-4 flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity mx-auto"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <MessageCircle size={16} />
        お話しする
      </button>

      <style jsx>{`
        .mascot-container {
          display: inline-block;
          animation: gentle-bounce 3s ease-in-out infinite;
        }

        .mascot-body {
          position: relative;
          width: 100px;
          height: 100px;
          animation: sway 4s ease-in-out infinite;
        }

        .mascot-face {
          width: 80px;
          height: 80px;
          background: #1a1a1a;
          border-radius: 50%;
          position: relative;
          margin: 0 auto;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .mascot-ear {
          width: 25px;
          height: 25px;
          background: #1a1a1a;
          border-radius: 50%;
          position: absolute;
          top: -10px;
        }

        .mascot-ear-left {
          left: 15px;
          animation: ear-wiggle-left 5s ease-in-out infinite;
        }

        .mascot-ear-right {
          right: 15px;
          animation: ear-wiggle-right 5s ease-in-out infinite;
        }

        .mascot-eye {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 25px;
          transition: height 0.15s ease;
        }

        .mascot-eye.blinking {
          height: 2px;
          top: 30px;
        }

        .mascot-eye-left {
          left: 20px;
        }

        .mascot-eye-right {
          right: 20px;
        }

        .mascot-nose {
          width: 6px;
          height: 4px;
          background: #ff6b6b;
          border-radius: 50%;
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
        }

        .mascot-mouth {
          width: 20px;
          height: 10px;
          border: 2px solid white;
          border-top: none;
          border-radius: 0 0 20px 20px;
          position: absolute;
          top: 48px;
          left: 50%;
          transform: translateX(-50%);
        }

        .mascot-cheek {
          width: 15px;
          height: 15px;
          background: #ff9999;
          border-radius: 50%;
          position: absolute;
          top: 35px;
          animation: cheek-glow 2s ease-in-out infinite alternate;
        }

        .mascot-cheek-left {
          left: 5px;
        }

        .mascot-cheek-right {
          right: 5px;
        }

        .mascot-belly {
          width: 60px;
          height: 40px;
          background: #2d2d2d;
          border-radius: 50%;
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
        }

        .message-bubble {
          animation: message-float 2s ease-in-out infinite alternate;
        }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }

        @keyframes ear-wiggle-left {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(5deg); }
        }

        @keyframes ear-wiggle-right {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-5deg); }
        }

        @keyframes cheek-glow {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        @keyframes message-float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default Mascot;