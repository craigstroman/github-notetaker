export interface IRepo {
  name: string;
  html_url: string;
}

export interface UserReposState {
  value: IRepo[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: UserReposState = {
  value: [
    {
      name: '',
      html_url: '',
    },
  ],
  status: 'idle',
};
