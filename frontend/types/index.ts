export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
  leadCount?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  leadCount?: number;
  leads?: Lead[];
}

export interface Lead {
  id: string;
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  priority: Priority;
  value?: number;
  notes?: string;
  actions?: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  user?: User;
}

export type LeadStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL'
  | 'WON'
  | 'LOST'
  | 'FOLLOW_UP';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface LeadStats {
  total: number;
  byStatus: Record<LeadStatus, number>;
  byPriority: Record<Priority, number>;
  totalValue: number;
  avgValue: number;
  recent: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationMeta;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  color?: string;
}

export interface CreateLeadRequest {
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: LeadStatus;
  priority?: Priority;
  value?: number;
  notes?: string;
  actions?: string;
  categoryId: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface LeadsFilters {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  status?: LeadStatus;
  priority?: Priority;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} 