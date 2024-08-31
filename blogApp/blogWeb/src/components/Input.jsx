import React, { forwardRef } from 'react'
import { useId } from 'react'

//forwardRef() : this hook is for sendig data to parent component

const Input = forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props },
  ref) {

  const id = useId
  return (
    <div className='w-full'>
      {label &&
        (
          <label htmlFor={id} className='inline-block my-1 px-1'>
            {label}
          </label>
        )
      }
      <input 
        type={type}
        ref={ref}
        {...props}
        id={id}
        className={`px-3 py-2 rounded-xl bg-white text-black focus:bg-gray-100 duration-200 border border-gray-200 w-full ${className}`}
      >
        
      </input>
    </div>
  )
}
)

export default Input
