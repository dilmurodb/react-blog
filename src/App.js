import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";

import { Route, Routes, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

function App() {
  return (
    
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='post'>
            <Route index element={<NewPost />} />
            <Route path=':id' element={<PostPage />} />
          </Route>
          <Route path='about' element={<About />}></Route>
          <Route path='*' element={<Missing />}></Route>
        </Route>
      </Routes>
   
  );
}

export default App;
