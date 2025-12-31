
import React from 'react';

export enum OSState {
  BOOTING = 'BOOTING',
  LOCK_SCREEN = 'LOCK_SCREEN',
  DESKTOP = 'DESKTOP',
}

export type AppID = 
  | 'browser' 
  | 'gemini' 
  | 'messages' 
  | 'files' 
  | 'notes' 
  | 'settings' 
  | 'camera' 
  | 'gallery' 
  | 'meet' 
  | 'word' 
  | 'excel' 
  | 'ppt' 
  | 'onenote'
  | 'store'
  | 'terminal'
  | 'calculator'
  | 'school'; // New School Management App

export interface User {
  username: string;
  avatar: string;
  isAdmin: boolean;
}

export interface AppConfig {
  id: AppID;
  name: string;
  icon: React.ReactNode;
  color: string;
  adminOnly?: boolean;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
