import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Review {
  name: string;
  designation: string;
  organisation: string;
  message: string;
}

const reviews: Review[] = [
  {
    name: 'John Doe',
    designation: 'Director',
    organisation: 'Quantum Institute Of Engineering',
    message:
      "I can't imagine managing my college projects without this app anymore! It's become an essential tool for staying organized and on track. The user Interface and simplicity and management of resources in real-time has revolutionized the way we collaborate.Thank you for creating such a game-changing tool!",
  },
  {
    name: 'Jane Smith',
    designation: 'Vice Chancellor',
    organisation: 'Sukanya Insitute Of Technology',
    message:
      'As a busy college Teacher Managing multiple Students it becomes messy sometimes but, this application has been a lifesaver! Its intuitive interface makes it easy to view Studnets inforamtion their project Resources, managing Documents, and Giving Marks all in one place. Plus, the ability to  collaborate in real-time has greatly improved our project efficiency. Highly recommend!',
  },
  {
    name: 'Rajan Kumar',
    designation: 'Head of Depratment',
    organisation: 'National University Of Delhi',
    message:
      'As a HOD, I rely on this tool daily to keep track of tasks, data, and files. Highly recommended!',
  },
];

const RenderReviews: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="bg-blue-800 h-100 pt-10 flex justify-center pb-10">
      <div className="w-full max-w-6xl px-10 ">
        <h1 className="text-4xl text-center text-white font-bold mb-6">
          Hear From Our Satisfied Customers
        </h1>
        <p className="text-2xl text-center text-white mb-9">
          From Small Colleges to Eastablished Institutes EveryOne Loves Project
          Q
        </p>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-10">
              <p className="text-2xl text-center">
                {review.name}- {review.designation} ( {review.organisation} )
              </p>
              <p className="text-center"> {review.message}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RenderReviews;
