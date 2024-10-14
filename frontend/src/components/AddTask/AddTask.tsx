import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import AddGroupModal from '../GroupModal/GroupModal';

const AddTask: React.FC = () => {
  const { createTask, groups, createGroup, fetchGroups } = useTasks();
  const [newTask, setNewTask] = useState({
    done: false,
    id: 0,
    title: '',
    description: '',
    group: '',
    deadline: '',
    hour: '',
  });
  // State to manage the visibility of the group modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; deadline?: string }>(
    {}
  );

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'add-new-group') {
      // Open modal if "Add New Group" is selected
      setIsModalOpen(true);
    } else {
      setNewTask({ ...newTask, group: e.target.value });
    }
  };

  const handleCreateTask = () => {
    const { title, deadline } = newTask;
    const newErrors: { title?: string; deadline?: string } = {};

    if (!title) {
      newErrors.title = 'Title cannot be empty';
    }
    if (!deadline) {
      newErrors.deadline = 'Deadline cannot be empty';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const taskGroup = newTask.group || 'General';
    createTask({
      ...newTask,
      group: taskGroup,
      deadline: `${newTask.deadline} ${newTask.hour}`,
    });
    setNewTask({
      done: false,
      id: 0,
      title: '',
      description: '',
      group: '',
      deadline: '',
      hour: '',
    });
    setErrors({});
  };

  const handleSaveGroup = (groupName: string) => {
    createGroup(groupName);
    setNewTask({ ...newTask, group: groupName });
    setIsModalOpen(false);
  };

  return (
    <div className="mb-4">
      <h1 className="text-2xl mb-4 flex w-full items-center  justify-center py-6">
        ToDo App
      </h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newTask.title}
        onChange={handleInputChange}
        className="border p-2 mr-2"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newTask.description}
        onChange={handleInputChange}
        className="border p-2 mr-2"
      />
      <input
        type="date"
        name="deadline"
        value={newTask.deadline}
        onChange={handleInputChange}
        className="border p-2 mr-2"
      />

      <input
        type="time"
        name="hour"
        value={newTask.hour}
        onChange={handleInputChange}
        className="border p-2 mr-2"
      />
      <select
        name="group"
        value={newTask.group}
        onChange={handleGroupChange}
        className="border p-2 mr-2"
      >
        {groups.map(group => (
          <option key={group.id} value={group.name}>
            {group.name}
          </option>
        ))}
        <option value="add-new-group">Add New Group</option>
      </select>
      <button
        onClick={handleCreateTask}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        Add Task
      </button>
      <AddGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGroup}
      />
      {errors.deadline && <p className="text-red-500">{errors.deadline}</p>}
      {errors.title && <p className="text-red-500">{errors.title}</p>}
    </div>
  );
};

export default AddTask;
