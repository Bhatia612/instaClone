import { useEffect } from 'react'
import Post from '../components/Post'
import { usePosts } from '../hooks/usePosts'
import "../styles/feed.scss"
import Nav from '../../shared/components/Nav'

function Feed() {

    const { feed, handleGetFeed, loading, handleLikePost } = usePosts()

    useEffect(() => {
        handleGetFeed()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return (<main><h1>Feed is Loading . . .</h1></main>)
    }


    return (
        <main>
            <Nav />
            <div className="posts-container">
                {feed.map((post) => {
                    console.log(post)
                    return <Post key={post._id} user={post.user} post={post} onLike={handleLikePost} />

                })}


            </div>
        </main>
    )
}

export default Feed