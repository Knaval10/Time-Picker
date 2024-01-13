import React, { useState, useRef, useEffect } from "react";
import clockIcon from '../assets/clock.svg';
const TimePicker = () => {
  const [displayTime, setDisplayTime] = useState(false);
  const [hour, setHour] = useState("5");
  const [minute, setMinute] = useState("00");
  const [standard, setStandard] = useState("AM");
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [selectedStandard, setSelectedStandard] = useState(null)

  const handleSelectedStandard = (idx)=>{
    setSelectedStandard(idx);
  }

  const handleSelectedHour = (idx) => {
    setSelectedHour(idx);
  };
  const handleSelectedMinute = (idx) => {
    setSelectedMinute(idx);
  };

  const timeRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("timeRefEvent", timeRef.current.contains(event.target));
      if (timeRef.current && !timeRef.current.contains(event.target)) {
        // Clicked outside the time container, so close it
        setDisplayTime(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getTime = (limit, timeType) => {
    const timeValue = [];
    if(timeType==="minute"){
    for (let i = 0; i < limit; i++) {
      timeValue.push("" + i);
    }
  }
  else{
    for (let i = 1; i <= limit; i++) {
      timeValue.push("" + i);
    }
  }
    if (timeType === "minute") {
      const convertedMinuteValues = timeValue.map((time) =>
        time <= 9 ? "0" + time : "" + time
      );
      console.log("minutes", convertedMinuteValues);
      return convertedMinuteValues;
    } else {
      console.log("hours", timeValue);
      return timeValue;
    }
  };

  const hourValues = getTime(12, "hour");
  const minuteValues = getTime(60, "minute");

  const standardValue = [
    {
      id: 1,
      title: "AM",
    },
    {
      id: 2,
      title: "PM",
    },
  ];

  return (
    <div ref={timeRef} className='flex flex-col items-center mt-20 relative'>
        <div
          onClick={() => setDisplayTime(!displayTime)}
          className='flex gap-2 border border-gray-300 hover:border-[#7f56d9] shadow-md rounded-[8px] text-[24px] px-4 py-1 hover:cursor-pointer'
        >
          <div className='flex'>
            <img src={clockIcon} alt="" />
          </div>
          <div className='flex text-black'>
            <div className="">{hour}</div>
            <div className="">:</div>
            <div className="">{minute}</div>
            <div className='pl-1'>{standard}</div>
          </div>
        </div>
        {displayTime && (
          <div className='bg-white flex absolute gap-[10px] mt-14 border border-gray-300 shadow-md rounded-[8px] p-[10px] justify-center hover:border-[#7f56d9]'>
            <div className='flex flex-col items-center border border-gray-300 shadow-md text-black h-[200px] overflow-y-scroll overflow-x-hidden gap-2 p-2 rounded-[8px]'>
              {hourValues.map((time, idx) => (
                <div
                  key={idx}
                  style={{
                    background: selectedHour === idx ? "lightblue" : "white",borderRadius:4,
                  }}
                  onClick={() => {
                    handleSelectedHour(idx);
                    setHour(time);
                  }}
                  className='items-center px-2 py-[2px] hover:!bg-[#f9f5ff] hover:border border-[#7f56d9] hover:cursor-pointer'
                >
                  <span>{time}</span>
                </div>
              ))}
            </div>
            <div className='flex flex-col items-center border border-gray-300 shadow-md text-black h-[200px] overflow-y-scroll overflow-x-hidden gap-2 p-2 rounded-[8px]'>
              {/* <span className={styles.label}>Minute</span> */}
              {minuteValues.map((time, idx) => (
                <div
                  style={{
                    background: selectedMinute === idx ? "lightblue" : "white",borderRadius:4,
                  }}
                  onClick={() => {
                    handleSelectedMinute(idx);
                    setMinute(time);
                  }}
                  key={idx}
                  className='items-center px-2 py-[2px] hover:!bg-[#f9f5ff] hover:border border-[#7f56d9] hover:cursor-pointer'
                >
                  <span>{time}</span>
                </div>
              ))}
            </div>
            <div className='flex flex-col h-fit gap-[10px] text-black border-gray-300 shadow-md p-[10px] rounded-[8px]' >
              {standardValue.map((std, idx) => (
                <div
                  onClick={() => {
                    handleSelectedStandard(idx)
                    setStandard(std.title)}}
                  key={idx}
                  style={{
                    background: selectedStandard === idx ? "lightblue" : "white",borderRadius:4,
                  }}
                  className='px-2 py-[2px] hover:border border-[#7f56d9] hover:cursor-pointer'
                >
                  <span onClick={() => setDisplayTime(false)}>{std.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default TimePicker;
