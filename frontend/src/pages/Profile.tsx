import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import userOne from '../images/user.png';
import type { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden m-auto p-6 pb-2 w-100 w-rounded-lg-p-3 sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 w-100"></div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5 w-90">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userOne} alt="profile" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {user.data.name}
            </h3>
            <p className="font-medium mb-10">{user.data.email}</p>
            <Link
              to="/settings"
              className="border rounded-lg p-3 border-solid text-slate-900 hover:bg-slate-400 hover:text-white"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
