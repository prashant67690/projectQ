import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layout/AdminLayout';

type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  department: string;
  marks: number;
  mentorId: number;
  password: string;
  project: ProjectData;
};

type Mentor = {
  id: number;
  firstname: string;
  lastname: string;
  department: string;
};

type ProjectData = {
  id: string;
  title: string;
  synopsis: string | null;
  joiningReport: string | null;
  completionCertificate: string | null;
  midterm: string | null;
  endterm: string | null;
  endtermreport: string | null;
  endtermmarks: number | null;
  slot: string | null;
  studentId: number;
};

const AdminViewProject = () => {
  const [length, setLength] = useState(0);
  const [mentor, setMentor] = useState<Mentor[]>([]);
  const [studentData, setStudentData] = useState<User[]>([]);

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(`http://localhost:3000/api/admin/data/`, {
        withCredentials: true,
      });
      setLength(res.data.data.length);
      setMentor(res.data.data);
      console.log(res);
    };
    fxn();
  }, [setMentor]);

  const selectChangeHandler = async (e) => {
    if (e.target.value == '') {
      setStudentData([]);
      return;
    }
    const id = e.target.value;
    setStudentData([]);
    const res = await axios.get(
      `http://localhost:3000/api/admin/data/student/${id}`,
      { withCredentials: true },
    );
    console.log(res);
    const result: User[] = [];
    for (let i = 0; i < res.data.data.length; i++) {
      const data = await axios.get(
        `http://localhost:3000/api/admin/data/project/${res.data.data[i].id}`,
        { withCredentials: true },
      );
      console.log(data);
      const finalData: User = {
        ...res.data.data[i],
        project: data.data.data,
      };
      result.push(finalData);
    }
    setStudentData(result);
  };

  return (
    <AdminLayout>
      <h1 className="text-slate-950 text-4xl mb-6 dark:text-white">
        Documents
      </h1>

      <div className="max-w-full overflow-x-auto bg-white rounded-lg shadow-md p-9 mt-9">
        {mentor.length == 0 ? (
          <div className="flex justify-center text-2xl text-slate-950 font-semibold">
            <h1>No Data Avialable</h1>
          </div>
        ) : (
          <div>
            <div>
              <label
                htmlFor="mentor"
                className="mx-6 font-bold text-xl text-slate-950"
              >
                Select The Faculty:
              </label>
              <select
                name="mentor"
                id="mentor"
                className="border rounded-lg w-100 p-3"
                onChange={selectChangeHandler}
              >
                <option value="" key="-1">
                  Select The Value{' '}
                </option>
                {mentor.map((e, id) => {
                  return (
                    <option key={id} value={e.id}>
                      {e.firstname + ' ' + e.lastname}
                    </option>
                  );
                })}
              </select>
            </div>
            <h1 className="text-2xl text-slate-950 font-semibold mt-10 mb-4">
              Students Under You:
            </h1>

            <table className="table-auto border-collapse w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Sn No</th>
                  <th className="px-4 py-2">Student Name</th>
                  <th className="px-4 py-2">Synopsis</th>
                  <th className="px-4 py-2">Joining Report</th>
                  <th className="px-4 py-2">Mid Term Ppt</th>
                  <th className="px-4 py-2">End Term Ppt</th>
                  <th className="px-4 py-2">End Term Report</th>
                  <th className="px-4 py-2">Certificate</th>
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
                        {e.project.synopsis == null ? (
                          'Not Submitted'
                        ) : (
                          <a
                            href={`https://drive.google.com/uc?id=${e.project.synopsis}`}
                          >
                            View
                          </a>
                        )}
                      </td>
                      <td className="border text-center px-4 py-2">
                        {e.project.joiningReport == null ? (
                          'Not Submitted'
                        ) : (
                          <a
                            href={`https://drive.google.com/uc?id=${e.project.joiningReport}`}
                          >
                            View
                          </a>
                        )}
                      </td>
                      <td className="border text-center px-4 py-2">
                        {e.project.midterm == null ? (
                          'Not Submitted'
                        ) : (
                          <a
                            href={`https://drive.google.com/uc?id=${e.project.midterm}`}
                          >
                            View
                          </a>
                        )}
                      </td>
                      <td className="border text-center px-4 py-2">
                        {e.project.endterm == null ? (
                          'Not Submitted'
                        ) : (
                          <a
                            href={`https://drive.google.com/uc?id=${e.project.endterm}`}
                          >
                            View
                          </a>
                        )}
                      </td>
                      <td className="border text-center px-4 py-2">
                        {e.project.endtermreport == null ? (
                          'Not Submitted'
                        ) : (
                          <a
                            href={`https://drive.google.com/uc?id=${e.project.endtermreport}`}
                          >
                            View
                          </a>
                        )}
                      </td>
                      <td className="border text-center px-4 py-2">
                        {e.project.completionCertificate == null ? (
                          'Not Submitted'
                        ) : (
                          <a
                            href={`https://drive.google.com/uc?id=${e.project.completionCertificate}`}
                          >
                            View
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminViewProject;
