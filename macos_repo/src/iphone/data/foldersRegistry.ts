import { AppId } from '../types';

export interface FolderDefinition {
  id: string;
  name: string;
  appIds: AppId[];
}

export const FOLDERS_REGISTRY: FolderDefinition[] = [
  {
    id: 'folder-devtools',
    name: 'Dev Tools',
    appIds: ['finder', 'analytics', 'systeminfo', 'utility']
  },
  {
    id: 'folder-media',
    name: 'Media',
    appIds: ['photos', 'videos', 'music', 'favorites']
  },
  {
    id: 'folder-system',
    name: 'System',
    appIds: ['settings', 'trash', 'games', 'gallery']
  }
];


export const getFolderById = (id: string): FolderDefinition | undefined => {
  return FOLDERS_REGISTRY.find((f) => f.id === id);
};
