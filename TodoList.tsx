import React, { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';
import { TodoItem, Theme } from '../types';

interface TodoListProps {
  todos: TodoItem[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  theme: Theme;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  theme
}) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 
        className="text-2xl font-bold mb-6"
        style={{ color: theme.primaryColor }}
      >
        ✅ 今日のタスク
      </h2>

      {/* Add Todo Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <Plus size={20} />
          追加
        </button>
      </form>

      {/* Todo Items */}
      <div className="space-y-3">
        {/* Incomplete Todos */}
        {incompleteTodos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <button
              onClick={() => onToggleTodo(todo.id)}
              className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-green-500 transition-colors"
            >
              {todo.completed && <Check size={16} className="text-green-500" />}
            </button>
            <span className="flex-1 text-gray-800">{todo.text}</span>
            <button
              onClick={() => onDeleteTodo(todo.id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {incompleteTodos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🎉</div>
            <p>すべてのタスクが完了しました！</p>
          </div>
        )}

        {/* Completed Todos */}
        {completedTodos.length > 0 && (
          <>
            <div className="border-t pt-4 mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">完了済み ({completedTodos.length})</h3>
              {completedTodos.map(todo => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 opacity-60"
                >
                  <button
                    onClick={() => onToggleTodo(todo.id)}
                    className="w-6 h-6 border-2 border-green-500 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.secondaryColor }}
                  >
                    <Check size={16} className="text-white" />
                  </button>
                  <span className="flex-1 text-gray-600 line-through">{todo.text}</span>
                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;