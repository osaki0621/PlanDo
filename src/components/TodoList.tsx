import React from 'react';
import { TodoItem, Theme } from '../types';

interface Props {
  todos: TodoItem[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  theme: Theme;
}

const TodoList: React.FC<Props> = ({ todos, onAddTodo, onToggleTodo, onDeleteTodo, theme }) => {
  return (
    <div>
      <h2 style={{ color: theme.secondaryColor }}>TodoList</h2>
      {/* TODO: 実装 */}
    </div>
  );
};

export default TodoList;
