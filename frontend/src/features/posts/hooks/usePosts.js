import { PostContext } from "../posts.context";
import { getPostsForFeed, createPost, likePost } from "../services/posts.api";
import { useContext } from "react";

export const usePosts = () => {
    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context


    const handleGetFeed = async () => {
        setLoading(true)

        const data = await getPostsForFeed()


        setFeed(data.posts)

        setLoading(false)

    }

    const handleCreatePost = async (postImageFile, caption) => {
        setLoading(true)

        const data = await createPost(postImageFile, caption)

        setFeed([data.post, ...feed])

        setLoading(false)


    }

    const handleLikePost = async (postId) => {
        const data = await likePost(postId)

        console.log(postId + "like status changed")
    }


    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLikePost }
}