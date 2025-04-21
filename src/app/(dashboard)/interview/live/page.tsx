import { redirect } from 'next/navigation';
import React from 'react';
import CallInterviewMessage from '@/components/interview/liveInterview/CallInterviewMessage';
import CallInterviewWrapper from '@/components/interview/liveInterview/CallInterviewWrapper';
import InterviewControl from '@/components/interview/liveInterview/InterviewControl';

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

const Page = () => {
  return (
    <div className="relative size-full">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="mt-0 sm:mt-5 text-xl sm:text-3xl font-bold text-blue-900">
          Interview Front-End developer
        </h1>
        <p>Live technical interview with recruiter</p>
      </div>
      <CallInterviewWrapper />
      <CallInterviewMessage />
      <InterviewControl />
    </div>
  );
};

export default Page;
