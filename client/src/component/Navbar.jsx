import React from 'react'
import {assets} from '../assets/assets'

const Navbar = () => {

    return (
        <>
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img className='cursor-pointer' onClick={()=>navigate('/')} src={assets.logo} alt="" />
                <div className='flex gap-4 max-sm:text-xs'>
                    <button className='text-gray-600'>Recruiter Login</button>
                    <button className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                </div>
            </div>
        </div>
        </>
// <>
//
//         <div className="bg-red-500 text-white p-10 text-center">
//             If you see red background and white text, Tailwind is working!
//         </div>
//     <div className='bg-pink-700'>Login</div>
// </>

    )
}

export default Navbar