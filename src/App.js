import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import { format } from 'date-fns'

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {

  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('bloglist')) || [])

  const [search, setSearch] = useState('')
  const [searchResults, setsearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const filterResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setsearchResults(filterResults.reverse())
    localStorage.setItem('bloglist', JSON.stringify(posts))
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length -1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id: id, title: postTitle, datetime: datetime, body: postBody}
    const allPosts = [ ...posts, newPost]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }

  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id)
    setPosts(postList)
    navigate('/')
  }



  return (
    
      <Routes>
        <Route path='/' element={<Layout
                                    search={search}
                                    setSearch={setSearch}
                                 />}>
          <Route index element={<Home 
                                    posts={searchResults} 
                                />} 
          />
          <Route path='post'>
            <Route index element={<NewPost
                                        postTitle={postTitle}
                                        setPostTitle={setPostTitle}
                                        postBody={postBody}
                                        setPostBody={setPostBody}
                                        handleSubmit={handleSubmit} 
                                  />} 
              />
            <Route path=':id' element={<PostPage 
                                          posts={posts} 
                                          handleDelete={handleDelete} 
                                      />} 
            />
          </Route>
          <Route path='about' element={<About />}></Route>
          <Route path='*' element={<Missing />}></Route>
        </Route>
      </Routes>
   
  );
}

export default App;
