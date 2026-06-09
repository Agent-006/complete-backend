import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

import axios from "axios";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/posts")
            .then((res) => {
                setPosts(res.data.posts);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <section className="feed-container">
            <h1 className="feed-title">Your Feed</h1>
            <div className="posts-list">
                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        author={post.author}
                        caption={post.caption}
                        image={post.image}
                        createdAt={post.createdAt}
                    />
                ))}
            </div>
        </section>
    );
};

export default Posts;
