export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  LOG_ANALYSIS = 'LOG_ANALYSIS',
  SECURITY = 'SECURITY'
}

export interface MetricPoint {
  time: string;
  iops: number;
  latency: number;
  throughput: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  component: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface StorageNode {
  id: string;
  name: string;
  status: 'Healthy' | 'Degraded' | 'Offline';
  capacity: number; // in TB
  used: number; // in TB
  temp: number; // in Celsius
  raidStatus?: string;
  firmware?: string;
  totalDisks?: number;
  onlineDisks?: number;
}