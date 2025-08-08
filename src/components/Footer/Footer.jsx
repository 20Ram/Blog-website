// import React from 'react'
// import { Link } from 'react-router-dom'
// import Logo from '../Logo/Logo'

// function Footer() {
//   return (
//     <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
//             <div className="relative z-10 mx-auto max-w-7xl px-4">
//                 <div className="-m-6 flex flex-wrap">
//                     <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//                         <div className="flex h-full flex-col justify-between">
//                             <div className="mb-4 inline-flex items-center">
//                                 <Logo width="100px" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-600">
//                                     &copy; Copyright 2025. All Rights Reserved by DevUI.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Company
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Features
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Pricing
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Affiliate Program
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Press Kit
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Support
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Account
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Help
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Contact Us
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Customer Support
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-3/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Legals
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Terms &amp; Conditions
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Privacy Policy
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Licensing
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//   )
// }

// export default Footer


import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-gray-200 to-gray-300 border-t border-gray-400 py-10 text-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and copyright */}
          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <Logo width="80px" />
            </div>
            <p className="text-sm text-gray-600">&copy; 2025 DevUI. All rights reserved.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Company</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Features</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Pricing</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Affiliate Program</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Press Kit</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Support</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Account</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Help</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Contact Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Legal</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 text-center text-sm text-gray-500">
          Built with ❤️ using React & Tailwind CSS
        </div>
      </div>
    </footer>
  );
}

export default Footer;
