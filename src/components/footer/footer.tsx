export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-800 to-teal-700 text-white py-2">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
        {/* Bokikon */}
        <div className="flex space-x-3">
          <img src="/footer.jpg" alt="Book logo" className="h-25 w-100" />
        </div>

        {/* About Us-sektion */}
        <div className="flex items-center space-x-2 pr-15">
          <span className="font-ravi text-lg font-semibold text-[#DCD0BD]">
            About Us
          </span>
          <div className="h-8 w-8 bg-[#DCD0BD] rounded-full flex items-center justify-center">
            <img
              src="/AboutIcon.png"
              alt="Information icon"
              className="h-6 w-6"
            />
          </div>
        </div>
      </div>

      {/* Dekoration  */}
      <img
        src="/giphy (1).gif"
        alt="Animated book illustration"
        className="absolute -top-17 right-2 h-26 w-26"
      />
    </footer>
  );
}
