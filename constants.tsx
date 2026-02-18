
import React from 'react';
import { AppView, LiteracyTopic } from './types';

export const LITERACY_TOPICS: LiteracyTopic[] = [
  {
    // Fix: Added missing required xpReward property
    id: 'intro',
    title: 'AI Fundamentals',
    description: 'Understand the basic building blocks of modern AI systems.',
    icon: '🧠',
    xpReward: 25
  },
  {
    // Fix: Added missing required xpReward property
    id: 'how-it-works',
    title: 'How AI Thinks',
    description: 'Non-technical explanation of neural networks and learning patterns.',
    icon: '⚙️',
    xpReward: 25
  },
  {
    // Fix: Added missing required xpReward property
    id: 'ethics',
    title: 'Ethical Frontiers',
    description: 'Exploring bias, data privacy, and academic integrity.',
    icon: '⚖️',
    xpReward: 30
  },
  {
    // Fix: Added missing required xpReward property
    id: 'risks',
    title: 'Limitations & Risks',
    description: 'Identifying hallucinations and why AI isn’t always right.',
    icon: '⚠️',
    xpReward: 30
  }
];

export const NAV_ITEMS = [
  { id: AppView.DASHBOARD, label: 'Beranda', icon: '🏠' },
  { id: AppView.LITERACY_LAB, label: 'Bicara AI', icon: '🧠' },
  { id: AppView.IKIGAI_ENGINE, label: 'Eksplorasi Diri', icon: '🧭' },
  { id: AppView.INTEGRITY_STUDIO, label: 'Lab Karya', icon: '⚖️' },
  { id: AppView.ETHICAL_FORUM, label: 'Forum Etika', icon: '👥' },
];
