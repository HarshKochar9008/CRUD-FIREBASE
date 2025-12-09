import React from 'react'

const NoContact = () => {
  return (
    <div className='flex items-center gap-4 flex-col justify-center h-full min-h-[300px] opacity-80'>
      <div className='flex flex-col items-center'>
        <img src='Hands Contact.png' alt='No contacts' className='w-24 h-24 object-contain drop-shadow-lg' />
        <h1 className='text-white font-semibold mt-4 text-xl tracking-wider'>NO CONTACTS FOUND</h1>
      </div>
    </div>
  )
}

export default NoContact;