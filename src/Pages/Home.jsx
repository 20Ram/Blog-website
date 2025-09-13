import React, { useEffect, useState } from 'react'
import { Container, PostCard, Button } from '../components'
import appwriteService from '../appwrite/config'
import pexels from '../assets/pexels.jpg'
import login from '../assets/login.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Home() {
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true)
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (userData) {
      appwriteService.getPost().then((res) => {
        if (res) setPost(res.documents)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [userData])

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(253, 239, 249, 0.75), rgba(236, 240, 243, 0.75)), url(${pexels})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    paddingTop: '2rem',
    paddingBottom: '2rem',
  }


  /** 🔹 Loading skeleton */
  if (loading) {
    return (
      <div style={backgroundStyle} className="flex justify-center items-center min-h-screen">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 bg-white/40 rounded-2xl shadow-lg backdrop-blur-md"
              />
            ))}
          </div>
        </Container>
      </div>
    )
  }

  /** 🔹 Logged-out view */
  // Logged-out view
if (!userData) {
  return (
    <div style={backgroundStyle} className="flex items-center justify-center min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left">
          
          {/* Banner Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={login}
              alt="Login Banner"
              className="w-80 md:w-[28rem] drop-shadow-xl animate-fade-in"
            />
          </div>

          {/* Text + Button */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#ff6f61] animate-bounce drop-shadow-lg">
              Welcome to Our Blog!
            </h1>
            <p className="text-lg text-gray-700 mt-4 max-w-md">
              Sign in to explore fresh stories, share your thoughts, and join our growing community.
            </p>
            <Link to="/login">
              <Button className="mt-6 px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                Login Now
              </Button>
            </Link>
          </div>

        </div>
      </Container>
    </div>
  )
}


  /** 🔹 No posts view */
  if (post.length === 0) {
    return (
      <div style={backgroundStyle} className="flex items-center justify-center text-center min-h-screen">
        <Container>
          <div className="bg-white/40 backdrop-blur-md px-8 py-10 rounded-2xl shadow-lg">
            <h1 className="text-4xl font-extrabold text-[#ff6f61] animate-bounce drop-shadow-md">
              No Posts Available 😥
            </h1>
            <p className="text-lg text-gray-700 mt-3">Create the first awesome post!</p>
          </div>
        </Container>
      </div>
    )
  }

  /** 🔹 Logged-in view with posts */
  return (
    <div style={backgroundStyle}>
      <Container>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fcb69f] to-[#ffecd2] drop-shadow-md animate-fade-in">
            🌸 Featured Blogs
          </h1>
          <p className="text-md mt-2 text-gray-600">
            Explore the latest articles curated just for you.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {post.map((postItem, index) => (
            <div
              key={postItem.$id}
              className="relative rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fade-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <div className="relative group">
                {/* Featured image */}
                {postItem.featuredimage && (
                  <img
                    src={appwriteService.getFilePreview(postItem.featuredimage)}
                    alt={postItem.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                {/* Overlay title */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                  <h2 className="text-white text-xl font-bold drop-shadow-md">
                    {postItem.title}
                  </h2>
                </div>
              </div>

              {/* Card bottom */}
              <div className="bg-white/40 backdrop-blur-md p-4">
                <PostCard {...postItem} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
