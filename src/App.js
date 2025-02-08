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

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])

  const [search, setSearch] = useState('')
  const [searchResults, setsearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const filterResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setsearchResults(filterResults.reverse())
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
