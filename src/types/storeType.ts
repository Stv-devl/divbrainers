import { UserProfile } from './type';

//user store
export interface UserState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchData: (userId: string) => Promise<void>;
  getUserId: () => string | undefined;
}
