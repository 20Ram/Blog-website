import { useState , useEffect } from 'react'
import React from 'react'
import  appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'


function AllPosts() {

  const [post, setPost] = useState([])

  useEffect(() => {
    appwriteService.getPost([]).then((post) => {
    if (post) {
      setPost(post.documents)
    }
  })
}, [])
 
  // return (
  //   <div className='w-full py-8'>
  //     <Container>
  //       <div className='flex flex-wrap'>
  //         {post.map((post) => (
  //           <div key={post.$id} className='p-2 w-1/4' >
  //             <PostCard {...post} />
  //           </div>
  //         ))}
  //       </div>
  //     </Container>
  //   </div>
  // )


  return (
    <div className="w-full py-8 bg-gray-100 min-h-screen">
      <Container>
        <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>
        <div className="flex flex-wrap -mx-2">
          {post.length > 0 ? (
            post.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center w-full">No posts available.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts