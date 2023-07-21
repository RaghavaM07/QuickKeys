import React,{ useState, useEffect, useRef} from 'react'
import { Game } from '../models/Game';

export const Timer = ({Time,setSpeed,index,inCorrects,setGameEnded,endGame,setCurrentTime}) => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState(null);

    useEffect(()=>{
        if(timer){
            const data = Game.getSpeed(index,inCorrects,Time-(timer.total/1000))
            setCurrentTime(Time-(timer.total/1000))
            setSpeed(data);
        }
        if(timer?.time==="00:00")
        {
            endGame(Time-(timer.total/1000))
        }
    },[timer])

 
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }
 
    const startTimer = (e) => {
        let { total, minutes, seconds }
                    = getTimeRemaining(e);
        if (total >= 0) {
            setTimer({
                total,
                time: (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            }
            )
        }
    }
 
    const clearTimer = (e) => {
 
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + Time);
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
 


  return (
    <div className="App">
            {timer && (<h2>{timer?.time}</h2>)}
        </div>
  )
}
