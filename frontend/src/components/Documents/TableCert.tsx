import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import type { RootState } from '../../redux/store';

type File = {
  id: number;
  title: string | null;
  synopsis: string | null;
  joiningReport: string | null;
  completionCertificate: string | null;
  slot: string | null;
};

const TableCert = () => {
  const [project, setProject] = useState(true);
  const [data, setData] = useState<File>();
  const [certName, setCertName] = useState('No File Exist');

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(`http://localhost:3000/api/project/`, {
        withCredentials: true,
      });
      if (res.data.data.completionCertificate != null) {
        const ans1 = await axios.get(
          `http://localhost:3000/api/project/fileName/${res.data.data.completionCertificate}`,
          { withCredentials: true },
        );
        setCertName(ans1.data.data.name);
      }

      if (res.data == null) {
        setProject(false);
      } else {
        setData(res.data.data);
      }
      console.log(res);
    };
    fxn();
  }, [setProject, setData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/project/${id}`, {
        withCredentials: true,
      });

      toast.success('Deleted');

      // window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="max-w-full overflow-x-auto bg-white rounded-lg shadow-md p-9">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Files</th>
              <th className="px-4 py-2">Status</th>
              {data != undefined && data.synopsis != null && (
                <th className="px-4 py-2">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">Certificate</td>
              <td className="border px-4 py-2 text-center">{certName}</td>
              {data != undefined && data.completionCertificate != null ? (
                <td className="flex justify-evenly border px-4 py-2">
                  <a
                    href={`https://drive.google.com/uc?id=${data.completionCertificate}`}
                    target="_blank"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete('cert/')}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg "
                  >
                    Delete
                  </button>
                </td>
              ) : (
                ''
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableCert;
