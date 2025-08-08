import React, { useState, useEffect } from 'react';

function generateTimeOptions() {
  const options = [];
  const now = new Date();
  now.setSeconds(0, 0);

  const start = new Date(now);
  start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15); 

  const end = new Date(now);
  end.setHours(23, 45, 0, 0); 

  for (let time = new Date(start); time <= end; time.setMinutes(time.getMinutes() + 15)) {
    const label = formatAMPM(time);
    const value = time.toTimeString().slice(0, 5); 
    options.push({ label, value });
  }

  return options;
}

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const strHours = hours.toString().padStart(2, '0');
  const strMinutes = minutes.toString().padStart(2, '0');
  return `${strHours}:${strMinutes} ${ampm}`;
}

export default function TimeRangeDropdown() {
  const [options, setOptions] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    const opts = generateTimeOptions();
    setOptions(opts);
    if (opts.length > 0) {
      setStartTime(opts[0].value);
      setEndTime(opts[1]?.value || opts[0].value);
    }
  }, []);

  return (
    <div className="flex items-center justify-center space-x-1 text-white h-11">
      <div className="bg-[#2a2a2a] h-full font-bold flex items-center px-1 justify-center rounded-md">
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="bg-transparent text-white focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-black flex items-center justify-center">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <span className="text-xl text-gray-400">-</span>
      <div className="bg-[#2a2a2a] h-full font-bold flex items-center justify-center px-1 rounded-md">
        <select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="bg-transparent text-white focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-black flex items-center justify-center">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}