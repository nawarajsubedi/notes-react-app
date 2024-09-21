export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
}

export interface SessionUser {
  id: string;
  username: string;
  email: string;
  token: string;
}
