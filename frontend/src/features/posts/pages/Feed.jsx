import React, { useEffect } from 'react'
import Post from '../components/Post'
import { usePosts } from '../hooks/usePosts'
import "../styles/feed.scss"
import Nav from '../../shared/components/Nav'

function Feed() {

    const { feed, handleGetFeed, loading, handleLikePost } = usePosts()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return (<main><h1>Feed is Loading . . .</h1></main>)
    }

    console.log(feed)

    return (
        <main>
            <Nav />
            <div className="posts-container">
                {feed.map((post) => {
                    console.log(post)
                    return <Post user={post.user} post={post} onLike={handleLikePost} />

                })}


            </div>
        </main>
    )
}

export default Feed