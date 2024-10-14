import React from 'react';
import AddTask from '../AddTask/AddTask';
import TaskList from '../TaskList/TaskList';
import { TaskProvider } from '../../context/TaskContext';

// Main component for the tasks page
const Tasks: React.FC = () => {
  return (
    <TaskProvider>
      <div className="flex flex-col mx-auto items-center w-full">
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default Tasks;
