export interface User {
  id: number;
  dni: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  admin: boolean;
  PurchaseRecord: Array<{ id: number }>;
}
