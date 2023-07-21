import {useState, useEffect} from 'react'
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';

// const people = [
//     {
//         name: 'Leslie Alexander',
//         email: 'leslie.alexander@example.com',
//         role: 'Co-Founder / CEO',
//         imageUrl:
//             'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Michael Foster',
//         email: 'michael.foster@example.com',
//         role: 'Co-Founder / CTO',
//         imageUrl:
//             'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Dries Vincent',
//         email: 'dries.vincent@example.com',
//         role: 'Business Relations',
//         imageUrl:
//             'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: null,
//     },
//     {
//         name: 'Lindsay Walton',
//         email: 'lindsay.walton@example.com',
//         role: 'Front-end Developer',
//         imageUrl:
//             'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Courtney Henry',
//         email: 'courtney.henry@example.com',
//         role: 'Designer',
//         imageUrl:
//             'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Tom Cook',
//         email: 'tom.cook@example.com',
//         role: 'Director of Product',
//         imageUrl:
//             'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: null,
//     },
// ]


export const Leaderboard = () => {
    const [data,setData] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5001/api/leaderboard").then((response) => {
          setData(response.data);
        });
      });
    return (
        <div className="bg-white bg-opacity-50 p-10 px-40">
            <ul role="list" className="px-5 bg-white divide-y divide-gray-100">
                <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                        <div className="h-12 w-12 flex-none rounded-full bg-gray-50 text-5xl"><CgProfile /></div>
                        <p className="my-auto text-xl font-semibold leading-8 text-gray-900">USERNAME</p>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-xl leading-6 text-gray-900">Speed (WPM)</p>
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <p className="text-m leading-5 text-gray-500">Accuracy (percentage)</p>
                        </div>
                    </div>
                </li>
                {data.map((person) => (
                    <li key={person._id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex gap-x-4">
                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span className="font-medium text-gray-600 dark:text-gray-300">{person.username.substring(0, 1)}</span>
                            </div>
                            <p className="my-1 text-xl font-semibold leading-8 text-gray-700">{person.username}</p>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-xl leading-6 text-gray-900">Speed : {person.resultId.speed}</p>
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <p className="text-xs leading-5 text-gray-500">Accuracy : {person.resultId.accuracy * 100}%</p>
                        </div>
                    </div>
                    </li>
                ))}
            </ul>

        </div>
    )
}
