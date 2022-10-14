export type SearchTypeId = 
  | 'binary'
  | 'kmp'
  | 'bm';

export type SearchType = {
  id: SearchTypeId;
  name: string;
};