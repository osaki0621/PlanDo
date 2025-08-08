import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Assignment, Theme } from '../types';
import AssignmentForm from './AssignmentForm';

interface CalendarProps {
  assignments: Assignment[];
  onAddAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  theme: Theme;
}

const Calendar: React.FC<CalendarProps> = ({
  assignments,
  onAddAssignment,
  currentDate,
  onDateChange,
  theme
}) => {
  const [showForm, setShowForm] = useState(false);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    onDateChange(prev);
  };

  const nextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    onDateChange(next);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getAssignmentsForDay = (day: number) => {
    return assignments.filter(assignment => {
      const assignmentDate = new Date(assignment.date);
      return (
        assignmentDate.getDate() === day &&
        assignmentDate.getMonth() === currentDate.getMonth() &&
        assignmentDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const isDueSoon = (assignment: Assignment) => {
    const today = new Date();
    const dueDate = new Date(assignment.date);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return assignment.type === 'assignment' && diffDays <= 3 && diffDays >= 0;
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => null);

  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 
          className="text-2xl font-bold"
          style={{ color: theme.primaryColor }}
        >
          📅 カレンダー
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <Plus size={20} />
          課題追加 & 予定追加
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <h3 className="text-xl font-semibold">
          {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {dayNames.map(day => (
          <div key={day} className="text-center font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Empty Days */}
        {emptyDays.map((_, index) => (
          <div key={index} className="h-24"></div>
        ))}
        
        {/* Calendar Days */}
        {days.map(day => {
          const dayAssignments = getAssignmentsForDay(day);
          return (
            <div
              key={day}
              className={`h-24 p-2 border rounded-lg ${
                isToday(day) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="font-medium text-sm mb-1">{day}</div>
              <div className="space-y-1">
                {dayAssignments.map(assignment => (
                  <div
                    key={assignment.id}
                    className={`text-xs p-1 rounded truncate ${
                      assignment.type === 'assignment'
                        ? isDueSoon(assignment)
                          ? 'bg-red-200 text-red-900 font-medium border border-red-300'
                          : 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                    title={assignment.title}
                  >
                    {assignment.type === 'assignment' ? '📚' : '📅'} {assignment.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Assignment Form Modal */}
      {showForm && (
        <AssignmentForm
          onSubmit={(assignment) => {
            onAddAssignment(assignment);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Calendar;