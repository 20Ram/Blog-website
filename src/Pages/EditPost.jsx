// import React from 'react'
// import { useEffect, useState } from 'react'
// import { Container,PostForm } from '../components'
// import  appwriteService   from '../appwrite/config'
// import { useNavigate, useParams } from 'react-router-dom'

// function EditPost() {
//   const [post, setPost]= useState(null)
//   const {slug} = useParams()
//   const nevigate = useNavigate()

//   useEffect(() => {
//     if (slug) {
//       appwriteService.getPost(slug).then((post) => {
//         if (post) {
//           setPost(post) 
//         }
//       })
//     }else {
//       nevigate('/')
//     }
//   }, [slug, nevigate])
//   return post ? (
//     <div className="py-10 bg-gray-100 min-h-screen">
//       <Container>
//         <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
//           <PostForm post={post} />
//         </div>
//       </Container>
//     </div>
//   ) : null
// }

// export default EditPost

import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate('/'); // Redirect if post not found
        }
        setLoading(false);
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="py-10 bg-gray-100 min-h-screen flex justify-center items-center">
        <span className="text-gray-600 text-lg">Loading post...</span>
      </div>
    );
  }

  return post ? (
    <div className="py-10 bg-gray-100 min-h-screen">
      <Container>
        <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="py-10 bg-gray-100 min-h-screen flex justify-center items-center">
      <span className="text-red-500 text-lg">Post not found.</span>
    </div>
  );
}

export default EditPost;
