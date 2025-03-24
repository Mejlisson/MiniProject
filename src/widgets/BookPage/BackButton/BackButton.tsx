import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ navigate }: { navigate: (path: number) => void }) => {
  return (
    <button
      className="self-start texl-xl mb-4 flex items-center gap-2 hover:text-[#034947]"
      onClick={() => navigate(-1)}
    >
      <FaArrowLeft />
      Backwards
    </button>
  );
};

export default BackButton;
