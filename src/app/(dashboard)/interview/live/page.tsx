import React from 'react';
import LiveInterviewUI from '@/components/interview/liveInterview/LiveInterviewUi';
import { getUser } from '../../../../../lib/actions/user/getUser';

// create server action to check if user has started the interview
// put the component in the server action in a layout or an other page
/* const session = await getServerSession(authOptions);
    if (!session) redirect('/login');
  
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { hasStartedInterview: true },
    });
  
    if (!user?.hasStartedInterview) {
      redirect('/interview'); /
    }*/

const Page = async () => {
  const user = await getUser();
  if (!user) return;

  return <LiveInterviewUI user={user} />;
};

export default Page;
