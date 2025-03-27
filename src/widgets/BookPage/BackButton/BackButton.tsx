import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ navigate }: { navigate: (path: number) => void }) => {
  return (
    <button
      className="self-start text-xl mb-4 flex items-center gap-2 hover:text-[#034947] transition-all duration-300 ease-in-out group"
      onClick={() => navigate(-1)}
    >
      <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110" />
      <span className="transition-all duration-300 group-hover:scale-105">
        Go Back
      </span>
    </button>
  );
};

export default BackButton;
