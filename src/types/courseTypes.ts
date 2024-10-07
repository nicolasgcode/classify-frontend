export interface Course {
  title: string;
  price: number;
  topics: Array<{ id: number; description: string }>;
  levels: Array<{ id: number; name: string }>;
}
