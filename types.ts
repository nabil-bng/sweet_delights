export type CakeCategory = 'all' | 'chocolate' | 'cream' | 'sweet';

export interface Cake {
  id: number;
  name: string;
  price: number;
  description: string;
  fullDescription: string;
  image: string;
  flavors: string[];
  servingSize: string;
  category: Exclude<CakeCategory, 'all'>;
}

export interface User {
  username: string;
  password: string;
}
