// import React from 'react'
// import { Container, PostForm } from '../components'
// function AddPost() {
//   return (
//     <div className='py-8'>
//       <h1 className="text-2xl font-semibold mb-6 text-center">Create New Post</h1>
//       <Container>
//         <PostForm />
//       </Container>
//     </div>
//   )
// }

// export default AddPost

import React from 'react';
 
import { Container, PostForm } from '../components';

function AddPost() {
  

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl font-semibold mb-6 text-center">Create New Post</h1>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
