

export type Language = 'fi' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface AuthContextType {
  user: any;
  login: (provider: 'google' | 'apple' | 'email') => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export interface BikeCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  description: string; // Brief explanation of the task
  duration: string; // e.g., "15 min"
  difficulty: 'Helppo' | 'Keskitaso' | 'Vaativa' | 'Easy' | 'Medium' | 'Hard';
  icon: string; // Lucide icon name mapping
  tools: string[]; // List of required tools
}

export interface GuideStep {
  id: number;
  title: string;
  description: string;
  tip?: string;
  imageUrl?: string; // Optional specific image for step
  isUserUploaded?: boolean; // Flag to indicate if the image is from user
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ServiceLogEntry {
  id: string;
  taskTitle: string;
  date: string;
  notes?: string;
  category: 'maintenance' | 'repair' | 'upgrade';
  imageUrl?: string; // URL or Base64 string of the attached photo
}

export interface Reminder {
  id: string;
  title: string;
  dueDate: string;
  isOverdue: boolean;
}

export interface MaintenanceScheduleItem {
    id: string;
    taskTitle: string;
    reason: string;
    status: 'critical' | 'upcoming' | 'ok';
    actionText: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  items: ChecklistItem[];
}

export interface BikeStats {
  kilometers: number;
  lastServiceDate: string; // YYYY-MM-DD
  ridingConditions: 'muddy' | 'dusty' | 'road' | 'mixed';
  weeklyHours: number;
}

export interface AIAnalysis {
  summary: string; // Short summary
  urgency: 'low' | 'medium' | 'high';
  recommendedTasks: string[]; // IDs of recommended tasks
}

export type InventoryCategory = 'tool' | 'part' | 'chemical';
export type InventoryStatus = 'owned' | 'needed';

export interface InventoryItem {
    id: string;
    name: string;
    category: InventoryCategory;
    status: InventoryStatus;
}