import React from 'react';
import { TaskInputProps } from '../../types/types';

const TaskInput: React.FC<TaskInputProps> = ({
  task,
  groups,
  handleInputChange,
}) => {
  return (
    <>
      <input
        type="text"
        name="title"
        value={task.title || ''}
        onChange={handleInputChange}
        className="border p-2 mr-2 w-1/6"
      />
      <input
        type="text"
        name="description"
        value={task.description || ''}
        onChange={handleInputChange}
        className="border p-2 mr-2 w-1/6"
      />
      <input
        type="date"
        name="deadline"
        value={task.deadline?.split(' ')[0] || ''}
        onChange={handleInputChange}
        className="border p-2 mr-2 w-1/6"
      />
      <input
        type="time"
        name="hour"
        value={task.hour?.split(' ')[0] || ''}
        onChange={handleInputChange}
        className="border p-2 mr-2 w-1/6"
      />

      {/* Group Selection */}
      <select
        name="group"
        value={task.group || 'General'}
        onChange={handleInputChange}
        className="border p-2 mr-2 w-1/6"
      >
        {groups.map(group => (
          <option key={group.id} value={group.name}>
            {group.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default TaskInput;
