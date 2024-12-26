export interface ICategory {
    
  id: number;
  title: string;
  count: number;
  link: string;
  bgImage?: string;
  color?: string;
  parentId?: number;
  slug?:string
  description?: string;
  categoryEntities: ICategory[]  ;
}
