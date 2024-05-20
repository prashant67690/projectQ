import axios from 'axios';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import type { RootState } from '../../redux/store';
import DefaultLayout from '../../layout/DefaultLayout';
import CardDataStats from '../../components/CardDataStats';

type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  department: string;
  marks: number;
  mentorId: number;
  password: string;
};

const Mentor: React.FC = () => {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  const [student, setStudent] = useState(0);
  const [studentData, setStudentData] = useState<User[]>([]);

  const { user, isMentor } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/mentor/students/${user.data.id}`,
        { withCredentials: true },
      );
      setStudent(res.data.data.length);
      setStudentData(res.data.data);
      console.log(res);
    };
    fxn();
  }, [setStudent]);

  console.log(isMentor);

  return (
    <DefaultLayout>
      <h1 className="text-slate-950 text-4xl mb-6 dark:text-white">
        Welcome {user != null ? (user.data != null ? user.data.name : '') : ''}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Todays Date"
          total={day + '-' + month + '-' + year}
          rate=""
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Total Students"
          total={student.toString()}
          rate=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="max-w-full overflow-x-auto bg-white rounded-lg shadow-md p-9 mt-9">
        {studentData.length == 0 ? (
          <div className="flex justify-center text-2xl text-slate-950 font-semibold">
            <h1>There are No Students Assigned</h1>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl text-slate-950 font-semibold mt-1 mb-4">
              Students Under You:
            </h1>
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Sn No</th>
                  <th className="px-4 py-2">Student Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Department</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((e, ind) => {
                  return (
                    <tr>
                      <td className="border px-4 py-2 text-center">
                        {ind + 1}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {e.firstname + ' ' + e.lastname}
                      </td>
                      <td className="text-center border px-4 py-2">
                        {e.email}
                      </td>
                      <td className="border text-center px-4 py-2">
                        {e.department}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Mentor;
