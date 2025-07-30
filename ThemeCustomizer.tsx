import React from 'react';
import { Palette } from 'lucide-react';
import { Theme } from '../types';

interface ThemeCustomizerProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  theme,
  onThemeChange
}) => {
  const presetThemes = [
    {
      name: '青空',
      theme: {
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981',
        backgroundColor: '#F0F9FF',
        accentColor: '#F59E0B'
      }
    },
    {
      name: '桜色',
      theme: {
        primaryColor: '#EC4899',
        secondaryColor: '#F472B6',
        backgroundColor: '#FDF2F8',
        accentColor: '#8B5CF6'
      }
    },
    {
      name: '抹茶',
      theme: {
        primaryColor: '#059669',
        secondaryColor: '#34D399',
        backgroundColor: '#F0FDF4',
        accentColor: '#F97316'
      }
    },
    {
      name: '夕焼け',
      theme: {
        primaryColor: '#DC2626',
        secondaryColor: '#F97316',
        backgroundColor: '#FEF2F2',
        accentColor: '#FBBF24'
      }
    }
  ];

  const handleColorChange = (colorKey: keyof Theme, value: string) => {
    onThemeChange({
      ...theme,
      [colorKey]: value
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 
        className="text-xl font-bold mb-4 flex items-center gap-2"
        style={{ color: theme.primaryColor }}
      >
        <Palette size={24} />
        テーマカスタマイズ
      </h3>

      {/* プリセットテーマ */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">プリセット</h4>
        <div className="grid grid-cols-2 gap-2">
          {presetThemes.map((preset, index) => (
            <button
              key={index}
              onClick={() => onThemeChange(preset.theme)}
              className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: preset.theme.primaryColor }}
                ></div>
                <span className="text-sm font-medium">{preset.name}</span>
              </div>
              <div className="flex gap-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: preset.theme.primaryColor }}
                ></div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: preset.theme.secondaryColor }}
                ></div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: preset.theme.accentColor }}
                ></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* カスタムカラー */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">カスタムカラー</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600">メインカラー</label>
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              className="w-8 h-8 rounded border border-gray-300"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600">サブカラー</label>
            <input
              type="color"
              value={theme.secondaryColor}
              onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
              className="w-8 h-8 rounded border border-gray-300"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600">背景色</label>
            <input
              type="color"
              value={theme.backgroundColor}
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
              className="w-8 h-8 rounded border border-gray-300"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600">アクセント</label>
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => handleColorChange('accentColor', e.target.value)}
              className="w-8 h-8 rounded border border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* プレビュー */}
      <div className="mt-6 p-4 rounded-lg border border-gray-200">
        <h5 className="text-sm font-medium text-gray-700 mb-2">プレビュー</h5>
        <div className="space-y-2">
          <div 
            className="p-2 rounded text-white text-sm"
            style={{ backgroundColor: theme.primaryColor }}
          >
            メインカラー
          </div>
          <div 
            className="p-2 rounded text-white text-sm"
            style={{ backgroundColor: theme.secondaryColor }}
          >
            サブカラー
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;