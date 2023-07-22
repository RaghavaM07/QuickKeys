import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { data } from '../pages/board';


export const Leaderboard = ({data}) => {
    
    return (
            <ul role="list" className="border-2 px-5 bg-white divide-y divide-gray-100">
                <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                        <div className="m-auto h-12 w-12 flex-none rounded-full bg-gray-50 text-5xl"><CgProfile /></div>
                        <p className="my-auto text-xl font-semibold leading-8 text-gray-900">USERNAME</p>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-xl leading-6 text-gray-900">Speed (WPM)</p>
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <p className="text-m leading-5 text-gray-500">Accuracy (%)</p>
                        </div>
                    </div>
                </li>
                {data.map((person) => (
                    <li key={person._id} className="flex justify-between gap-x-6 py-4 px-0">
                        <div className="flex gap-x-2">
                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span className="font-medium text-gray-600 dark:text-gray-300">{person.username.substring(0, 1)}</span>
                            </div>
                            <p className="my-1 text-xl font-semibold leading-8 text-gray-700">{person.username}</p>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-xl leading-6 text-gray-900">Speed : {person.resultId.speed?.toFixed(2)}</p>
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <p className="text-xs leading-5 text-gray-500">Accuracy : {person.resultId.accuracy?.toFixed(2) * 100}%</p>
                        </div>
                    </div>
                    </li>
                ))}
            </ul>
    )
}
