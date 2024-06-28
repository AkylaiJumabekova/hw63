import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from '../../axios-api';

const PostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<{ title: string, content: string, createdAt: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axiosApi.get(`/posts/${id}.json`)
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    const deletePost = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setLoading(true);
            axiosApi.delete(`/posts/${id}.json`)
                .then(() => {
                    setLoading(false);
                    navigate('/');
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    };

    return (
        <div>
            <h1>Post Details</h1>
            {loading ? (
                <p>Loading...</p>
            ) : post ? (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.createdAt}</p>
                    <p>{post.content}</p>
                    <button onClick={deletePost} className="btn btn-danger">Delete</button>
                    <button onClick={() => navigate(`/posts/${id}/edit`)} className="btn btn-secondary">Edit</button>
                </div>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    );
};

export default PostDetails;
