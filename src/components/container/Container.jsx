// import React from 'react'

// function Container({children}) {
//   return <div className='w-full max-w7xl mx-auto px-4'>{children}</div>;
// }

// export default Container


import React from 'react';

function Container({ children, className = '' }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
