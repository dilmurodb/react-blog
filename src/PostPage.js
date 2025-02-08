import React from 'react'
import { useParams, Link } from 'react-router-dom'

const PostPage = ({ posts }) => {

    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id)



  return (
    <main className="PostPage">
        <articel className="post">
            { post &&
                <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <button>Delete Post</button>
                </>
            }
            {!post && 
            <>
                <h2>Post Not Found.</h2>
                <p>Well that's not good.</p>
                <p>
                    <Link to='/'>Visit our Home Page</Link>
                </p>
            </>}
        </articel>
    </main>
  )
}

export default PostPage