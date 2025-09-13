import { useState, useEffect } from 'react'
import React from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'


function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [perPage] = useState(8)
  const [total, setTotal] = useState(0)

  const totalPages = Math.max(1, Math.ceil(total / perPage))

  const fetchPosts = async ({ page: p = page, term = searchTerm } = {}) => {
    try {
      setLoading(true)
      const response = await appwriteService.getPaginatedPosts({ page: p, perPage, searchTerm: term })
      if (response) {
        setPosts(response.documents)
        setTotal(response.total)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts({ page: 1, term: '' })
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term)
    setPage(1)
    fetchPosts({ page: 1, term })
  }

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
    fetchPosts({ page: newPage, term: searchTerm })
  }
 
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


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-lg text-gray-700">Loading posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-8 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fcb69f] to-[#ffecd2] drop-shadow-md">
            📚 All Posts
          </h1>
          <p className="text-gray-600 mt-2">Discover amazing stories and insights</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search posts by title or content..."
            className="w-full"
          />
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Page {page} of {totalPages} • {total} total result{total !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={post.$id}
                className="transform transition duration-300 hover:scale-105 animate-fade-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                }}
              >
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="bg-white/40 backdrop-blur-md px-8 py-10 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  {searchTerm ? 'No posts found' : 'No posts available'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `Try adjusting your search terms or browse all posts.`
                    : 'Be the first to create an amazing post!'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => goToPage(page - 1)}
              className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white shadow disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="px-3 py-2 text-gray-700">
              Page {page} of {totalPages}
            </div>
            <button
              onClick={() => goToPage(page + 1)}
              className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white shadow disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts