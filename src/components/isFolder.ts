import * as Storage from './localStorage';
import type { Folder } from '@/stores/folder';
import { getCategoryIdByName } from './localStorage';

export function getFolderList(categoryName: string) {
  const categoryId = getCategoryIdByName(categoryName);
  if (!categoryId) throw new Error('Category does not exist');
  const folders: Folder[] = Storage.getData(categoryId);
  return folders;
}

export function isFolder(folderName: string, folders: Folder[]) {
  const folder = folders.find(el => el.name === folderName);
  if (folder) {
    return true;
  }
  return false;
}
