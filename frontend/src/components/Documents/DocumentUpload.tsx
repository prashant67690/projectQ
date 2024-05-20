import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Table from './Table';
import DefaultLayout from '../../layout/DefaultLayout';

const DocumentUplaod = () => {
  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [title, setTitle] = useState('');
  const [titleInput, setTitleInput] = useState<string>('');

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(`http://localhost:3000/api/project/`, {
        withCredentials: true,
      });

      if (res.data.data != null) {
        setTitle(res.data.data.title);
      } else {
        const result = await axios.post(
          `http://localhost:3000/api/project/`,
          { title: 'No Title Exist' },
          {
            withCredentials: true,
          },
        );
        setTitle(result.data.data.title);
      }
      console.log(res);
    };
    fxn();
  }, [setTitle]);

  const handleFileOneChange = (e) => {
    setFileOne(e.target.files[0]);
  };

  const handleFileTwoChange = (e) => {
    setFileTwo(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitleInput(e.target.value);
  };

  const handleTitleUplaod = async () => {
    if (titleInput == '') {
      toast.error('Enter The Title');
      return;
    }
    const result = await axios.put(
      `http://localhost:3000/api/project/title`,
      { title: titleInput },
      {
        withCredentials: true,
      },
    );
    setTitle(result.data.data.title);
    setTitleInput('');
  };

  const handleFileOneUpload = async () => {
    if (!fileOne) return;
    try {
      const formData = new FormData();
      formData.append('file', fileOne);
      const response = await axios.post(
        'http://localhost:3000/api/project/synopsis',
        formData,
        { withCredentials: true },
      );
      toast.success('Synopsis Submitted SucessFully ');
      setFileOne(null);
      // window.location.reload();
    } catch (error) {
      console.error('Error uploading file One:', error);
    }
  };

  const handleFileTwoUpload = async () => {
    if (!fileTwo) return;
    try {
      const formData = new FormData();
      formData.append('file', fileTwo);
      const response = await axios.post(
        'http://localhost:3000/api/project/report',
        formData,
        { withCredentials: true },
      );
      toast.success('Joining Report Submitted SucessFully ');
      setFileTwo(null);
      // window.location.reload();
    } catch (error) {
      console.error('Error uploading file Two:', error);
    }
  };

  return (
    <>
      <DefaultLayout>
        <div className="max-w-4xl mx-auto p-2 ">
          <h1 className="text-slate-950 text-2xl font-bold dark:text-white">
            Please Upload The document In the Following Convention
          </h1>
          <p className="m-2 text-slate-950 text-xl font-semibold dark:text-white">
            Synopsis : regno_yourname_synopsis.pdf
          </p>
          <p className="m-2 text-slate-950 text-xl font-semibold dark:text-white">
            Joining Report : regno_yourname_report.pdf
          </p>
        </div>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md m-8">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-semibold">
              Title : {title}
            </label>
            <input
              className="ml-2 border-2 rounded-lg p-2 w-70 border-slate-950 border-solid"
              type="text"
              value={titleInput}
              id="title"
              onChange={handleTitleChange}
            />
            <button
              onClick={handleTitleUplaod}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ml-1 mr-2 my-4 "
            >
              Change
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Upload Two Files</h2>
          <div className="mb-4">
            <label htmlFor="fileOne" className="block mb-2 font-semibold">
              Synopsis
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
              Upload Synopsis
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="fileTwo" className="block mb-2 font-semibold">
              Joining Report
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
        </div>
        <Table />
      </DefaultLayout>
    </>
  );
};

export default DocumentUplaod;
