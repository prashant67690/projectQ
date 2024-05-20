import React, { useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import toast from 'react-hot-toast';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        formData.name == '' ||
        formData.message == '' ||
        formData.email == ''
      ) {
        toast.error('Please Enter All The Details');
        return;
      }
      const mailData = {
        from: formData.email,
        to: 'prashant67690@gmail.com',
        subject: `Customer Care Issues from ${formData.name}`,
        message: `<div>
        <p>Hello</p>
        <p>${formData.message}</p>
        <div>
          <p>Best Regards</p>
          <p>${formData.name}</p>
        </div>
      </div>`,
      };
      const result = await axios.post(
        'http://localhost:3000/api/send',
        mailData,
      );
      toast.success('Submitted');
      setFormData({ name: '', email: '', message: '' });
      console.log(result);
    } catch (e) {
      toast.error('error');
      console.log(e);
    }
  };
  return (
    <>
      <body className="bg-white-100">
        <NavBar />
        <div className="max-w-md mx-auto mt-8 mb-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Submit
            </button>
          </form>
        </div>
        <Footer />
      </body>
    </>
  );
};

export default Contact;
