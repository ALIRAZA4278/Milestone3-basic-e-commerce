import Link from 'next/link'
import React from 'react'

const Button = () => {
  return (
    <Link href="/Admin">
    <div className="text-white fixed right-3 z-10 bottom-4 text-xl bg-black py-2 px-2 rounded-lg "> 
     Admin
    </div>
    </Link>
  )
}

export default Button
