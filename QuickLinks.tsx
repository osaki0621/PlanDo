import React from 'react';
import { ExternalLink, MessageCircle, HelpCircle, BookOpen, Calculator } from 'lucide-react';
import { Theme } from '../types';

interface QuickLinksProps {
  theme: Theme;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ theme }) => {
  const links = [
    {
      name: 'ChatGPT',
      url: 'https://chat.openai.com',
      icon: MessageCircle,
      description: 'AI チャット'
    },
    {
      name: 'QANDA',
      url: 'https://qanda.ai',
      icon: HelpCircle,
      description: '質問・回答'
    },
    {
      name: 'Wolfram Alpha',
      url: 'https://www.wolframalpha.com',
      icon: Calculator,
      description: '数学・計算'
    },
    {
      name: 'Khan Academy',
      url: 'https://www.khanacademy.org',
      icon: BookOpen,
      description: '学習動画'
    }
  ];

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 
        className="text-xl font-bold mb-4 flex items-center gap-2"
        style={{ color: theme.primaryColor }}
      >
        <ExternalLink size={24} />
        便利リンク
      </h3>

      <div className="space-y-3">
        {links.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <button
              key={index}
              onClick={() => handleLinkClick(link.url)}
              className="w-full p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${theme.primaryColor}20` }}
                >
                  <IconComponent 
                    size={20} 
                    style={{ color: theme.primaryColor }} 
                  />
                </div>
                <div className="flex-1">
                  <h4 
                    className="font-medium"
                    style={{ color: theme.primaryColor }}
                  >
                    {link.name}
                  </h4>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
                <ExternalLink 
                  size={16} 
                  className="text-gray-400 group-hover:text-gray-600 transition-colors" 
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* 追加のお役立ち情報 */}
      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${theme.backgroundColor}50` }}>
        <h4 className="text-sm font-medium text-gray-700 mb-2">💡 勉強のコツ</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 25分勉強→5分休憩のポモドーロ法を試してみよう</li>
          <li>• わからない問題はすぐに調べて解決しよう</li>
          <li>• 定期的に復習して記憶を定着させよう</li>
        </ul>
      </div>
    </div>
  );
};

export default QuickLinks;