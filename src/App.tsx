import React from 'react'

export default function App() {
  const [totalDuration, setTotalDuration] = React.useState('');
  const [hrs, setHrs] = React.useState(0);
  const [mins, setMins] = React.useState(0);
  const [secs, setSecs] = React.useState(0);
  const [isNegative, setIsNegative] = React.useState(false);
  const [isPositive, setIsPositive] = React.useState(true);

  document.getElementById("adder")?.addEventListener("click", () => {
    document.getElementById("inp")?.focus();
  });

  React.useEffect(() => {
    if (totalDuration !== '') {
      const timeArray = totalDuration.split(':');
      const totalPrevSeconds =
        parseInt(timeArray[0]) * 3600 +
        parseInt(timeArray[1]) * 60 +
        parseInt(timeArray[2]);
      const totalAfterSubtraction = totalPrevSeconds - (hrs * 3600 + mins * 60 + secs);
      const totalAfterAddition = totalPrevSeconds + (hrs * 3600 + mins * 60 + secs);
      setIsNegative(totalAfterSubtraction < 0);
      setIsPositive(totalAfterAddition >= 0);
    }
  }, [totalDuration, hrs, mins, secs]);

  function setTime(event: React.ChangeEvent<HTMLInputElement>) {
    const time = event.target.value;
    const timeArray: string[] = time.split(':');
    
    if (timeArray.length >= 4) {
      alert('Enter time in hrs:mins:seconds format...');
    } else if (timeArray.length === 3) {
      setHrs(parseInt(timeArray[0]));
      setMins(parseInt(timeArray[1]));
      setSecs(parseInt(timeArray[2]));
    } else if (timeArray.length === 2) {
      setHrs(0);
      setMins(parseInt(timeArray[0]));
      setSecs(parseInt(timeArray[1]));
    } else {
      setHrs(0);
      setMins(0);
      setSecs(parseInt(timeArray[0]));
    }
  }

  function subtractTime() {
    if (totalDuration === '') {
      const timeString = (hrs?.toString() ? hrs.toString() : '') +
        ':' + (mins?.toString() ? mins.toString() : '') +
        ':' + secs?.toString();
      setTotalDuration(timeString);
    } else {
      const timeArray: string[] = totalDuration.split(':');
      let totalPrevSeconds: number = (Math.abs(parseInt(timeArray[0])) * 3600) + (parseInt(timeArray[1]) * 60) + parseInt(timeArray[2]);

      if (parseInt(timeArray[0]) < 0) {
        totalPrevSeconds = -totalPrevSeconds;
      }

      const totalCurrSeconds: number = (hrs * 3600) + (mins * 60) + secs;
      const totalAfterSubtraction: number = totalPrevSeconds - totalCurrSeconds;
      let totalSecsLeft = Math.abs(totalAfterSubtraction);
      const hours: number = Math.floor(totalSecsLeft / 3600); 
      totalSecsLeft %= 3600;
      const minutes: number = Math.floor(totalSecsLeft / 60);
      totalSecsLeft %= 60;
      const seconds: number = totalSecsLeft;
      
      const timeString: string = (isNegative ? '-' : '') + hours.toString() + ':' + minutes.toString() + ':'  + seconds.toString();
      setTotalDuration(timeString);
      console.log(totalDuration);
      
    }
  }

  function addTime() {
    if (totalDuration === '') {
      const timeString = (hrs?.toString() ? hrs.toString() : '') +
        ':' + (mins?.toString() ? mins.toString() : '') +
        ':' + secs?.toString();
      setTotalDuration(timeString);
    } else {
      const timeArray: string[] = totalDuration.split(':');
      let totalPrevSeconds: number = (Math.abs(parseInt(timeArray[0])) * 3600) + (parseInt(timeArray[1]) * 60) + parseInt(timeArray[2]);

      if (parseInt(timeArray[0]) < 0) {
        totalPrevSeconds = -totalPrevSeconds;
      }
      const totalCurrSeconds: number = (hrs * 3600) + (mins * 60) + secs;
      const totalAfterAddition: number = totalPrevSeconds + totalCurrSeconds;
      let totalSecsLeft = Math.abs(totalAfterAddition);
      const hours: number = Math.floor(totalSecsLeft / 3600); 
      totalSecsLeft %= 3600;
      const minutes: number = Math.floor(totalSecsLeft / 60);
      totalSecsLeft %= 60;
      const seconds: number = totalSecsLeft;
      const timeString: string = (isPositive ? '' : '-') + hours.toString() + ':' + minutes.toString() + ':'  + seconds.toString();
      setTotalDuration(timeString);
      console.log(totalDuration);
          
    }
  }


return (
  <main>
    <button className='subtract' onClick={subtractTime}>Subtract</button>
    <input type="text" id='inp' placeholder='Enter time in hh:mm:ss format...' onChange={setTime} />
    <button className='add' id='adder' onClick={addTime}>Add</button>
    <h1>Total time is {totalDuration}</h1>
  </main>
)
}
