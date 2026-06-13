import { useState, useRef } from 'react'
import { usePosts } from '../hooks/usePosts'
import { useNavigate } from "react-router-dom"
import "../styles/create-post-form.scss"



const CreatePost = () => {
    const [caption, setCaption] = useState("")
    const [error, setError] = useState("")
    const postImageInputFieldRef = useRef(null)

    const { loading, handleCreatePost } = usePosts()

    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        try {
            const file = postImageInputFieldRef.current.files[0]
            await handleCreatePost(file, caption)
            navigate("/feed")
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create post")
        }
    }




    return (
        <main>
            <div className="create-post-container">
                <h1>Create post</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="image-upload-label" htmlFor="post-image">
                        Upload Image
                    </label>
                    <input
                        ref={postImageInputFieldRef}
                        hidden
                        type="file"
                        name="post-image"
                        id="post-image" />
                    <input
                        onChange={e => setCaption(e.target.value)}
                        value={caption}
                        type="text"
                        name="caption"
                        id="caption"
                        placeholder='Enter caption...' />
                    <button className="button primary-button">
                        {loading ? "Posting..." : "Post"}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost