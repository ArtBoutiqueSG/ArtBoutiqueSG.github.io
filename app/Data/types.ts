export type Product = {
  id: number;
  name: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  category: string;
  newArrival:boolean;
};

export type Category={
  id:number;
  name:string;
  rank:number
}
export interface Blog {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
}
export type VideoItem={
  category:string;
  gumletUrl:string;
}