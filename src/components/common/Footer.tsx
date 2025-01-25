import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-transparent via-[#fdf5e6] to-[#fbe8c8] pt-10 pb-6 shadow-lg">
      <div className="container mx-auto max-w-[1440px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="font-bold text-2xl mb-4 text-[#B88E2F]">Furniro</h2>
            <p className="text-gray-800 leading-relaxed">
              400 University Drive Suite 200 Coral Gables, FL 33134 USA
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#B88E2F]">Navigation</h4>
            <ul className="space-y-2">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-[#E0B341] transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#B88E2F]">Help</h4>
            <ul className="space-y-2">
              {["Payment Options", "Returns", "Privacy Policies"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-[#E0B341] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#B88E2F]">Newsletter</h4>
            <form>
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 bg-white bg-opacity-70 rounded-lg p-3 w-full mb-4 
                  focus:outline-none focus:ring-2 focus:ring-[#E0B341] transition-all text-gray-800"
              />
              <button
                type="submit"
                className="w-full bg-[#B88E2F] text-white py-2 px-4 rounded-lg 
                  hover:bg-[#E0B341] transition duration-300 shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center text-gray-600 text-sm mb-4 md:mb-0">
            © 2023 Funiro. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-700 hover:text-[#E0B341] transition duration-300"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-[#E0B341] transition duration-300"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-[#E0B341] transition duration-300"
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
