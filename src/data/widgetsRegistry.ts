import { AppId } from '../types';

export type WidgetSize = 'small' | 'medium' | 'large';

export interface WidgetDefinition {
  id: string;
  type: 'clock' | 'weather' | 'calendar' | 'battery' | 'now_building' | 'recent_projects' | 'recruiter_glance';
  title: string;
  category: 'Productivity' | 'Portfolio' | 'System' | 'Weather & Time';
  description: string;
  supportedSizes: WidgetSize[];
  defaultSize: WidgetSize;
  appId?: AppId;
}

export interface PlacedWidget {
  instanceId: string;
  widgetId: string;
  type: WidgetDefinition['type'];
  size: WidgetSize;
  page: number; // 0, 1, 2
}

export const WIDGETS_REGISTRY: WidgetDefinition[] = [
  {
    id: 'widget-clock',
    type: 'clock',
    title: 'Clock & Date',
    category: 'Weather & Time',
    description: 'Real-time digital clock with current date and world timezone.',
    supportedSizes: ['small', 'medium'],
    defaultSize: 'small'
  },
  {
    id: 'widget-weather',
    type: 'weather',
    title: 'Weather',
    category: 'Weather & Time',
    description: 'Current temperature, atmospheric conditions, and local forecast for Bhubaneswar.',
    supportedSizes: ['small', 'medium'],
    defaultSize: 'small'
  },
  {
    id: 'widget-calendar',
    type: 'calendar',
    title: 'Calendar & Up Next',
    category: 'Productivity',
    description: 'Next interview, project review, or academic milestone from your schedule.',
    supportedSizes: ['small', 'medium'],
    defaultSize: 'medium',
    appId: 'calendar'
  },
  {
    id: 'widget-battery',
    type: 'battery',
    title: 'Batteries',
    category: 'System',
    description: 'Power levels for iPhone 15, AirPods Pro, and CUTM Cloud Lab Cluster.',
    supportedSizes: ['small', 'medium'],
    defaultSize: 'small',
    appId: 'systeminfo'
  },
  {
    id: 'widget-now-building',
    type: 'now_building',
    title: 'Now Building',
    category: 'Portfolio',
    description: 'Active technical sprint: DocuRAG hybrid search & FastMCP agent tool server.',
    supportedSizes: ['medium', 'large'],
    defaultSize: 'medium',
    appId: 'projects'
  },
  {
    id: 'widget-recent-projects',
    type: 'recent_projects',
    title: 'Recent Projects',
    category: 'Portfolio',
    description: 'Interactive launcher for DocuRAG, FastMCP Server, and NeuralRank.',
    supportedSizes: ['medium', 'large'],
    defaultSize: 'medium',
    appId: 'projects'
  },
  {
    id: 'widget-recruiter-glance',
    type: 'recruiter_glance',
    title: 'Recruiter Brief',
    category: 'Portfolio',
    description: 'Executive snapshot of candidate credentials, CGPA 8.32, and 2027 availability.',
    supportedSizes: ['medium', 'large'],
    defaultSize: 'medium',
    appId: 'recruiter'
  }
];

export const DEFAULT_PLACED_WIDGETS: PlacedWidget[] = [
  {
    instanceId: 'widget-recruiter-1',
    widgetId: 'widget-recruiter-glance',
    type: 'recruiter_glance',
    size: 'medium',
    page: 0
  },
  {
    instanceId: 'widget-weather-1',
    widgetId: 'widget-weather',
    type: 'weather',
    size: 'small',
    page: 0
  },
  {
    instanceId: 'widget-battery-1',
    widgetId: 'widget-battery',
    type: 'battery',
    size: 'small',
    page: 0
  },
  {
    instanceId: 'widget-now-building-1',
    widgetId: 'widget-now_building',
    type: 'now_building',
    size: 'medium',
    page: 1
  },
  {
    instanceId: 'widget-recent-projects-1',
    widgetId: 'widget-recent_projects',
    type: 'recent_projects',
    size: 'medium',
    page: 1
  }
];
