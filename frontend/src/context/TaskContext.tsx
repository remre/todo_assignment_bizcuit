import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Task, Group } from '@/types/types';

interface TaskContextType {
  tasks: Task[];
  groups: Group[];
  createTask: (task: Omit<Task, 'id' | 'done'>) => void;
  deleteTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  createGroup: (name: string) => void;
  fetchGroups: () => void;
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
  loading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth(); // Get user instead of token
  const [tasks, setTasks] = useState<Task[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [orderBy, setOrderBy] = useState<string>('title-asc');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      fetchTasksAndGroups();
    }
  }, [user]);

  const fetchTasksAndGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/tasks');
      // Remove duplicate groups by name
      const uniqueGroups: Group[] = Array.from(
        new Map(response.data.groups.map((group: Group) => [group.name, group]))
      ).map(([, group]) => group as Group);

      setTasks(response.data.tasks);
      setGroups(uniqueGroups);
    } catch (error) {
      console.error('Failed to fetch tasks and groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/tasks/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
  };

  const createTask = async (task: Omit<Task, 'id' | 'done'>) => {
    try {
      const response = await axios.post('/api/tasks', task);
      setTasks([...tasks, { ...task, id: response.data.id, done: false }]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const toggleTaskDone = async (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      try {
        await axios.put(`/api/tasks/${id}`, { done: !task.done });
        setTasks(
          tasks.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
          )
        );
      } catch (error) {
        console.error('Failed to toggle task done:', error);
      }
    }
  };

  const updateTask = async (id: number, updatedTask: Partial<Task>) => {
    try {
      await axios.put(`/api/tasks/${id}`, updatedTask);
      setTasks(
        tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const createGroup = async (name: string) => {
    try {
      const response = await axios.post('/api/tasks/groups', { name });
      setGroups([...groups, { id: response.data.id, name }]);
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const [order, direction] = orderBy.split('-');
    const multiplier = direction === 'asc' ? 1 : -1;

    if (order === 'title') {
      return a.title.localeCompare(b.title) * multiplier;
    } else if (order === 'deadline') {
      return (
        (new Date(a.deadline).getTime() - new Date(b.deadline).getTime()) *
        multiplier
      );
    } else if (order === 'group') {
      return a.group.localeCompare(b.group) * multiplier;
    } else if (order === 'done') {
      return (Number(a.done) - Number(b.done)) * multiplier;
    }
    return 0;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: sortedTasks,
        groups,
        createTask,
        deleteTask,
        toggleTaskDone,
        fetchGroups,
        updateTask,
        createGroup,
        orderBy,
        setOrderBy,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
