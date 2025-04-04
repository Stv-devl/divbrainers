import { getUser } from '../../../lib/server/getUser';
import MainLayoutClient from './layoutClient';

/**
 * Main layout component for the dashboard
 * @param children - The content to be rendered inside the layout
 * @returns The layout with the content
 */
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return <MainLayoutClient user={user}>{children}</MainLayoutClient>;
};

export default MainLayout;
