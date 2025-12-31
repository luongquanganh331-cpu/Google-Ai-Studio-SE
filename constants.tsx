
import React from 'react';
import { 
  Globe, 
  MessageSquare, 
  Folder, 
  FileText, 
  Settings, 
  Camera, 
  Image, 
  Video, 
  FileEdit, 
  Table, 
  Presentation, 
  StickyNote,
  ShoppingBag,
  Terminal,
  Calculator,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { AppConfig } from './types';

export const APPS: AppConfig[] = [
  { id: 'browser', name: 'Browser', icon: <Globe size={24} />, color: 'bg-blue-500' },
  { id: 'gemini', name: 'Gemini AI', icon: <Sparkles size={24} />, color: 'bg-purple-600' },
  { id: 'school', name: 'School Manager', icon: <GraduationCap size={24} />, color: 'bg-emerald-600', adminOnly: true },
  { id: 'messages', name: 'Messages', icon: <MessageSquare size={24} />, color: 'bg-emerald-500' },
  { id: 'files', name: 'Files', icon: <Folder size={24} />, color: 'bg-amber-500' },
  { id: 'notes', name: 'Notes', icon: <FileText size={24} />, color: 'bg-yellow-500' },
  { id: 'settings', name: 'Settings', icon: <Settings size={24} />, color: 'bg-slate-500' },
  { id: 'camera', name: 'Camera', icon: <Camera size={24} />, color: 'bg-zinc-600' },
  { id: 'gallery', name: 'Gallery', icon: <Image size={24} />, color: 'bg-indigo-500' },
  { id: 'meet', name: 'Google Meet', icon: <Video size={24} />, color: 'bg-green-600' },
  { id: 'word', name: 'Word', icon: <FileEdit size={24} />, color: 'bg-blue-700' },
  { id: 'excel', name: 'Excel', icon: <Table size={24} />, color: 'bg-emerald-700' },
  { id: 'ppt', name: 'PowerPoint', icon: <Presentation size={24} />, color: 'bg-orange-600' },
  { id: 'onenote', name: 'OneNote', icon: <StickyNote size={24} />, color: 'bg-purple-700' },
  { id: 'store', name: 'Store', icon: <ShoppingBag size={24} />, color: 'bg-pink-500' },
  { id: 'terminal', name: 'Terminal', icon: <Terminal size={24} />, color: 'bg-gray-800' },
  { id: 'calculator', name: 'Calculator', icon: <Calculator size={24} />, color: 'bg-green-500' },
];

export const FORBIDDEN_KEYWORDS = ['18+', 'xxx', 'porn', 'adult', 'sex', 'gambling'];
