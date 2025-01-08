import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-100 to-gray-200 pt-10 pb-6">
      <div className="container mx-auto max-w-[1440px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="font-bold text-2xl mb-4 text-gray-800">Funiro</h2>
            <p className="text-gray-600 leading-relaxed">
              400 University Drive Suite 200 Coral Gables, FL 33134 USA
            </p>
          </div>

          {/* Navbar Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Navigation</h4>
            <ul className="space-y-2">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-500 transition duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Help</h4>
            <ul className="space-y-2">
              {["Payment Options", "Returns", "Privacy Policies"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-500 transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Newsletter</h4>
            <form>
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-lg p-3 w-full mb-4 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg 
                  hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center text-gray-500 text-sm mb-4 md:mb-0">
            © 2023 Funiro. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 transition duration-200"
              aria-label="Facebook"
            >
              {/* Add your social icons */}
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 transition duration-200"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-500 transition duration-200"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
