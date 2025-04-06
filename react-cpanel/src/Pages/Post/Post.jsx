import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLoaderData } from 'react-router';

const Post = () => {

    const post = useLoaderData()
    return (
        <section>
            <Helmet>
                <title>Post {post?.id + ""}</title>
            </Helmet>
            <div className='container mt-5'>
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                        <Card.Title>{post?.title}</Card.Title>
                        <Card.Text>
                            {post?.body}
                        </Card.Text>
                            <Link to={`/posts/${post?.id}`}>
                                <Button variant="primary">Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
            </div>
        </section>
    );
};

export default Post;