export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}
export interface TasksState {
  tasks: Task[];
  filter: Priority | 'All';
}