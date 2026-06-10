import axios, { formToJSON } from "axios"


const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true
})

export async function getPostsForFeed() {
    const response = await api.get("/get-posts")
    console.log(response.data)
    return response.data

}

export async function createPost(postImageFile, caption) {
    const fromDate = new FormData()

    fromDate.append("caption", caption)
    fromDate.append("image", postImageFile)
    const response = await api.post("/create-new-post", fromDate)

    return response.data
}

export async function likePost(postId) {
    const response = await api.post(`/like/${postId}`)

    return response.data
}