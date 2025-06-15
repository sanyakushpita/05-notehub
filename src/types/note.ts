export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
}
export type Tag = 'Work' | 'Todo' | 'Personal' | 'Meeting' | 'Shopping';
export type SortBy = 'created' | 'updated';
