import React, { useEffect } from 'react';
import axios from 'axios';

export const Result = ({data}) => {
    useEffect( ()=>{
        try{
           axios.post(`http://localhost:5001/api/result`,
            data
          ).then((response)=>{
            console.log(response.ok)
          })
        }
        catch(error){
            console.log(error);
          }
      },[])
    
    return (
            <div  className="border-black border-2 rounded-md px-10 bg-white divide-y divide-gray-100">
                <div className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                        <div className="m-auto relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500">
                            <span className="font-semibold text-lg text-gray-600 dark:text-gray-100">{data.username.substring(0,1)}</span>
                        </div>
                        <p className="my-auto text-xl font-semibold leading-8 text-gray-900">{data.username}</p>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="m-2 text-xl leading-6 font-medium text-black">Time Taken : {data.time}</p>
                        <p className="m-2 text-xl leading-6 text-gray-900">Speed : {data.speed} WPM</p>
                        <div className="m-2 flex items-center gap-x-1.5">
                            <p className="text-m leading-5 text-gray-500">Accuracy : {data.accuracy}%</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}
