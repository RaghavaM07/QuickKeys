import React, { useEffect, useState, useRef } from 'react'
import { Timer } from '../components/Timer';
import { Game } from '../models/Game';

const usePress = (key, cb) => {
  const callbackRef = useRef(cb);
  
  useEffect(() => {
    callbackRef.current = cb;
  });
  
  useEffect(() => {
    function handle(event) {
      let isCorrect
      console.log(event.key)
      if (event.key === key) {
        isCorrect = true
      }
      else {
        isCorrect = false
        
      }
      callbackRef.current(event, isCorrect)
    }
    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
}
const useUp = (key, cb) => {
  const callbackRef = useRef(cb);
  
  useEffect(() => {
    callbackRef.current = cb;
  });
  
  useEffect(() => {
    function handle(event) {
      let isCorrect
      console.log(event.key)
      if (event.key === key) {
        isCorrect = true
      }
      else {
        isCorrect = false
      }
      callbackRef.current(event, isCorrect)
    }
    document.addEventListener("keyup", handle);
    return () => document.removeEventListener("keyup", handle);
  }, [key]);
}
const useDown = (key, cb) => {
  const callbackRef = useRef(cb);
  
  useEffect(() => {
    callbackRef.current = cb;
  });
  
  useEffect(() => {
    function handle(event) {
      let isCorrect
      if (event.code === key) {
        isCorrect = true
      }
      else {
        isCorrect = false
      }
      callbackRef.current(event, isCorrect)
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key]);
}


export const Typearea = ({userDetails}) => {
  console.log(userDetails)
  const givenText = useRef();
  const keyboardRef = useRef(null);
  const teatArray = Array.from(userDetails.textToType.replaceAll(" ","˽"));
  const [index, setIndex] = useState(0);
  const [inCorrects, setInCorrects] = useState(0);
  const [accuracy,setAccuracy] = useState(null);
  const [speed,setSpeed] = useState(null);
  const [gameEnded,setGameEnded] = useState(false);

  const updateData = () =>{
    userDetails.inCorrect =inCorrects;
    userDetails.accuracy=accuracy;
    userDetails.speed = speed;
  }

  useEffect(()=>{
      const data = Game.getAccuracy(index,inCorrects)
      setAccuracy(data);
  },[index,inCorrects])

  const handlePress = (event, isCorrect) => {
    if(isCorrect){
      givenText.current.children[index].className = 'correct text-4xl'
    }
    else{
      setInCorrects(inCorrects+1);
      givenText.current.children[index].className = 'wrong text-4xl'
    }
    setIndex(index + 1)
  }
  const handleUp = (event, isCorrect) => {
    const childElements = keyboardRef.current.querySelectorAll('.key');
    for (const childElement of childElements) {
      if (childElement.textContent === event.key.charAt(0).toUpperCase() + event.key.slice(1)) {
        childElement.classList.remove(`blink`);
      }
    }
  }
  const handleDown = (event, isCorrect) => {
    console.log(event.key,isCorrect)
    if(isCorrect && index>0){
      givenText.current.children[index-1].className = 'normal text-4xl'
      setIndex(index - 1)
    }
    const childElements = keyboardRef.current.querySelectorAll('.key');
    for (const childElement of childElements) {
      if (childElement.textContent === event.key.charAt(0).toUpperCase() + event.key.slice(1)) {
        childElement.classList.add(`blink`);
      }
    }
  }

  usePress(userDetails.textToType[index], handlePress)
  useUp(userDetails.textToType[index], handleUp)
  useDown("Backspace", handleDown)


  return (
    <>
        <div className=" mx-auto grid max-w-2xl  items-center gap-x-8 gap-y-16 px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl  lg:px-10">
          <div className="grid  grid-rows-2" >
            <div className='flex flex-col justify-around'>
              <div className='text-4xl block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ref={givenText}>
                {teatArray.map((char, index) => (
                  <div key={index}  className="normal text-4xl">{char}</div>
                ))}
              </div>

              <div className='flex justify-between'>

                <div className="mt-2 flex items-center gap-x-3">
                  <label htmlFor="photo" className="block text-xl font-medium leading-6 text-gray-900">
                    Speed
                  </label>
                  <p className="text-gray-500">{speed?.toFixed(2)} wpm</p>
                </div>
                <div className="mt-2 flex items-center gap-x-3">
                  <label htmlFor="photo" className="block text-xl font-medium leading-6 text-gray-900">
                    Accuracy
                  </label>
                  <p className="text-gray-500">{accuracy?.toFixed(2)*100}%</p>
                </div>

                <div className="mt-2 flex items-center gap-x-3">
                  <label htmlFor="photo" className="block text-xl font-medium -6 text-gray-900">
                    Time Remaining:
                  </label>
                  <Timer Time = {userDetails.duration} setSpeed={setSpeed} index={index} inCorrects={inCorrects} setGameEnded={setGameEnded} updateData={updateData}/>
                </div>
              </div>
            </div>
            <div>
              <div className="keyboard-base" ref={keyboardRef}>
                <div className="key ~">`</div>
                <div className="key">1</div>
                <div className="key">2</div>
                <div className="key">3</div>
                <div className="key">4</div>
                <div className="key">5</div>
                <div className="key">6</div>
                <div className="key">7</div>
                <div className="key">8</div>
                <div className="key">9</div>
                <div className="key">0</div>
                <div className="key">-</div>
                <div className="key">+</div>
                <div className="key delete">Backspace</div>
                <div className="key tab">Tab</div>
                <div className="key">Q</div>
                <div className="key">W</div>
                <div className="key">E</div>
                <div className="key">R</div>
                <div className="key">T</div>
                <div className="key">Y</div>
                <div className="key">U</div>
                <div className="key">I</div>
                <div className="key">O</div>
                <div className="key">P</div>
                <div className="key">[</div>
                <div className="key">]</div>
                <div className="key backslash">\</div>
                <div className="key capslock">CapsLock</div>
                <div className="key">A</div>
                <div className="key">S</div>
                <div className="key">D</div>
                <div className="key">F</div>
                <div className="key">G</div>
                <div className="key">H</div>
                <div className="key">J</div>
                <div className="key">K</div>
                <div className="key">L</div>
                <div className="key">;</div>
                <div className="key">'</div>
                <div className="key return">Enter</div>
                <div className="key leftshift">Shift</div>
                <div className="key">Z</div>
                <div className="key">X</div>
                <div className="key">C</div>
                <div className="key">V</div>
                <div className="key">B</div>
                <div className="key">N</div>
                <div className="key">M</div>
                <div className="key">,</div>
                <div className="key">.</div>
                <div className="key">/</div>
                <div className="key rightshift">Shift</div>
                <div className="key leftctrl">Control</div>
                <div className="key">Alt</div>
                <div className="key command">Command</div>
                <div className="key space">Space</div>
                <div className="key command">command</div>
                <div className="key">Alt</div>
                <div className="key">Control</div>
                <div className="key">Fn</div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
