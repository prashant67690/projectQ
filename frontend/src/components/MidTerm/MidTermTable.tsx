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
  midterm: string | null;
  endterm: string | null;
  endtermreport: string | null;
  endtermmarks: number | null;
};

const Table = () => {
  const [project, setProject] = useState(true);
  const [data, setData] = useState<File>();
  const [midtermpptName, setMidTermPptName] = useState('No File Exist');
  const [endtermpptName, setEndTermPptName] = useState('No File Exist');
  const [endtermreportName, setEndTermReportName] = useState('No File Exist');

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(`http://localhost:3000/api/project/`, {
        withCredentials: true,
      });
      if (res.data.data.midterm != null) {
        const ans = await axios.get(
          `http://localhost:3000/api/project/fileName/${res.data.data.midterm}`,
          { withCredentials: true },
        );
        setMidTermPptName(ans.data.data.name);
      }
      if (res.data.data.endterm != null) {
        const ans = await axios.get(
          `http://localhost:3000/api/project/fileName/${res.data.data.endterm}`,
          { withCredentials: true },
        );
        setEndTermPptName(ans.data.data.name);
      }

      if (res.data.data.endtermreport != null) {
        const ans = await axios.get(
          `http://localhost:3000/api/project/fileName/${res.data.data.endtermreport}`,
          { withCredentials: true },
        );
        setEndTermReportName(ans.data.data.name);
      }

      if (res.data == null) {
        setProject(false);
      } else {
        setData(res.data.data);
      }
      console.log(res);
    };
    fxn();
  }, [
    setProject,
    setData,
    setEndTermPptName,
    setMidTermPptName,
    setEndTermReportName,
  ]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/project/${id}`, {
        withCredentials: true,
      });

      toast.success('Deleted');

      if (id == 'midterm/') {
        setMidTermPptName('No File Exist');
      } else if (id == 'endterm/') {
        setEndTermPptName('No File Exist');
      } else {
        setEndTermReportName('No File Exist');
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
              {data != undefined &&
                (data.midterm != null ||
                  data.endterm != null ||
                  data.endtermreport != null) && (
                  <th className="px-4 py-2">Actions</th>
                )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">
                Mid Term Presentation
              </td>
              <td className="border px-4 py-2 text-center">{midtermpptName}</td>
              {data != undefined && data.midterm != null ? (
                <td className="flex justify-evenly border px-4 py-2">
                  <a
                    href={`https://drive.google.com/uc?id=${data.midterm}`}
                    target="_blank"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete('midterm/')}
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
              <td className="border px-4 py-2 text-center">
                End Term Presentation
              </td>
              <td className="border px-4 py-2 text-center">{endtermpptName}</td>
              {data != undefined && data.endterm != null ? (
                <td className="flex justify-evenly border px-4 py-2">
                  <a
                    href={`https://drive.google.com/uc?id=${data.endterm}`}
                    target="_blank"
                    className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg pr-3"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete('endterm/')}
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
              <td className="border px-4 py-2 text-center">End Term Report</td>
              <td className="border px-4 py-2 text-center">
                {endtermreportName}
              </td>
              {data != undefined && data.endtermreport != null ? (
                <td className="flex justify-evenly border px-4 py-2">
                  <a
                    href={`https://drive.google.com/uc?id=${data.endtermreport}`}
                    target="_blank"
                    className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg pr-3"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete('endreport/')}
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
