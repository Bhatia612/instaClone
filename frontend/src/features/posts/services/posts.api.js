import axios from "axios"


const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/posts`,
    withCredentials: true
})

export async function getPostsForFeed() {
    const response = await api.get("/get-posts")
    return response.data

}

export async function createPost(postImageFile, caption) {
    const formDate = new FormData()

    formDate.append("caption", caption)
    formDate.append("image", postImageFile)
    const response = await api.post("/create-new-post", formDate)

    return response.data
}

export async function likePost(postId) {
    const response = await api.post(`/like/${postId}`)

    return response.data
}