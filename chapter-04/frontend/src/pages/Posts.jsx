import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Posts = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: "Alice Johnson",
            caption:
                " Loving the new web design trends this year! What do you guys think? 🎨✨",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        },
        {
            id: 2,
            author: "Bob Smith",
            caption:
                "Just deployed my first full-stack app. The backend is running smoothly. 🚀",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        },
        {
            id: 3,
            author: "Charlie Davis",
            caption:
                "Coffee and code. The best way to start a Monday morning. ☕💻",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        },
    ]);

    return (
        <section className="feed-container">
            <h1 className="feed-title">Your Feed</h1>
            <div className="posts-list">
                {dummyPosts.map((post) => (
                    <PostCard
                        key={post.id}
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
