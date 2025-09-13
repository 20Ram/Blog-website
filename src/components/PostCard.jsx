// import React from 'react'
// import appwriteService from '../appwrite/config.js'
// import { Link } from 'react-router-dom'


// function PostCard({$id ,title, featuredimage}) {
//   return (
//     <Link to={`/post/${$id}`}>
//       <div className='bg-gradient-to-r from-[#e0c3fc] via-[#8ec5fc] to-[#d9a7c7] animate-gradient-move bg-[length:200%_200%] w-full bg-gray-100 rounded-xl p-4'>
//         <div className='w-full justify-center mb-4'>
//           <img src={appwriteService.getFilePreview(featuredimage)} alt={title} 
          
//           className='rounded-xl' />
//         </div>
//         <h2 className='text-xl font-bold'>{title}</h2>
//       </div>
//     </Link>
//   )
// }

// export default PostCard


import React from 'react';
import appwriteService from '../appwrite/config.js';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`} className="block transition-transform transform hover:scale-[1.02]">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
        <div className="relative w-full aspect-video">
        <img
          src={appwriteService.getFilePreview(featuredimage).href}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
