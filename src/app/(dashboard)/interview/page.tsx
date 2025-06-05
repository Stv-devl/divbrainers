import ClientFormWrapper from '@/components/interview/setInterview/ClientFormWrapper';
import SetInterviewCardWrapper from '@/components/interview/setInterview/SetInterviewCardWrapper';
import TechnicalStackWrapper from '@/components/wrappers/TechnicalStackWrapper';

const Page = () => {
  return (
    <>
      <ClientFormWrapper />
      <TechnicalStackWrapper isCanRemove={true} />
      <hr className="hidden sm:block border-t border-gray-300 mt-6 w-[95%] mx-auto" />
      <SetInterviewCardWrapper />
    </>
  );
};

export default Page;
