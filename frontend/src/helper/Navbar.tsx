import { NavLink } from 'react-router-dom';
import Logo from '../images/logo/logo.png';

const NavBar = () => {
  return (
    <header className="bg-blue-900 pb-7">
      <ul className="flex justify-between pt-5">
        <li>
          <NavLink to="/">
            <div className="flex justify-center p-1 absolute top-4 left-40">
              <img className="h-13 w-12" src={Logo} alt="Logo" />
              <p className="text-slate-100 font-bold ml-4 flex flex-col justify-center text-2xl">
                ProjectQ
              </p>
            </div>
          </NavLink>
        </li>
        <li className="flex justify-evenly mr-20">
          <NavLink
            className="flex flex-col justify-center text-xl text-slate-100 p-2 mr-10"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="flex flex-col justify-center text-xl text-slate-100 p-2 mr-10"
            to="/contact"
          >
            Contact
          </NavLink>
          <NavLink
            className="flex flex-col justify-center text-xl text-slate-100 p-2 mr-10"
            to="/auth/signin"
          >
            SignIn
          </NavLink>
          <NavLink
            className="flex flex-col justify-center text-xl text-slate-100 px-2 mr-10 border  hover:bg-slate-950 hover:text-slate-50"
            to="/auth/signup"
          >
            SignUp
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default NavBar;
