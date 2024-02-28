export interface ConnectionI {
  id?: number;
  socketId?: string;
  connectedUser?: UserI;
}

export interface UserI {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  connections?: ConnectionI[];
}

export interface LoginResponseI {
  access_token: string;
  token_type: string;
  expires_in: number;
}
