export interface Immobile {
  id: number;
  address: string;
  number: number;
  members: number;
  created_at: string;
  updated_at: string;
}

export interface ImmobileDTO {
  address: string;
  number: number;
}

export interface IMember {
  id?: number;
  name: string;
  age: string;
  gender: string;
}
