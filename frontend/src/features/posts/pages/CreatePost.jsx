import React, { useState, useRef } from 'react'
import { usePosts } from '../hooks/usePosts'
import { useNavigate } from "react-router"
import "../styles/create-post-form.scss"



const CreatePost = () => {
    const [caption, setCaption] = useState("")
    const postImageInputFieldRef = useRef(null)

    const { loading, handleCreatePost } = usePosts()

    const navigate = useNavigate()


    if (loading) {
        return <main><h1>Creating Post . . .</h1></main>
    }

    function handlesubmit(e) {
        e.preventDefault()

        const file = postImageInputFieldRef.current.files[0]

        handleCreatePost(file, caption)

        navigate("/feed")

    }

    return (
        <main>
            <div className="form-container">
                <h1>Create post</h1>
                <form onSubmit={handlesubmit}>
                    <label htmlFor="post-image">Select image</label>
                    <input ref={postImageInputFieldRef} hidden type="file" name="post-image" id="post-image" />
                    <input onInput={(e) => { setCaption(e.target.value) }} type="text" name="caption" id="caption" placeholder='Enter caption . . .' />
                    <button className="button primary-button">Post</button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost