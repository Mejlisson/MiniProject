import { FaGithub, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Sabina",
    role: "Frontend Developer",
    github: "https://github.com/Mejlisson",
  },
  {
    name: "Emil",
    role: "Frontend Developer",
    github: "https://github.com/EmilJohanssonz",
  },
  {
    name: "Github",
    role: "Project",
    github: "https://github.com/Mejlisson/MiniProject",
  },
];

const AboutPage = () => {
  return (
    <main className="mt-20 min-h-screen bg-gradient-to-b from-[#034947] to-[#04635e] text-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-[#034947] shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-ravi text-gray-100 mb-4 flex items-center">
          About Us <FaHeart className="text-red-500 ml-2 -mt-2" />
        </h1>
        <p className="leading-relaxed">
          Welcome to our platform! Here, we bring you a collection of books,
          insights, and features to explore and enjoy. Our goal is to make it
          easy and fun to discover literature from all over the world.
        </p>
        <p className="mt-4">
          Whether you're searching for your next read, exploring authors, or
          building your personal collection, we've got you covered!
        </p>

        <h2 className="text-xl font-ravi mt-6">Our Mission</h2>
        <p className="mt-2">
          To create a user-friendly and engaging platform for book lovers,
          providing access to book details, author information, and interactive
          features.
        </p>

        {/* Team Section */}
        <h2 className="text-xl font-ravi mt-8">Meet the Team</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center bg-[#04635e] p-4 rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold mt-2 text-gray-100">
                {member.name}
              </h3>
              <p className="text-gray-300 text-sm">{member.role}</p>
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00bfa6] mt-2 flex items-center gap-2 hover:underline"
                >
                  <FaGithub /> GitHub
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link
            to={"/"}
            className="text-[#1d70dd] font-medium text-lg hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
