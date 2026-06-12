import { PostContext } from "../posts.context";
import { getPostsForFeed, createPost, likePost } from "../services/posts.api";
import { useContext } from "react";

export const usePosts = () => {
    const context = useContext(PostContext)

    if (!context) {
        throw new Error("usePosts must be used within a PostContextProvider")
    }

    const { loading, setLoading, post, setPost, feed, setFeed } = context


    const handleGetFeed = async () => {
        setLoading(true)

        try {
            const data = await getPostsForFeed()
            setFeed(data.posts)
        } catch (error) {
            console.error("Failed to fetch feed:", error.message)
        } finally {
            setLoading(false)
        }
    }


    const handleCreatePost = async (postImageFile, caption) => {
        setLoading(true)
        try {
            const data = await createPost(postImageFile, caption)
            setFeed([data.post, ...feed])
        } catch (error) {
            console.error("Failed to create post:", error.message)
        } finally {
            setLoading(false)
        }

    }

    const handleLikePost = async (postId) => {
        try {
            await likePost(postId)
            // toggle liked state in feed without refetching
            setFeed(feed.map(p =>
                p._id === postId ? { ...p, isLiked: !p.isLiked } : p
            ))
        } catch (error) {
            console.error("Failed to like post:", error.message)
        }

    }

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLikePost }
}