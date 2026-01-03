import React from 'react'

const Loader: React.FC = () => {
  return (
    <>
        <div className="preloader">
            <div className="loader-book">
                <div className="loader-book-page"></div>
                <div className="loader-book-page"></div>
                <div className="loader-book-page"></div>
            </div>
        </div>
    </>
  )
}

export default Loader;