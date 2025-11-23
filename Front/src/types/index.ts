// Types for SmartEdit Text Editor

export interface Document {
  id?: string;
  content: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Snapshot {
  id: string;
  content: string;
  timestamp: string;
  description?: string;
}

export interface Command {
  type: 'insert' | 'delete' | 'replace';
  position: number;
  text: string;
  oldText?: string;
}

export interface StatusInfo {
  wordCount: number;
  charCount: number;
  lineCount: number;
}

export type SaveFormat = 'txt' | 'md' | 'html';

export interface SaveOptions {
  format: SaveFormat;
  filename: string;
}

export interface FormatType {
  type: 'bold' | 'italic' | 'underline';
  start: number;
  end: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
