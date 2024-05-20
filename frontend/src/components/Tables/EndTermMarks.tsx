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

const MidTermMarks = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState<StudentType[]>([]);
  const [update, setUpdate] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [marks, setMarks] = useState<number | null>(0);
  const [currmarks, setCurrMarks] = useState<number | null>(0);

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/mentor/students/${user.data.id}`,
        { withCredentials: true },
      );
      console.log(res);
      if (res.data.data != null) {
        const res = await axios.get(`http://localhost:3000/api/admin/lock/`, {
          withCredentials: true,
        });
        setUpdate(res.data.data.lock);
      }
      setData(res.data.data);
    };

    fxn();
  }, [setData, marks, setMarks]);

  const selectChangeHandler = async (e) => {
    if (e.target.value == '') {
      setName('');
    }
    const id = e.target.value;

    const res = await axios.get(
      `http://localhost:3000/api/project/${data[id].id}`,
      { withCredentials: true },
    );
    console.log(res);
    const numbers = res.data.data.endtermmarks;
    console.log(numbers);
    setCurrMarks(numbers);
    setName(e.target.value);
  };

  const marksChnageHandler = async (e) => {
    setMarks(e.target.value);
  };

  const updateMarksHandler = async (e) => {
    if (marks == 0) {
      toast.error('pelase select marks > 0');
    }
    try {
      const id = data[name].id;
      console.log(marks);
      const res = await axios.put(
        `http://localhost:3000/api/project/endmarks/${id}`,
        { marks },
        { withCredentials: true },
      );
      console.log(res);
      toast.success('Updated');

      setCurrMarks(marks);
    } catch (e) {
      toast.error('error');
    }
  };

  return (
    <>
      <DefaultLayout>
        <div className="rounded-sm border h-90 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-3xl font-semibold text-black dark:text-white">
            Enter Students' End Term Marks
          </h4>
          {data.length == 0 ? (
            <h1 className="text-slate-950 text-2xl text-center p-4">
              There Are No Students Assigned To You{' '}
            </h1>
          ) : (
            <div className="mt-10">
              <label
                htmlFor="student"
                className=" text-slate-800 font-semibold text-xl"
              >
                Select The Name Of The Student{' '}
              </label>

              <select
                id="student"
                onChange={selectChangeHandler}
                className="border text-slate-700 m-3 rounded-lg w-70 h-10"
              >
                <option value="" key="0">
                  Select{' '}
                </option>
                {data.map((e, id) => {
                  return (
                    <option key={id} value={id}>
                      {e.firstname + ' ' + e.lastname}
                    </option>
                  );
                })}
              </select>
              {name != '' && (
                <div>
                  <div>
                    <h1 className="text-slate-950 text-lg mt-10">
                      End Term Marks Are:{' '}
                      {currmarks == null ? 'Not Assigned' : currmarks}
                    </h1>
                  </div>
                  {update && (
                    <div className="mt-10 flex">
                      <label
                        htmlFor="marks"
                        className="text-lg text-slate-950 mr-4 text-center pt-2"
                      >
                        Update the Marks
                      </label>
                      <input
                        className="border p-1 m-1"
                        type="text"
                        id="marks"
                        defaultValue={currmarks?.toString()}
                        onChange={marksChnageHandler}
                      />
                      <button
                        onClick={updateMarksHandler}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default MidTermMarks;
