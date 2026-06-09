import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        axios
            .post("http://localhost:3000/create-post", formData)
            .then((res) => {
                console.log("Post created successfully!");
                navigate("/");
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    };

    return (
        <section className="create-post-section">
            <h2 className="create-post-title">Create a Post</h2>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="file-upload-wrapper">
                    <input type="file" name="image" accept="image/*" required />
                    <div className="file-upload-icon">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <span className="file-upload-text">
                        Click or drag image to upload
                    </span>
                </div>

                <div className="caption-input-wrapper">
                    <input
                        type="text"
                        name="caption"
                        className="caption-input"
                        placeholder="What's on your mind?"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Share Post
                </button>
            </form>
        </section>
    );
};

export default CreatePost;
