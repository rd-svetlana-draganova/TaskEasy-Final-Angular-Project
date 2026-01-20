export interface Task {
  id: string;
  title: string;
  description: string;
  estimation: string;
  assignedTo: 'user1' | 'user2' | 'user3';
  status: 'to-do' | 'in-progress' | 'done';
}
