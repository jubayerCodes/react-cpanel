import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/api/v1/post')
            .then((response) => response.json())
            .then((json) => setPosts(json?.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(()=>{
        console.log(posts);
    }, [posts])

  return (
    <div>
        <Helmet>
            <title>Home - React Cpanel</title>
            <meta name="description" content="Browse latest posts and content" />
        </Helmet>
        <div>
            <div style={{height: "80vh", width: "100%"}}>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper"
                style={{height: "80vh", width: "100%"}}
            >
                <SwiperSlide>
                <img width={"100%"} src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img width={"100%"} src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img width={"100%"} src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                <img width={"100%"} src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
            </Swiper>
            <div className='container mx-auto my-5 row gap-3'>
                {
                    posts?.slice(0, 10)?.map((post, idx) =>(
                        <Card style={{ width: '18rem' }} key={idx}>
                            <Card.Img variant="top" src={`http://localhost:3000/uploads/${post?.postImg}`} />
                            <Card.Body>
                            <Card.Title>{post?.title}</Card.Title>
                            <Card.Text>
                                {post?.body}
                            </Card.Text>
                                <Link to={`/posts/${post?._id}`}>
                                    <Button variant="primary">Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home;