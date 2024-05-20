import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TableCert from './TableCert';
import DefaultLayout from '../../layout/DefaultLayout';

const Certificate = () => {
  const [fileOne, setFileOne] = useState(null);

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(`http://localhost:3000/api/project/`, {
        withCredentials: true,
      });

      if (res.data.data != null) {
        setFileOne(res.data.data.certificate);
      } else {
        const result = await axios.post(
          `http://localhost:3000/api/project/`,
          { title: 'No Title Exist' },
          {
            withCredentials: true,
          },
        );
        setFileOne(result.data.data.certificate);
      }
      console.log(res);
    };
    fxn();
  }, [setFileOne]);

  const handleFileOneChange = (e) => {
    setFileOne(e.target.files[0]);
  };

  const handleFileOneUpload = async () => {
    if (!fileOne) return;
    try {
      const formData = new FormData();
      formData.append('file', fileOne);
      const response = await axios.post(
        'http://localhost:3000/api/project/cert',
        formData,
        { withCredentials: true },
      );
      toast.success('Certificate Submitted SucessFully ');
      setFileOne(null);
      // window.location.reload();
    } catch (error) {
      console.error('Error uploading file One:', error);
    }
  };

  return (
    <>
      <DefaultLayout>
        <div className="max-w-4xl mx-auto p-2 ">
          <h1 className="text-slate-950 text-2xl font-bold dark:text-white">
            Please Upload The Certificate In the Following Convention
          </h1>
          <p className="m-2 text-slate-950 text-xl font-semibold dark:text-white">
            Synopsis : regno_yourname_certificate.pdf
          </p>
        </div>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-4">Upload Certificate</h2>
            <div className="mb-4">
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
                Upload
              </button>
            </div>
          </div>
        </div>
        <TableCert />
      </DefaultLayout>
    </>
  );
};

export default Certificate;
