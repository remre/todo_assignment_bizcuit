import React, { useState } from 'react';
import { TaskOrderProps } from '../../types/types';

const TaskOrder: React.FC<TaskOrderProps> = ({ orderBy, setOrderBy }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(`${e.target.value}-${sortDirection}`);
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    const [order] = orderBy.split('-');
    setOrderBy(`${order}-${newDirection}`);
  };

  return (
    <div className="task-order py-4">
      <label htmlFor="order-by" className="mr-2">
        Order by:
      </label>
      <select
        id="order-by"
        value={orderBy.split('-')[0]}
        onChange={handleOrderByChange}
        className="border p-2"
      >
        <option value="title">Title</option>
        <option value="deadline">Deadline</option>
        <option value="group">Group</option>
        <option value="done">Status</option>
      </select>
      <button onClick={toggleSortDirection} className="ml-2 p-2 bg-gray-200">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default TaskOrder;
