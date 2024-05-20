import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import toast from 'react-hot-toast';
import { useAssignMentorMutation } from '../../redux/slices/studentSlice';
import { useGetMentorQuery } from '../../redux/slices/studentSlice';
import { MentorType } from '../../types/mentor';
import { setCredentials } from '../../redux/slices/authSlice';

// let teacherData = [];

const MentorForm: React.FC = () => {
  const [prefone, setPrefone] = useState(0);
  const [preftwo, setPreftwo] = useState(0);
  const [prefthree, setPrefthree] = useState(0);
  const [checkMentor, setCheckMentor] = useState(false);
  const [teacherData, setTeacherData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [assignMentor] = useAssignMentorMutation();

  const { user } = useSelector((state: RootState) => state.auth);

  const mentorValues = useGetMentorQuery({ id: user?.data?.mentorId });

  useEffect(() => {
    if (user == null) {
      navigate('/auth/signin');
    }
    const fxn = async () => {
      const res = await axios.get('http://localhost:3000/api/mentor');
      setTeacherData(res.data.data);
    };
    fxn();
    console.log(teacherData);
    console.log(mentorValues);
  }, [user, setTeacherData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (prefone == 0 || preftwo == 0 || prefthree == 0) {
      toast.error('Enter All the details');
      return;
    }
    const data = {
      id: user.data.id,
      body: [prefone, preftwo, prefthree],
    };
    console.log(data);
    const res: any = await assignMentor({ ...data });
    console.log(res);
    if (res) {
      toast.success('Mentor Assigned SucessFully');
      const responseData = {
        id: res.data.data.id,
        name: res.data.data.firstname + ' ' + res.data.data.lastname,
        email: res.data.data.email,
        marks: res.data.data.marks,
        mentorId: res.data.data.mentorId,
      };
      dispatch(setCredentials({ data: { ...responseData } }));
      const mailData = {
        from: 'prashant67690@gmail.com',
        to: user.data.email,
        subject: 'Mentor Allocation Mail',
        message: `<div>
        <h1>🌟 Mentor Assigned 🌟</h1>
        <p>Hello ${user.data.name},</p>
        <p>We are thrilled to inform you that a mentor has been assigned to guide and support you on your journey. Your mentor is ${
          res.data.firstname + ' ' + res.data.lastname
        }, who comes with a wealth of experience and expertise.</p>
        <p>Your mentor will be reaching out to you shortly to introduce themselves and discuss how they can best assist you in achieving your goals.</p>
        <p>If you have any immediate questions or concerns, feel free to reach out to us.</p>
        <div>
          <p>Best Regards,</p>
          <p>The Project Q Team</p>
        </div>
      </div>`,
      };
      const result = await axios.post(
        'http://localhost:3000/api/send',
        mailData,
      );
      console.log(result);
      setCheckMentor(true);
      navigate('/home');
    } else {
      toast.error('Error Occured');
    }
  };

  return (
    <>
      <DefaultLayout>
        {mentorValues && mentorValues.data ? (
          <div className="border-4 border-solid">
            <h1 className="  text-center text-2xl text-slate-950 font-bold  dark:text-white">
              Mentor Already Assigned As{' '}
              {mentorValues.currentData.data.firstname +
                ' ' +
                mentorValues.currentData.data.lastname}
            </h1>
            <p className="text-center text-2xl text-slate-950 font-bold  dark:text-white">
              Please Contact Your Faculty For Any queries on{' '}
              {mentorValues.currentData.data.email}
            </p>
          </div>
        ) : (
          <form>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Prefrence 1
              </label>
              <div className="relative">
                <select
                  onChange={(e) => {
                    setPrefone(parseInt(e.target.value, 10));
                  }}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select Your TA</option>
                  {teacherData.map((e: MentorType, ind) => {
                    return (
                      <option value={e.id} key={ind}>
                        {e.firstname + ' ' + e.lastname}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Preference 2
              </label>
              <div className="relative">
                <select
                  onChange={(e) => {
                    setPreftwo(parseInt(e.target.value, 10));
                  }}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select Your TA</option>
                  {teacherData.map((e: MentorType, ind) => {
                    return (
                      <option value={e.id} key={ind}>
                        {e.firstname + ' ' + e.lastname}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Preference 3
              </label>
              <div className="relative">
                <select
                  onChange={(e) => {
                    setPrefthree(parseInt(e.target.value, 10));
                  }}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select Your TA</option>
                  {teacherData.map((e: MentorType, ind) => {
                    return (
                      <option value={e.id} key={ind}>
                        {e.firstname + ' ' + e.lastname}
                      </option>
                    );
                  })}
                </select>

                <span className="absolute right-4 top-4"></span>
              </div>
            </div>
            <div className="mb-5">
              <input
                onClick={submitHandler}
                type="submit"
                value="Submit"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
          </form>
        )}
      </DefaultLayout>
    </>
  );
};

export default MentorForm;
