import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { ChatMessage, Theme } from '../types';

interface ChatBotProps {
  theme: Theme;
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ theme, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'こんにちは！勉強のことで何か困ったことはある？気軽に話しかけてね！🐻',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // 挨拶
    if (lowerMessage.includes('こんにちは') || lowerMessage.includes('おはよう') || lowerMessage.includes('こんばんは')) {
      return 'こんにちは！今日も勉強がんばろうね！何か手伝えることはある？✨';
    }
    
    // 疲れた・つらい
    if (lowerMessage.includes('疲れ') || lowerMessage.includes('つらい') || lowerMessage.includes('しんどい')) {
      return '勉強お疲れさま！少し休憩してもいいよ。深呼吸して、好きな飲み物でも飲んでリフレッシュしよう！君ならきっとできるよ🌟';
    }
    
    // やる気がない
    if (lowerMessage.includes('やる気') || lowerMessage.includes('やりたくない') || lowerMessage.includes('めんどう')) {
      return 'やる気が出ない時もあるよね。まずは5分だけでもやってみない？小さな一歩から始めよう！君の頑張りをいつも見てるよ💪';
    }
    
    // 勉強方法
    if (lowerMessage.includes('勉強') && (lowerMessage.includes('方法') || lowerMessage.includes('やり方') || lowerMessage.includes('コツ'))) {
      return 'いい質問だね！ポモドーロ法（25分勉強→5分休憩）がおすすめだよ。あとは分からないことはすぐに調べて、定期復習も大切！一緒に頑張ろう📚';
    }
    
    // 課題・宿題
    if (lowerMessage.includes('課題') || lowerMessage.includes('宿題') || lowerMessage.includes('レポート')) {
      return '課題があるんだね！まずは何をやるべきか整理して、優先順位をつけてみよう。一つずつクリアしていけば大丈夫！応援してるよ📝';
    }
    
    // テスト・試験
    if (lowerMessage.includes('テスト') || lowerMessage.includes('試験') || lowerMessage.includes('受験')) {
      return 'テスト勉強お疲れさま！計画的に進めることが大切だよ。過去問を解いたり、友達と問題を出し合ったりするのもいいね。君なら絶対できる！🎯';
    }
    
    // 時間管理
    if (lowerMessage.includes('時間') && (lowerMessage.includes('足りない') || lowerMessage.includes('管理') || lowerMessage.includes('ない'))) {
      return '時間管理は難しいよね。ToDoリストを作って優先順位をつけたり、スマホの時間を減らしたりしてみて。小さな工夫で時間は作れるよ⏰';
    }
    
    // 集中できない
    if (lowerMessage.includes('集中') || lowerMessage.includes('気が散る')) {
      return '集中できない時は環境を変えてみて！机を片付けたり、図書館に行ったり。音楽を聞きながらでもいいよ。自分に合った方法を見つけよう🎵';
    }
    
    // 褒められたい・頑張った
    if (lowerMessage.includes('頑張っ') || lowerMessage.includes('やった') || lowerMessage.includes('できた')) {
      return 'すごいじゃない！よく頑張ったね！その調子で続けていこう。君の努力は必ず報われるよ。本当にお疲れさま！🎉';
    }
    
    // 分からない
    if (lowerMessage.includes('分からない') || lowerMessage.includes('わからない') || lowerMessage.includes('難しい')) {
      return '分からないことがあるのは当然だよ！先生や友達に聞いたり、便利リンクのChatGPTやQANDAを使ってみて。一緒に解決していこう🤔';
    }
    
    // 感謝
    if (lowerMessage.includes('ありがとう') || lowerMessage.includes('助かる')) {
      return 'どういたしまして！君の役に立てて嬉しいよ。いつでも話しかけてね。一緒に頑張ろう！😊';
    }
    
    // デフォルトレスポンス
    const defaultResponses = [
      'そうなんだね！もう少し詳しく教えてくれる？君の話をもっと聞きたいな🐻',
      'なるほど！君はいつも一生懸命だね。何か手伝えることがあったら言ってね✨',
      'そういうこともあるよね。でも君なら大丈夫！いつでも応援してるからね💪',
      'いい考えだね！君の頑張りを見てると、僕も嬉しくなるよ。一緒に頑張ろう🌟',
      'そうだね！困ったことがあったら、いつでも相談してね。君の味方だよ😊'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // 少し遅延を入れて自然な会話感を演出
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-96 flex flex-col shadow-2xl">
        {/* Header */}
        <div 
          className="p-4 rounded-t-2xl text-white flex items-center justify-between"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🐻</span>
            </div>
            <div>
              <h3 className="font-bold">マスコットチャット</h3>
              <p className="text-xs opacity-90">勉強の相談相手</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-2xl ${
                  message.isUser
                    ? 'text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
                style={message.isUser ? { backgroundColor: theme.primaryColor } : {}}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('ja-JP', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="メッセージを入力..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="px-3 py-2 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;