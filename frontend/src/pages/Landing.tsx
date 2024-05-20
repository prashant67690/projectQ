import { NavLink } from 'react-router-dom';
import Home from '../images/home.jpg';
import Card from '../helper/Card';
import Presentation from '../images/presentation.png';
import Dev from '../images/developer.png';
import progrmmer from '../images/programmer.png';
import Download from '../images/download.png';
import RenderReviews from '../helper/RenderReviews';
import Footer from '../helper/Footer';
import NavBar from '../helper/Navbar';

function Landing() {
  return (
    <body className=" bg-white-100">
      <NavBar />
      <section className="flex ">
        <div className="mt-30 ml-40">
          <h1 className="flex flex-col text-6xl font-bold h-10 w-150">
            Best <span className="text-blue-500">Online</span> Platform For
            Project Cordination
            <p className="text-xl pt-3 font-medium">
              Manage EveryThing Directly and Easily
            </p>
            <NavLink
              className="flex mt-10 pb-3 justify-center border w-30 h-25 text-xl pt-3 font-medium hover:bg-slate-500 hover:text-slate-50"
              to="/auth/signin"
            >
              Get Started
            </NavLink>
          </h1>
        </div>
        <div className="ml-60 mt-20">
          <img src={Home} alt="The project image" className="w-100 h-140" />
        </div>
      </section>
      <section className="mt-10 bg-slate-200 p-2 pb-10 ">
        <div className="">
          <h1 className="text-zinc-950 font-bold text-3xl text-center mt-10 mb-10">
            Getting started is Quick and Easy
          </h1>
          <div className="flex justify-evenly">
            <Card>
              <img
                src={progrmmer}
                alt="image of login "
                className="h-26 w-26 ml-5 mb-1 "
              />
              <p className="text-zinc-950 font-bold text-xl text">
                Register YourSelf
              </p>
            </Card>
            <div className="flex mt-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                className="w-6 h-6 text-zinc-950 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>

            <Card>
              <img
                src={Dev}
                alt="image of login "
                className="h-26 w-26 ml-15"
              />
              <p className="text-zinc-950 font-bold text-xl">
                Get A Mentor Assigned
              </p>
            </Card>
            <div className="flex mt-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                className="w-6 h-6 text-zinc-950 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
            <Card>
              <img
                src={Presentation}
                alt="image of login "
                className="h-22 w-22 ml-5 "
              />
              <p className="text-zinc-950 font-bold text-xl pt-4">
                Start Working
              </p>
            </Card>
            <div className="flex mt-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                className="w-6 h-6 text-zinc-950 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
            <Card>
              <img
                src={Download}
                alt="image of login "
                className="h-20 w-20 ml-15 mb-1"
              />
              <p className="text-zinc-950 font-bold text-xl pt-5">
                Fetch your Documents
              </p>
            </Card>
          </div>
        </div>
      </section>
      <section>
        <RenderReviews />
      </section>
      <section className="bg-slate-200 flex justify-between pt-10 pb-10">
        <h2 className="text-xl w-180 ml-50">
          ProjectQ is a secure cloud based platform for Project related
          Communication, storage, sharing of documents & certificates . We are
          simplifying academic project participation for all.
        </h2>
        <NavLink
          className=" rounded-xl text-xl text-slate-100 bg-blue-800 p-2 h-12 mr-60 mt-4"
          to="/auth/signup"
        >
          Sign Up Now
        </NavLink>
      </section>
      <Footer />
    </body>
  );
}

export default Landing;
