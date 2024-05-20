import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import MidTermTable from './MidTermTable';
import DefaultLayout from '../../layout/DefaultLayout';

const DocumentUplaod = () => {
  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [fileThree, setFileThree] = useState(null);

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(`http://localhost:3000/api/project/`, {
        withCredentials: true,
      });

      if (res.data.data == null) {
        const result = await axios.post(
          `http://localhost:3000/api/project/`,
          { title: 'No Title Exist' },
          {
            withCredentials: true,
          },
        );
      }
      console.log(res);
    };
    fxn();
  }, []);

  const handleFileOneChange = (e) => {
    setFileOne(e.target.files[0]);
  };

  const handleFileTwoChange = (e) => {
    setFileTwo(e.target.files[0]);
  };

  const handleFileThreeChange = (e) => {
    setFileThree(e.target.files[0]);
  };

  const handleFileOneUpload = async () => {
    if (!fileOne) return;
    try {
      const formData = new FormData();
      formData.append('file', fileOne);
      const response = await axios.post(
        'http://localhost:3000/api/project/midterm',
        formData,
        { withCredentials: true },
      );
      toast.success('MidTerm PPT Submitted SucessFully ');
      setFileOne(null);
      // window.location.reload();
    } catch (error) {
      toast.error('Error');
      console.error('Error uploading file One:', error);
    }
  };

  const handleFileTwoUpload = async () => {
    if (!fileTwo) return;
    try {
      const formData = new FormData();
      formData.append('file', fileTwo);
      const response = await axios.post(
        'http://localhost:3000/api/project/endterm',
        formData,
        { withCredentials: true },
      );
      toast.success('End Term PPT Submitted SucessFully ');
      setFileTwo(null);
      // window.location.reload();
    } catch (error) {
      toast.error('Error');
      console.error('Error uploading file Two:', error);
    }
  };

  const handleFileThreeUpload = async () => {
    if (!fileThree) return;
    try {
      const formData = new FormData();
      formData.append('file', fileThree);
      const response = await axios.post(
        'http://localhost:3000/api/project/endreport',
        formData,
        { withCredentials: true },
      );
      toast.success('End Term Report Submitted SucessFully ');
      setFileThree(null);
      // window.location.reload();
    } catch (error) {
      toast.error('Error');
      console.error('Error uploading file Two:', error);
    }
  };

  return (
    <>
      <DefaultLayout>
        <div className="max-w-4xl mx-auto p-2 ">
          <h1 className="text-slate-950 text-3xl font-bold dark:text-white">
            Please Upload The document In the Following Convention
          </h1>
          <p className="m-2 text-slate-950 text-xl font-semibold dark:text-white">
            Mid Term Presentation : regno_yourname_midTermPresentation.ppt
          </p>
          <p className="m-2 text-slate-950 text-xl font-semibold dark:text-white">
            End Term Presentation : regno_yourname_endTermPresentation.ppt
          </p>
          <p className="m-2 text-slate-950 text-xl font-semibold dark:text-white">
            End Term Report : regno_yourname_endTermReport.ppt
          </p>
        </div>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md m-8">
          <h2 className="text-2xl font-semibold mb-4">Upload Three Files</h2>
          <div className="mb-4">
            <label htmlFor="fileOne" className="block mb-2 font-semibold">
              Upload Mid Term Presentation
            </label>
            <input
              className="ml-2"
              type="file"
              id="fileOne"
              onChange={handleFileOneChange}
            />
            <button
              onClick={handleFileOneUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ml-1 mr-2 my-4 "
            >
              Upload File One
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="fileTwo" className="block mb-2 font-semibold">
              Upload End Term Presentation
            </label>
            <input
              className="ml-2"
              type="file"
              id="fileTwo"
              onChange={handleFileTwoChange}
            />
            <button
              onClick={handleFileTwoUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 ml-1 rounded-lg my-6"
            >
              Upload File Two
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="fileThree" className="block mb-2 font-semibold">
              Upload End Term Report
            </label>
            <input
              className="ml-2"
              type="file"
              id="fileThree"
              onChange={handleFileThreeChange}
            />
            <button
              onClick={handleFileThreeUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 ml-1 rounded-lg my-6"
            >
              Upload File Three
            </button>
          </div>
        </div>
        <MidTermTable />
      </DefaultLayout>
    </>
  );
};

export default DocumentUplaod;
