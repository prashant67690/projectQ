import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Student from './pages/Dashboard/Student';
import Mentor from './pages/Dashboard/Mentor';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import MentorForm from './components/Forms/MentorForm';
import DocumentUplaod from './components/Documents/DocumentUpload';
import SlotSelection from './pages/SlotSelection';
import Certificate from './components/Documents/Certificate';
import MidTermUpload from './components/MidTerm/MidTermUpload';
import MentorDocument from './components/Tables/MentorDocument';
import MidTermMarks from './components/Tables/MidTermMarks';
import EndTermMarks from './components/Tables/EndTermMarks';
import Contact from './helper/Contact';
import About from './helper/About';
import ChatCard from './components/Chat/ChatCard';
import AdminSignin from './pages/Authentication/AdminSignin';
import Admin from './pages/Dashboard/Admin';
import AdminViewProject from './components/Documents/AdminViewProject';
import AdminForm from './components/Forms/AdminForm';
import Guidelines from './helper/Guidelines';
import ExtraInfo from './helper/ExtraInfo';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const info = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate, info]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Ace Your Project" />
              <Landing />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <PageTitle title="Home Page" />
              {info.isMentor ? <Mentor /> : <Student />}
            </>
          }
        />
        <Route
          path="/teacherAssistant"
          element={
            <>
              <PageTitle title="Mentor Form" />
              <MentorForm />
            </>
          }
        />
        <Route
          path="/document"
          element={
            <>
              <PageTitle title="Upload Documents" />
              <DocumentUplaod />
            </>
          }
        />
        <Route
          path="/certificate"
          element={
            <>
              <PageTitle title="Upload Documents" />
              <Certificate />
            </>
          }
        />
        <Route
          path="/gradedocs"
          element={
            <>
              <PageTitle title="Upload Documents" />
              <MidTermUpload />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar " />
              <Calendar />
            </>
          }
        />
        <Route
          path="/slot"
          element={
            <>
              <PageTitle title="Slot Selection" />
              <SlotSelection />
            </>
          }
        />
        <Route
          path="/guidelines"
          element={
            <>
              <PageTitle title="Slot Selection" />
              <Guidelines />
            </>
          }
        />
        <Route
          path="/extra"
          element={
            <>
              <PageTitle title="Slot Selection" />
              <ExtraInfo />
            </>
          }
        />
        <Route
          path="/mentor/documents"
          element={
            <>
              <PageTitle title="Docs " />
              <MentorDocument />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <PageTitle title="Contact Us " />
              <Contact />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <PageTitle title="About Us " />
              <About />
            </>
          }
        />
        <Route
          path="/mentor/midterm"
          element={
            <>
              <PageTitle title="Docs " />
              <MidTermMarks />
            </>
          }
        />
        <Route
          path="/mentor/endterm"
          element={
            <>
              <PageTitle title="Docs " />
              <EndTermMarks />
            </>
          }
        />
        <Route
          path="/mentor/contact"
          element={
            <>
              <PageTitle title="Student Contact " />
              <ChatCard />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile " />
              <Profile />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings " />
              <Settings />
            </>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
        {/* admin Routes  Start*/}
        <Route
          path="/admin"
          element={
            <>
              <PageTitle title="Admin Project Q" />
              <AdminSignin />
            </>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <>
              <PageTitle title="Admin DashBoard" />
              <Admin />
            </>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <>
              <PageTitle title="Project Files" />
              <AdminViewProject />
            </>
          }
        />
        <Route
          path="/admin/permissions"
          element={
            <>
              <PageTitle title="Signup" />
              <AdminForm />
            </>
          }
        />
        {/* ADMIN rOUTES END */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
