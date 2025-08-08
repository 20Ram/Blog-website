// import { useId } from "react"
// import React  from 'react'

// function Select({
//   options,
//   label,
//   className = '',
//   ...props
// },ref) {
//   const id = useId();
//   return (
//      <div className="w-full">
//         {label && <label
//         htmlFor={id} className="">
//           <select className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-200 border border-gray-200 w-full ${className}`} 
//           ref={ref}  id={id} {...props}>
//             {options?.map((option) => 
//             <option key={option } value={option}>
//                 {option}
//             </option>)}
//           </select>
//           </label>}
//      </div>
//   )
// }

// export default React.forwardRef(Select)


import React, { useId } from 'react';

const Select = React.forwardRef(function Select(
  {
    label,
    options = [],
    placeholder = 'Select an option',
    className = '',
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((option, index) => {
          if (typeof option === 'string') {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          }

          // If option is object with label and value
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
});

export default Select;
