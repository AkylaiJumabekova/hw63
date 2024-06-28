import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axios-api';

const AddPost: React.FC = () => {
    const [post, setPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const postData = {
            ...post,
            createdAt: new Date().toISOString(),
        };

        axiosApi.post('/posts.json', postData)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch(() => {
                setLoading(false);
            });
    }, [post, navigate]);

    return (
        <div>
            <h1>Add New Post</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            value={post.title}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            className="form-control"
                            value={post.content}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddPost;
