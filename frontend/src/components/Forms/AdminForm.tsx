import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import toast from 'react-hot-toast';

const AdminForm = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(`http://localhost:3000/api/admin/lock/`, {
        withCredentials: true,
      });
      setData(res.data.data.lock);
    };

    fxn();
  }, [setData]);

  const buttonHandler = async (e) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/admin/lock/`,
        { lock: !data },
        { withCredentials: true },
      );
      toast.success('Changed');
      setData(res.data.data.lock);
    } catch (e) {
      toast.error('Error Occured');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-slate-950 text-4xl mb-6 dark:text-white">
        Admin Permission Controls
      </h1>

      <div className="max-w-full overflow-x-auto bg-white rounded-lg shadow-md p-9 mt-9">
        <div>
          <h1 className="text-2xl text-slate-950 font-semibold mt-10 mb-4">
            Marks Filling Permission
          </h1>
        </div>
        <div className="m-3">
          <h1 className="text-1xl text-slate-950 font-semibold mt-10 mb-4">
            Current Value is :{data ? ' Allowed' : ' Not Allowed'}
          </h1>
          <button
            className="border text-slate-200 p-3 rounded-lg bg-blue-600"
            onClick={buttonHandler}
          >
            Change
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminForm;
