declare namespace Express {
  interface Request {
    user?: { id: number };
  }
}

export interface GroupRow {
  id: number;
}
export interface User {
  id: number;
  username: string;
  password: string;
}
