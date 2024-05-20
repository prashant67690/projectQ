import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

type StudentType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  department: string;
  marks: number | null;
  mentorId: number | null;
};

type ProjectType = {
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

const MentorDocument = () => {
  const { user, isMentor } = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState<StudentType[]>([]);
  const [docs, setDocs] = useState<ProjectType[]>([]);

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/mentor/students/${user.data.id}`,
        { withCredentials: true },
      );
      if (res.data != null) {
        // const docs = [];
        for (let i = 0; i < res.data.data.length; i++) {
          const result = await axios.get(
            `http://localhost:3000/api/project/${res.data.data[i].id}`,
            { withCredentials: true },
          );
          console.log(result);
          docs.push(result.data.data);
        }
        // console.log(docs);
      }
      setData(res.data.data);
    };

    fxn();
  }, [setData]);

  return (
    <>
      <DefaultLayout>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Students Documents Status
          </h4>
          {data.length == 0 ? (
            <h1 className="text-slate-950 text-2xl text-center p-4">
              There Are No Students Assigned To You{' '}
            </h1>
          ) : (
            <div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-2 dark:bg-meta-4">
                    <th className="p-2.5 text-center">Student Name</th>
                    <th className="p-2.5 text-center">Synopsis</th>
                    <th className="p-2.5 text-center">Joining Report</th>
                    <th className="p-2.5 text-center">Mid Term Ppt</th>
                    <th className="p-2.5 text-center">End term PPt</th>
                    <th className="p-2.5 text-center">End term Report</th>
                    <th className="p-2.5 text-center">Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((element, key) => (
                    <tr
                      key={key}
                      className="border-b border-stroke dark:border-strokedark"
                    >
                      <td className="p-2.5 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex-shrink-0">
                            <p className="text-black dark:text-white sm:block">
                              {element.firstname}
                            </p>
                          </div>
                          <p className="hidden text-black dark:text-white sm:block">
                            {element.lastname}
                          </p>
                        </div>
                      </td>
                      <td className="p-2.5 text-center">
                        {docs[key].synopsis != null ? (
                          <a
                            href={`https://drive.google.com/uc?id=${docs[key].synopsis}`}
                          >
                            View
                          </a>
                        ) : (
                          'Not Submitted'
                        )}
                      </td>
                      <td className="p-2.5 text-center">
                        {docs[key].joiningReport != null ? (
                          <a
                            href={`https://drive.google.com/uc?id=${docs[key].joiningReport}`}
                          >
                            View
                          </a>
                        ) : (
                          'Not Submitted'
                        )}
                      </td>
                      <td className="p-2.5 text-center">
                        {docs[key].midterm != null ? (
                          <a
                            href={`https://drive.google.com/uc?id=${docs[key].midterm}`}
                          >
                            View
                          </a>
                        ) : (
                          'Not Submitted'
                        )}
                      </td>
                      <td className="p-2.5 text-center">
                        {docs[key].endterm != null ? (
                          <a
                            href={`https://drive.google.com/uc?id=${docs[key].endterm}`}
                          >
                            View
                          </a>
                        ) : (
                          'Not Submitted'
                        )}
                      </td>
                      <td className="p-2.5 text-center">
                        {docs[key].endtermreport != null ? (
                          <a
                            href={`https://drive.google.com/uc?id=${docs[key].endtermreport}`}
                          >
                            View
                          </a>
                        ) : (
                          'Not Submitted'
                        )}
                      </td>
                      <td className="p-2.5 text-center">
                        {docs[key].completionCertificate != null ? (
                          <a
                            href={`https://drive.google.com/uc?id=${docs[key].completionCertificate}`}
                          >
                            View
                          </a>
                        ) : (
                          'Not Submitted'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default MentorDocument;
