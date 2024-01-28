import React from 'react'

const Button = ({
    children,
    type='button',
    bgColor="bg-blue-600",
    textColor="text-white",
    className='',
    ...props
}) => {
  return (
    <button
    type={type}
    className={`${className} ${bgColor} ${textColor} px-4 py-2 rounded-lg`} {...props}
    >{children}</button>
  )
}

export default Button
