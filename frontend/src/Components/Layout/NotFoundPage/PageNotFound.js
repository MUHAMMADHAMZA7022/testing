import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import "./PageNotFound.css"

function PageNotFound() {
  return (
    <Fragment>
        <div className='pageNotFound'>
            <h1><span>O</span>ops!</h1>
            <h2>404 - page not found</h2>
            <h3>The page you are looking for might be removed or temporarily unavailable</h3>
            <Link to={"/"}>Goto Homepage</Link>
        </div>
    </Fragment>
  )
}

export default PageNotFound