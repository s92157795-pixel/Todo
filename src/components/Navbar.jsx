import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-purple-900 text-white'>
            <div className="logo">
                <span className="font-bold text-xl px-8">sTask</span>
            </div>
            <ul className='flex px-8'>
                <li className='mx-3 cursor-pointer hover:font-bold'>Home</li>
                <li className='mx-3 cursor-pointer hover:font-bold'>Your Task</li>
            </ul>
        </nav>
    )
}

export default Navbar
