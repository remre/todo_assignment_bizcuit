import React, { useState } from 'react';
import { Task } from '../../types/types';

import { useTasks } from '../../context/TaskContext';
import TaskInput from '../TaskInput/TaskInput';
import TaskCard from '../TaskCard/TaskCard';
import './TaskList.css';
import TaskOrder from '../TaskOrder/TaskOrder';

const TaskList: React.FC = () => {
  const {
    tasks,
    groups,
    deleteTask,
    updateTask,
    orderBy,
    setOrderBy,
    loading,
  } = useTasks();
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTask(task);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setEditedTask({
      ...editedTask,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveClick = () => {
    if (editingTaskId !== null) {
      updateTask(editingTaskId, editedTask);
      setEditingTaskId(null);
      setEditedTask({});
    }
  };

  const handleCancelClick = () => {
    setEditingTaskId(null);
    setEditedTask({});
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex  flex-col items-center ">
      {tasks.length === 0 && (
        <div className="flex items-center justify-center text-xl py-4">
          Hey, Start adding your first task above and it will be shown just down
          below!
        </div>
      )}
      <h1 className="flex w-full items-center justify-center text-3xl font-bold py-4  bg-gray-200 opacity-90 shadow-lg">
        My Todo List
      </h1>

      <TaskOrder orderBy={orderBy} setOrderBy={setOrderBy} />
      <ul>
        {tasks.map(task => (
          <li
            key={task.id}
            className={`task-item border p-2 mb-2 flex flex-col sm:flex-row items-center ${
              task.done ? 'done' : 'not-done'
            } ${editingTaskId === task.id ? 'editing' : ''}`}
          >
            {editingTaskId === task.id ? (
              <div className="flex items-center w-full">
                <TaskInput
                  task={editedTask}
                  groups={groups}
                  handleInputChange={handleInputChange}
                />
                <label className="flex items-center mr-2 w-1/6">
                  <input
                    type="checkbox"
                    name="done"
                    checked={editedTask.done || false}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Done
                </label>
                <button
                  onClick={handleSaveClick}
                  className="bg-blue-500 text-white p-2 mr-2 w-1/12"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-500 text-white p-2 w-1/12"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <TaskCard
                task={task}
                handleEditClick={handleEditClick}
                handleDeleteClick={deleteTask}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
