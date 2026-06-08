import React from 'react';

const PostCard = ({ image, caption, createdAt, author }) => {
    // Format the date if provided
    const formattedDate = createdAt 
        ? new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'Just now';

    return (
        <article className="post-card">
            <div className="post-card-header">
                <div className="post-card-avatar">
                    {author ? author.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="post-card-meta">
                    <h3 className="post-card-author">{author || 'Anonymous User'}</h3>
                    <span className="post-card-date">{formattedDate}</span>
                </div>
            </div>
            
            <div className="post-card-image-container">
                <img src={image || 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop'} alt="Post content" className="post-card-image" />
            </div>
            
            <div className="post-card-content">
                <p className="post-card-caption">
                    <span className="post-card-caption-author">{author || 'Anonymous User'}</span>
                    {' '}{caption}
                </p>
            </div>
        </article>
    );
};

export default PostCard;