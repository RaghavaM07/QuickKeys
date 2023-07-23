import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { data } from '../pages/board';


export const CompeteLeader = ({ data }) => {

    return (
        <div className="border-2 px-2 bg-white divide-y divide-gray-100">
            <div className="flex justify-center gap-x-6 py-5">
                <div className="flex gap-x-4">
                    <p className="my-auto text-xl font-semibold leading-8 text-gray-900">Participants</p>
                </div>
                
            </div>
            {data.map((person) => (
                <div key={person.username} className=" justify-between py-1 px-0">
                    <div className="flex gap-x-2">
                        <div className=" relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span className="font-medium text-gray-600 dark:text-gray-300">{person.username?.substring(0, 1)}</span>
                        </div>
                        <div className=''>
                            <p className="truncate my-1 text-l font-semibold leading-8 text-gray-700">{person.username}</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-l leading-6 text-gray-900">Speed : {person.speed}</p>
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <p className="text-xs leading-5 text-gray-500">Accuracy : {person.accuracy}%</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}