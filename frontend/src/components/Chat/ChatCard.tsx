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

const ChatCard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState<StudentType[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/mentor/students/${user.data.id}`,
        { withCredentials: true },
      );
      console.log(res);
      setData(res.data.data);
    };

    fxn();
  }, [setData]);

  const selectChangeHandler = (e) => {
    if (e.target.value == '') {
      setName('');
    }
    const id = e.target.value;
    const numbers = data[id].marks;
    console.log(numbers);
    setName(e.target.value);
  };

  const emailChnageHandler = async (e) => {
    setEmail(e.target.value);
  };

  const subjectChnageHandler = async (e) => {
    setSubject(e.target.value);
  };

  const messageChnageHandler = async (e) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = async (e) => {
    if (email == '' || subject == '' || message == '') {
      toast.error('pelase Fill All the Values');
      return;
    }
    try {
      const mailData = {
        from: user.data.email,
        to: email,
        subject: subject,
        message: `<div>
        <h1>Message From Your Mentor</h1>
        <p>Hello</p>
        <p>${message}</p>
        <div>
          <p>Best Regards</p>
          <p>${data[name].firstname + ' ' + data[name].lastname}</p>
        </div>
      </div>`,
      };
      const result = await axios.post(
        'http://localhost:3000/api/send',
        mailData,
      );
      toast.success('Submitted');
      setEmail('');
      setSubject('');
      setMessage('');
      console.log(result);
    } catch (e) {
      toast.error('error');
    }
  };

  return (
    <>
      <DefaultLayout>
        <div className="rounded-sm border h-full border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-3xl font-semibold text-black dark:text-white">
            Enter Students' Mid Term Marks
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
                    <h1 className="text-slate-950 text-lg mt-10"></h1>
                  </div>

                  <div className="mt-10 flex flex-col">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-lg text-slate-950 mr-4 text-center pt-2"
                      >
                        Email Of The Student :
                      </label>
                      <input
                        className="border  rounded-lg p-1 m-1 w-100"
                        type="text"
                        id="email"
                        defaultValue={data[name].email}
                        onChange={emailChnageHandler}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="text-lg text-slate-950 mr-4 text-center pt-2"
                      >
                        Subject :
                      </label>
                      <input
                        className="ml-28 rounded-lg border p-1 m-1 w-100"
                        type="text"
                        id="subject"
                        onChange={subjectChnageHandler}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="message"
                        className="text-lg  text-slate-950 mr-4 text-center pt-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Enter Your Message Here"
                        onChange={messageChnageHandler}
                        rows={4}
                        className=" p-2 mt-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                    <button
                      onClick={sendMessageHandler}
                      className="bg-blue-500 hover:bg-blue-700 mb-20 text-white font-bold py-2 px-4 rounded"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default ChatCard;
