export interface Ipost {
  id: number;
  title: string;
  description: string;
  Thumbnailimg: string;
  titleimg?: string;
  author: string;
  authordisplay: string;
  categoreis: string[];
  approximateTime: string;
  tags: string[];
  body?: string;
  date: string;
  slug?: string;
  postName: string;
  color?: string;
  avatarImg: string;
}
