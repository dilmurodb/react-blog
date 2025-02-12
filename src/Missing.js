import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className="Missing">
      <h2>Post Not Found.</h2>
      <p>Well, that's not good.</p>
      <p>
        <Link to='/'>Visit our Home Page</Link>
      </p>
    </main>
  )
}

export default Missing