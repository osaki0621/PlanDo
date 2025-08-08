import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Assignment, Theme } from '../types';

interface AssignmentFormProps {
  onSubmit: (assignment: Omit<Assignment, 'id'>) => void;
  onCancel: () => void;
  theme: Theme;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({
  onSubmit,
  onCancel,
  theme
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'assignment' | 'event'>('assignment');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date) {
      onSubmit({
        title,
        date: new Date(date),
        description: description || undefined,
        type
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 
            className="text-xl font-bold"
            style={{ color: theme.primaryColor }}
          >
            新しい{type === 'assignment' ? '課題' : '予定'}を追加
          </h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              種類 *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="assignment"
                  checked={type === 'assignment'}
                  onChange={(e) => setType(e.target.value as 'assignment' | 'event')}
                  className="mr-2"
                />
                <span className="text-red-600 font-medium">📚 課題</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="event"
                  checked={type === 'event'}
                  onChange={(e) => setType(e.target.value as 'assignment' | 'event')}
                  className="mr-2"
                />
                <span className="text-blue-600 font-medium">📅 予定</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'assignment' ? '課題名' : '予定名'} *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={type === 'assignment' ? '例: 数学レポート' : '例: 学校説明会'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'assignment' ? '提出期限' : '日時'} *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              詳細 (任意)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={type === 'assignment' ? '課題の詳細や注意点など...' : '予定の詳細や場所など...'}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: theme.primaryColor }}
            >
              追加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentForm;