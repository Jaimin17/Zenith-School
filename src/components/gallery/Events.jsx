import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Events({ data }) {
    return (
        <>
            <div className="event-area py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline"><i className="far fa-book-open-reader"></i> Events</span>
                                <h2 className="site-title">Our Upcoming <span>Events</span></h2>
                                <p>It is a long established fact that a reader will be distracted by the readable content of
                                    a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {data.map((item, index) => (
                            <div className="col-lg-4" key={index}>
                                <div className="event-item">
                                    <div className="event-location">
                                        <span><i className="far fa-map-marker-alt"></i> {item.location} </span>
                                    </div>
                                    <div className="event-img">
                                        <Image src={item.img} alt="event image" width={400} height={700} />
                                    </div>
                                    <div className="event-info">
                                        <div className="event-meta">
                                            <span className="event-date"><i className="far fa-calendar-alt"></i>{item.date}</span>
                                            <span className="event-time"><i className="far fa-clock"></i>{item.time}</span>
                                        </div>
                                        <h4 className="event-title"><a href="#">{item.title}</a></h4>
                                        <p>{item.description}</p>
                                        <div className="event-btn">
                                            <Link href={"/gallery/events/" + (index + 1)} className="theme-btn">Join Event<i className="fas fa-arrow-right-long"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* pagination */}
                    <div className="pagination-area">
                        <div aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true"><i className="far fa-arrow-left"></i></span>
                                    </a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true"><i className="far fa-arrow-right"></i></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* pagination end */}
                </div>
            </div>
        </>
    )
}

export default Events