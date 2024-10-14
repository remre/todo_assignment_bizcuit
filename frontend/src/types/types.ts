export interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface Group {
  id: number;
  name: string;
}

export interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (groupName: string) => void;
}
export interface Task {
  id: number;
  title: string;
  description: string;
  group: string;
  hour: string;
  deadline: string;
  done: boolean;
}

export interface TaskOrderProps {
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
}
export interface TaskInputProps {
  task: Partial<Task>;
  groups: Group[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
export interface TaskCardProps {
  task: Task;
  handleEditClick: (task: Task) => void;
  handleDeleteClick: (id: number) => void;
}
export interface TaskContextType {
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
