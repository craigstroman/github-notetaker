export interface IUser {
  created_at: string;
  email: string;
  id: number;
  name: string;
  profile_id: string;
  profile_picture: string;
  provider: string;
  token: string;
  updated_at: string;
}

export interface UserInfoState {
  value: IUser | null;
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: UserInfoState = {
  value: null,
  status: 'idle',
};
