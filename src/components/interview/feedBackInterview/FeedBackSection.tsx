/**
 * Reusable component for feedback sections
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.content - Section content
 * @returns {JSX.Element} Formatted feedback section
 */
const FeedbackSection = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-800 mb-2">{title}</h2>
      <div className="bg-blue-50 p-4 rounded-sm border border-blue-200">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default FeedbackSection;
