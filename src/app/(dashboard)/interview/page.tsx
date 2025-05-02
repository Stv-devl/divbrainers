import ClientFormWrapper from '@/components/interview/setInterview/ClientFormWrapper';
import SetInterviewCardWrapper from '@/components/interview/setInterview/SetInterviewCardWrapper';
import TechnicalStack from '@/components/wrappers/TechnicalStackWrapper';
import ImageTitleWrapper from '@/components/wrappers/ImageTitleWrapper';

const Page = () => {
  return (
    <>
      <ClientFormWrapper />
      <TechnicalStack />
      <hr className="hidden sm:block border-t border-gray-300 mt-6 w-[95%] mx-auto" />
      <SetInterviewCardWrapper />
    </>
  );
};

export default Page;
