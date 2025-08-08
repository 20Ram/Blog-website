// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import  appwriteService from '../appwrite/config'
// import { Button, Container } from '../components'
// import parse from 'html-react-parser'
// import { useSelector } from 'react-redux'

// function Post() {
//   const [post, setPost] = useState(null)
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const userData = useSelector((state) => state.auth.userData);

//   const isAuthor = post && userData ? post.userId === userData.$id : false;
  
//   useEffect(() => {
//     if (slug) {
//       appwriteService.getPost(slug).then((post) => {
//           if (post) setPost(post)
//           else navigate('/')
//       });
//     }else { navigate('/') }
//   }, [slug, navigate]);

//   const deletePost = () => {
//     appwriteService.deletePost(post.$id).then((status) => {
//       if (status) {
//         appwriteService.deletePost(post.featuredimage);
//         navigate('/');
//       }
//     });
//   };

//   return post ? (
//     <div className='py-8'>
//       <Container>
//         <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
//           <img 
//           src={appwriteService.getFilePreview(post.featuredimage)}
//           alt={post.title}
//           className='rounded-xl'
//           />

//           {isAuthor && (
//             <div className='absolute right-6 top-6'>
//                 <Link to={`/edit-post/${post.$id}`}>
//                 <Button className='mr-3' bgColor='bg-green-500'>
//                   Edit
//                 </Button>
//                 </Link>
//                 <Button onClick={deletePost}
//                 className='bg-red-500'>
//                   Delete
//                 </Button>
//             </div>
//           )}
//         </div>
//         <div className='w-full mb-6'>
//           <h1 className='text-2xl font-bold'>
//             {post.title}
//           </h1>
//         </div>
//         <div className='browser-css'>
//           {parse(post.content)}
//         </div>
//       </Container>
//     </div>
//   ) : null;
// }

// export default Post


// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import  appwriteService from '../appwrite/config'
// import { Button, Container } from '../components'
// import parse from 'html-react-parser'
// import { useSelector } from 'react-redux'

// function Post() {
//   const [post, setPost] = useState(null)
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const userData = useSelector((state) => state.auth.userData);

//   const isAuthor = post && userData ? post.userId === userData.$id : false;
  
//   useEffect(() => {
//     if (slug) {
//       appwriteService.getPost(slug).then((post) => {
//           if (post) setPost(post)
//           else navigate('/')
//       });
//     }else { navigate('/') }
//   }, [slug, navigate]);

//   const deletePost = () => {
//     appwriteService.deletePost(post.$id).then((status) => {
//       if (status) {
//         appwriteService.deletePost(post.featuredimage);
//         navigate('/');
//       }
//     });
//   };

//   return post ? (
//     <div className='py-8'>
//       <Container>
//         <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
//           <img 
//           src={appwriteService.getFilePreview(post.featuredimage)}
//           alt={post.title}
//           className='rounded-xl'
//           />

//           {isAuthor && (
//             <div className='absolute right-6 top-6'>
//                 <Link to={`/edit-post/${post.$id}`}>
//                 <Button className='mr-3' bgColor='bg-green-500'>
//                   Edit
//                 </Button>
//                 </Link>
//                 <Button onClick={deletePost}
//                 className='bg-red-500'>
//                   Delete
//                 </Button>
//             </div>
//           )}
//         </div>
//         <div className='w-full mb-6'>
//           <h1 className='text-2xl font-bold'>
//             {post.title}
//           </h1>
//         </div>
//         <div className='browser-css'>
//           {parse(post.content)}
//         </div>
//       </Container>
//     </div>
//   ) : null;
// }

// export default Post


import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate('/');
        }
        setLoading(false);
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (post) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredimage);
          navigate('/');
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <Container>
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            <p className="ml-3 text-lg text-gray-600">Loading post...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="py-10">
      <Container>
        <div className="w-full relative border border-gray-300 rounded-xl overflow-hidden shadow-lg">
        <img
            src={appwriteService.getFilePreview(post.featuredimage).href}
            alt={post.title}
            className="w-full object-cover h-96 transition-transform duration-300 hover:scale-105"
            loading="lazy"
        />


          {isAuthor && (
            <div className="absolute top-4 right-4 flex space-x-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                className="bg-red-600 hover:bg-red-700 text-white shadow-md"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{post.title}</h1>
          <div className="prose prose-lg max-w-none">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  );
}

export default Post;
