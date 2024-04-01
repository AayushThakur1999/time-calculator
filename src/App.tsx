import { useState, useEffect } from 'react'

export default function App() {
  const [totalDuration, setTotalDuration] = useState('');
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [isNegative, setIsNegative] = useState(false);
  const [isPositive, setIsPositive] = useState(true);

  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      document.getElementById('input')!.focus();
    });
  });

  // checks whether total is +ve or -ve after operation and based on that sets isPositive and isNegative
  useEffect(() => {
    if (totalDuration !== '') {
      const timeArray = totalDuration.split(':');
      let totalPrevSeconds =
        Math.abs(parseInt(timeArray[0])) * 3600 +
        parseInt(timeArray[1]) * 60 +
        parseInt(timeArray[2]);
      if (parseInt(timeArray[0]) < 0 || timeArray[0] === '-0') {
        totalPrevSeconds = -totalPrevSeconds;
      }
      const totalAfterSubtraction = totalPrevSeconds - (hrs * 3600 + mins * 60 + secs);
      const totalAfterAddition = totalPrevSeconds + (hrs * 3600 + mins * 60 + secs);
      setIsNegative(totalAfterSubtraction < 0);
      setIsPositive(totalAfterAddition >= 0);
    }
  }, [totalDuration, hrs, mins, secs]);

  // sets the hrs, mins and secs states
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

  // handles the addition and subtraction of time
  function operation(operator: string, isOperator: boolean, positive: boolean) {
    if (totalDuration === '') {
      const timeString = (hrs?.toString() ? hrs.toString() : '') +
        ':' + (mins?.toString() ? mins.toString() : '') +
        ':' + secs?.toString();
      setTotalDuration(timeString);
    } else {
      const timeArray: string[] = totalDuration.split(':');
      let totalPrevSeconds: number = (Math.abs(parseInt(timeArray[0])) * 3600) + (parseInt(timeArray[1]) * 60) + parseInt(timeArray[2]);
      if (parseInt(timeArray[0]) < 0 || timeArray[0] === '-0') {
        totalPrevSeconds = -totalPrevSeconds;
      }
      const totalCurrSeconds: number = (hrs * 3600) + (mins * 60) + secs;
      const totalAfterOperation: number = eval(`${totalPrevSeconds} ${operator} ${totalCurrSeconds}`);
      let totalSecsLeft = Math.abs(totalAfterOperation);
      const hours: number = Math.floor(totalSecsLeft / 3600);
      totalSecsLeft %= 3600;
      const minutes: number = Math.floor(totalSecsLeft / 60);
      totalSecsLeft %= 60;
      const seconds: number = totalSecsLeft;

      let timeString: string;
      if (positive) {
        timeString = (isOperator ? '' : '-') + hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();
      } else {
        timeString = (isOperator ? '-' : '') + hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();
      }
      setTotalDuration(timeString);
    }
  }

  return (
    <main>
      <button className='subtract btn' onClick={() => operation('-', isNegative, false)}>Subtract</button>
      <input type="text" id='input' placeholder='Enter time in hr:min:sec format...' onChange={setTime} />
      <button className='add btn' onClick={() => operation('+', isPositive, true)}>Add</button>
      <button className="reset btn" onClick={() => setTotalDuration('0:0:0')}>Reset Time</button>
      <h1>Total time is {totalDuration}</h1>
    </main>
  )
}
