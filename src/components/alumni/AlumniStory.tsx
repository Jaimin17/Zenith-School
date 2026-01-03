import Image from 'next/image'
import React from 'react'

const AlumniStory: React.FC = () => {
  return (
    <>
        <div className="alumni pt-120 pb-80">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="content-img wow fadeInLeft" data-wow-delay=".25s">
                            <Image src="/assets/img/alumni/01.jpg" alt="alumni image" width={600} height={400} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="content-info wow fadeInUp" data-wow-delay=".25s">
                            <div className="site-heading mb-3">
                                <span className="site-title-tagline"><i className="far fa-book-open-reader"></i> Alumni Story</span>
                                <h2 className="site-title">
                                    Hear From Our <span>Latest 2024</span> Alumni Story!
                                </h2>
                            </div>
                            <p className="content-text">
                                There are many variations of passages available but the majority have suffered
                                alteration in some form by injected humour randomised words which don't look even
                                slightly believable. If you are going to use passage you need sure there anything
                                embarrassing first true generator on the Internet.
                            </p>
                            <p className="content-text mt-2">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AlumniStory