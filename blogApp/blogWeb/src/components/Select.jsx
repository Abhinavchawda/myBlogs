import React, { forwardRef, useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
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
            <select
                {...props}
                id={id}
                ref={ref}
            >
                {
                    options.map((opt) => (
                        <option
                            key={opt}
                            value={opt}
                        >{opt}</option>
                    ))
                }

            </select>
        </div>
    )
}

export default forwardRef(Select)
