import NavBar from './Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <body className="bg-white-100">
        <NavBar />
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
            <p className="text-lg text-gray-700 mb-8">
              Welcome to <span className="font-semibold">Project Q</span>, where
              innovation meets excellence. We are a team of passionate
              individual dedicated to delivering top-notch solutions tailored to
              meet your needs. With a focus on creativity, integrity, and
              customer satisfaction, we strive to exceed expectations and leave
              a lasting impact.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              At <span className="font-semibold">Project Q</span>, our mission
              is simple: to empower individuals and businesses by providing
              innovative solutions that enhance efficiency, productivity, and
              growth. We believe in leveraging the latest technologies and best
              practices to deliver unparalleled results while maintaining the
              highest standards of integrity and professionalism.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              What Sets Us Apart
            </h2>
            <ul className="list-disc pl-6 text-lg text-gray-700 mb-8">
              <li className="mb-2">
                Commitment to Excellence: We are committed to delivering
                excellence in everything we do, from product development to
                customer service.
              </li>
              <li className="mb-2">
                Innovative Solutions: We pride ourselves on our ability to think
                outside the box and develop innovative solutions that address
                the unique challenges our clients face.
              </li>
              <li className="mb-2">
                Customer-Centric Approach: Your satisfaction is our top
                priority. We work closely with our clients to understand their
                needs and deliver customized solutions that exceed their
                expectations.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-lg text-gray-700 mb-8">
              At <span className="font-semibold">Project Q</span>, meet our
              founder and sole team member, Prashant Kumar. With a technical
              background and expertise, Prashant Kumar is dedicated to providing
              personalized solutions and ensuring your experience with us is
              exceptional.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Ready to take your Major Project to the hassle free execution?
              Contact us today to learn more about our services and how we can
              help you achieve your goals on{' '}
              <a
                className="text-blue-700 underline"
                href="mailto:prashant67690@gmail.com"
              >
                prashant67690@gmail.com
              </a>
              . We look forward to hearing from you!
            </p>
          </div>
        </div>
        <Footer />
      </body>
    </>
  );
};

export default About;
