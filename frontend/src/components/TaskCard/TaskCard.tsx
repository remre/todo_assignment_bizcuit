import React from 'react';
import { TaskCardProps } from '../../types/types';

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <div className="flex items-center w-[900px]">
      <h2 className="text-xl mr-2 w-1/6 truncate">Name:{task.title}</h2>
      <p className="mr-2 w-1/6 truncate">Desc:{task.description}</p>
      <p className="mr-2 w-1/6 truncate hover:text-clip">Group: {task.group}</p>
      <p className="mr-2 w-1/6 truncate hover:text-clip">
        Deadline: {task.deadline}
      </p>
      <p className="mr-2  truncate">Status: {task.done ? 'Done' : 'UnDone'}</p>
      <div className="flex ml-auto space-x-2">
        <button
          onClick={() => handleEditClick(task)}
          className="bg-yellow-500 text-white p-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteClick(task.id)}
          className="bg-red-500 text-white p-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
