
export enum AppView {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD', // Beranda
  LITERACY_LAB = 'LITERACY_LAB', // Bicara AI
  IKIGAI_ENGINE = 'IKIGAI_ENGINE', // Eksplorasi Diri
  INTEGRITY_STUDIO = 'INTEGRITY_STUDIO', // Lab Karya
  ETHICAL_FORUM = 'ETHICAL_FORUM', // Forum Etika
  ETHICS_ARCHIVE = 'ETHICS_ARCHIVE', // Was Ethics Guide
  EDIT_PROFILE = 'EDIT_PROFILE'
}

export interface UserProfile {
  id?: string; // Added for database integration
  name: string;
  email: string;
  username?: string; // Virtual field for display
  university: string;
  major: string;
  literacyProgress: number;
  avatarColor: string;
  xp: number;
  level: number;
  badges: string[];
}

export interface ReflectionEntry {
  id: string;
  date: string;
  answers: Record<string, string>;
  aiAnalysis: string;
}

export interface LiteracyTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
}

// Database-related types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirementType: string;
  requirementValue: number;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  content: string | null;
  status: 'draft' | 'submitted' | 'reviewed';
  aiFeedback: string | null;
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
