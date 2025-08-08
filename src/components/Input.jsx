// import React , {useId} from 'react'

//  const Input = React.forwardRef(
//   function Input({
//     label,
//     type = 'text',
//     className = '',
//     ...props
//   }, ref) {
//     const id = useId();
//     return (
//       <div className='w-full'>
//         {label && <label 
//         className= 'inline-block mb-1 pl-1'
//         htmlFor={id}>
//           {label}</label>}
//         <input type={type}
//         className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-green-200 w-full  ${className}`} 
//         {...props}
//         ref={ref} 
//         id={id}
//         />   
//       </div>
//     )
//   }
//  )

// export default Input


import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
  const id = useId()

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1 font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black border border-green-200 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-green-400 transition duration-200 w-full ${className}`}
        {...props}
      />
    </div>
  )
})

export default Input
