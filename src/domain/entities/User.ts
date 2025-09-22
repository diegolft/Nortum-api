export interface User {
  id: number;
  email: string;
  fullName: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLogin: Date | null;
}
