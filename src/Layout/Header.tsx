
const Header = () => {
  return (
<header className="flex items-center justify-between px-10 py-4 border-b bg-white">
  {/* Left: Logo and Tagline */}
  <div className="flex items-center space-x-2">
    <div className="text-2xl font-bold flex items-center">
      <span className="text-[#f1ab27]">IDEO</span>
      <span className="text-gray-800">METRIX</span>
    </div>
    <span className="text-xs text-gray-400 ml-2">ideate - design - develop</span>
  </div>

  {/* Center: Navigation */}
  <nav className="flex items-center gap-6 text-sm text-gray-600">
    <a href="#" className="font-medium text-[#f1ab27]">Home</a>
    <a href="#" className="hover:text-[#f1ab27]">About Us</a>

    {/* Dropdown: Our Programs */}
    <div className="relative group">
      <button className="hover:text-[#f1ab27] flex items-center gap-1">
        Our Programs ▾
      </button>
      {/* Dropdown content (optional) */}
       <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-md py-2 w-40">
        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Program 1</a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Program 2</a>
      </div> 
    </div>

    {/* Dropdown: Our Products */}
    <div className="relative group">
      <button className="hover:text-[#f1ab27] flex items-center gap-1">
        Our Products ▾
      </button>
      {/* Dropdown content (optional) */}
       <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-md py-2 w-40">
        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Product 1</a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Product 2</a>
      </div> 
    </div>
  </nav>

  {/* Right: Contact Us Button */}
  <div>
    <button className="bg-[#1d2a44] text-white font-semibold px-5 py-2 rounded-md hover:opacity-90 transition">
      Contact Us
    </button>
  </div>
</header>

  );
};

export default Header;
