import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import DefaultLayout from '../layout/DefaultLayout';

const SlotSelection = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newSlot, setNewSlot] = useState(null);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fxn = async () => {
      const res = await axios.get(`http://localhost:3000/api/project/`, {
        withCredentials: true,
      });

      if (res.data.data != null) {
        setSelectedSlot(res.data.data.slot);
      } else {
        const result = await axios.post(
          `http://localhost:3000/api/project/`,
          { title: 'No Title Exist' },
          {
            withCredentials: true,
          },
        );
        setSelectedSlot(result.data.data.slot);
      }
      console.log(res);
    };
    fxn();
  }, [setSelectedSlot]);

  const handleSlotChange = (slot) => {
    setNewSlot(slot);
  };

  const handleSelectSlot = async () => {
    try {
      const result = await axios.put(
        `http://localhost:3000/api/project/slot`,
        { slot: newSlot },
        {
          withCredentials: true,
        },
      );
      console.log(result);
      toast.success('Updated The Slot');
      const mailData = {
        from: 'prashant67670@gmail.com',
        to: user.data.email,
        subject: 'Slot Allocation Mail',
        message: `<div>
        <h1>🌟 Slot Selected 🌟</h1>
        <p>Hello ${user.data.name},</p>
        <p>You Have Chosen The ${result.data.data.slot} Slot</p>
        <p>If you have any immediate questions or concerns, feel free to reach out to us.</p>
        <div>
          <p>Best Regards,</p>
          <p>The Project Q Team</p>
        </div>
      </div>`,
      };
      await axios.post('http://localhost:3000/api/send', mailData);
      setSelectedSlot(result.data.data.slot);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DefaultLayout>
        <div className="max-w-4xl mx-auto p-2 ">
          <h1 className="text-slate-950 text-4xl font-bold dark:text-white">
            Slot Selection
          </h1>
        </div>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Please Choose A Slot
            </label>
            <div className="flex m-2">
              <input
                type="radio"
                value="May"
                id="may"
                checked={newSlot === 'May'}
                onChange={() => handleSlotChange('May')}
              />
              <label
                htmlFor="may"
                className="text-slate-950 text-xl font-bold ml-2"
              >
                May
              </label>
            </div>

            <div className="flex m-2">
              <input
                type="radio"
                value="July"
                id="july"
                checked={newSlot === 'July'}
                onChange={() => handleSlotChange('July')}
              />
              <label
                htmlFor="july"
                className="text-slate-950 text-xl font-bold ml-2"
              >
                July
              </label>
            </div>
            <button
              onClick={handleSelectSlot}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ml-1 mr-2 my-4"
            >
              Update
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Your Slot is {selectedSlot}
              </h1>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default SlotSelection;
