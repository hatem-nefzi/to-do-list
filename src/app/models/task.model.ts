export interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;  // 1-5
  dueDate: string;
  completed: boolean;
  userId: string;
}