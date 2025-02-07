import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-violet-500 text-white flex justify-between py-2'>
        <div className='logo'>
            <span className='font-bold text-xl mx-8'>MyTodo</span>
        </div>
      <ul className='flex gap-8 mx-9'>
        <li className='hover:font-bold transition-all  cursor-pointer'>Home</li>
        <li className='hover:font-bold transition-all  cursor-pointer'>About</li>
        <li className='hover:font-bold transition-all cursor-pointer'>Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar
