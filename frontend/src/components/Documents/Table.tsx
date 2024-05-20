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

const Table = () => {
  const [project, setProject] = useState(true);
  const [data, setData] = useState<File>();
  const [synopsisName, setSynopsisName] = useState('No File Exist');
  const [reportName, setReportName] = useState('No File Exist');
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(`http://localhost:3000/api/project/`, {
        withCredentials: true,
      });
      if (res.data.data.synopsis != null) {
        const ans1 = await axios.get(
          `http://localhost:3000/api/project/fileName/${res.data.data.synopsis}`,
          { withCredentials: true },
        );
        setSynopsisName(ans1.data.data.name);
      }
      if (res.data.data.joiningReport != null) {
        const ans2 = await axios.get(
          `http://localhost:3000/api/project/fileName/${res.data.data.joiningReport}`,
          { withCredentials: true },
        );
        setReportName(ans2.data.data.name);
      }

      if (res.data == null) {
        setProject(false);
      } else {
        setData(res.data.data);
      }
      console.log(res);
    };
    fxn();
  }, [setProject, setData, setReportName]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/project/${id}`, {
        withCredentials: true,
      });

      toast.success('Deleted');

      if (id == 'synopsis/') {
        setSynopsisName('No File Exist');
      } else {
        setReportName('No File Exist');
      }
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
              <td className="border px-4 py-2 text-center">Synopsis</td>
              <td className="border px-4 py-2 text-center">{synopsisName}</td>
              {data != undefined && data.synopsis != null ? (
                <td className="flex justify-evenly border px-4 py-2">
                  <a
                    href={`https://drive.google.com/uc?id=${data.synopsis}`}
                    target="_blank"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete('synopsis/')}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg "
                  >
                    Delete
                  </button>
                </td>
              ) : (
                ''
              )}
            </tr>
            <tr>
              <td className="border px-4 py-2 text-center">Joining Report</td>
              <td className="border px-4 py-2 text-center">{reportName}</td>
              {data != undefined && data.joiningReport != null ? (
                <td className="flex justify-evenly border px-4 py-2">
                  <a
                    href={`https://drive.google.com/uc?id=${data.joiningReport}`}
                    target="_blank"
                    className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg pr-3"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete('report/')}
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

export default Table;
