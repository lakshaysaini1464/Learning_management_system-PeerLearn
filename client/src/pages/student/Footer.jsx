const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-r from-green-600 to-teal-700 dark:from-gray-900 dark:to-gray-800 text-white py-6 mt-10">

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* Logo & Description */}
          <div>
            <h2 className="text-xl font-bold">PeerLearn</h2>
            <p className="text-gray-300 mt-2">
              Your gateway to quality education. Learn, grow, and achieve your dreams.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="text-gray-200 hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/course/search" className="text-gray-200 hover:text-yellow-400 transition">Search Courses</a></li>
              <li><a href="/my-learning" className="text-gray-200 hover:text-yellow-400 transition">My Learning</a></li>
              <li><a href="/profile" className="text-gray-200 hover:text-yellow-400 transition">Profile</a></li>
              
            </ul>
          </div>
  
          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-2 flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-200 hover:text-blue-500 transition">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-200 hover:text-sky-400 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-200 hover:text-pink-500 transition">
                <i className="fab fa-instagram">Lakshy.a14</i>
              </a>
              <a href="#" className="text-gray-200 hover:text-blue-400 transition">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
  
        </div>
  
        {/* Copyright Section */}
        <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-600 pt-4">
          &copy; {new Date().getFullYear()} PeerLearn. All Rights Reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
