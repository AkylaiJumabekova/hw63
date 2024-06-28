import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../../axios-api';

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Array<{ id: string, title: string, createdAt: string }>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosApi.get('/posts.json')
            .then(response => {
                const fetchedPosts = [];
                for (let key in response.data) {
                    fetchedPosts.push({
                        ...response.data[key],
                        id: key,
                    });
                }
                setPosts(fetchedPosts);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.createdAt}</p>
                            <Link to={`/posts/${post.id}`} className="btn btn-primary">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
