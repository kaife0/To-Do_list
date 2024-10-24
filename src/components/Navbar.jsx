import React from 'react'

const Navbar = () => {
  return ( 
    <nav className='flex justify-between bg-slate-700 text-white p-3'>
        <div className="logo">
           <span className='font-bold text-xl mx-8' > k-Task</span>
        </div>
        <ul className="flex gap-8 mx-8">
            <li className='cursor-pointer hover:font-bold transition-all duration-200 hover:text-blue-300'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200 hover:text-blue-300'>Your Tasks</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200 hover:text-blue-300'>Contact-us</li>
        </ul>
    </nav>
  )
}

export default Navbar
