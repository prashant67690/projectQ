import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-800 py-8 text-white pl-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-lg mb-4">
              Have a question or want to learn more about our project management
              tool? Contact us!
            </p>
            <ul className="flex flex-col space-y-2">
              <li>
                Email:{' '}
                <a className="underline" href="mailto:prashant67690@gmail.com">
                  prashant67690@gmail.com{' '}
                </a>
              </li>
              <li>Phone: +1 (123) 456-7890</li>
            </ul>
          </div>
          <div className="col-span-1 ml-30">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-lg hover:text-gray-300 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
              <a
                href="#"
                className="text-lg hover:text-gray-300 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faTwitterSquare} />
              </a>
              <a
                href="#"
                className="text-lg hover:text-gray-300 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faInstagramSquare} />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <p className="text-center text-lg">
          &copy; 2024 ProjectQ. All rights reserved.
        </p>
        <a
          href="https://github.com/prashant67690"
          className="flex justify-center underline text-center text-lg"
        >
          Created By Prashant Kumar.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
