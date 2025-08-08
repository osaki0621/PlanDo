import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import Mascot from './components/Mascot';
import ChatBot from './components/ChatBot';
import ThemeCustomizer from './components/ThemeCustomizer';
import QuickLinks from './components/QuickLinks';
import { Assignment, TodoItem, Theme } from './types';
import { loadData, saveData } from './utils/storage';

function App() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [theme, setTheme] = useState<Theme>({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    backgroundColor: '#F8FAFC',
    accentColor: '#F59E0B'
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const data = loadData();
    if (data.assignments) setAssignments(data.assignments);
    if (data.todos) setTodos(data.todos);
    if (data.theme) setTheme(data.theme);
  }, []);

  useEffect(() => {
    saveData({ assignments, todos, theme });
  }, [assignments, todos, theme]);

  const addAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = {
      ...assignment,
      id: Date.now().toString(),
      type: assignment.type || 'assignment'
    };
    setAssignments(prev => [...prev, newAssignment]);
  };

  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: theme.primaryColor }}
          >
            📚 PlanDo
          </h1>
          <p className="text-gray-600 text-lg">
            課題管理・予定管理・癒し、すべてがここに ✨
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar & Todo */}
          <div className="lg:col-span-2 space-y-6">
            <Calendar 
              assignments={assignments}
              onAddAssignment={addAssignment}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              theme={theme}
            />
            
            <TodoList 
              todos={todos}
              onAddTodo={addTodo}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
              theme={theme}
            />
          </div>

          {/* Right Column - Mascot & Tools */}
          <div className="space-y-6">
            <Mascot 
              theme={theme} 
              onChatOpen={() => setIsChatOpen(true)}
            />
            
            <ThemeCustomizer 
              theme={theme}
              onThemeChange={setTheme}
            />
            
            <QuickLinks theme={theme} />
          </div>
        </div>

        {/* Chat Modal */}
        <ChatBot 
          theme={theme}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;