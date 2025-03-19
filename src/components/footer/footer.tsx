export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-800 to-teal-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/*  Bokikon */}
        <div className="flex space-x-3">
          <img src="/" alt="Book img" className="h-10 w-10" />
        </div>

        {/* About Us-sektion */}
        <div className="flex items-center space-x-2">
          <span className="font-ravi text-lg font-semibold text-[#DCD0BD]">
            About us
          </span>
          <div className="h-8 w-8 bg-[#DCD0BD] rounded-full flex items-center justify-center">
            <img src="/AboutIcon.png" alt="About Us" className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/*Dekoration (hörnfigur, exempelvis en bok eller illustration) */}
      <img
        src="/giphy (1).gif"
        alt="Corner decoration"
        className="absolute -top-18 right-2 h-26 w-26"
      />
    </footer>
  );
}
