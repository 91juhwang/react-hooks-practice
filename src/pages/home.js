import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../components/PostForm';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [editingPost, setEditingPost] = useState({
    title: '',
    body: '',
    id: null,
  })

  useEffect(() => {
    axios
      .get('https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev/posts')
      .then((res) => {
        setPosts(res.data)
      })
      .catch(err => console.error(err));
  }, []) // Only executing this effect once if empty array is passed

  const editPost = (post) => {
    setEditingPost(post)
  }

  const deletePost = (id => {
    axios.delete(`https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev/post/${id}`)
      .then(() => {
        const postsUpdated = posts.filter((p) => p.id !== id);
        setPosts(postsUpdated);
      })
  })

  const addPost = (post) => {
    if (posts.find(p => p.id === post.id)) {
      const index = posts.findIndex(p => p.id === post.id);
      const postsUpdated = [...posts];
      postsUpdated.splice(index, 1, post);
      setPosts(postsUpdated);
    } else {
      const postsUpdated = [post, ...posts];
      setPosts(postsUpdated);
    }
  }

  const getNumberOfPosts = () => {
    axios.get(`https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev/posts/${limit}`)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="row">
        <div className="col s6">
          <PostForm addPost={addPost} editingPost={editingPost} />
        </div>
        <div className="col s3 push-in">
          <p>Limit number of posts</p>
          <input type="number"
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
          />
          <button onClick={getNumberOfPosts} className="waves-effect waves-light btn">Set Limit</button>
        </div>
      </div>
      <div className="row">
        {posts.map(post => (
          <div className="col s6">
            <div className="card">
              <div className="card-content">
                <div className="card-title">
                  {post.title}
                </div>
                <p className="timestamp">
                  {post.createdAt}
                </p>
                <p className="timestamp">
                  {post.body}
                </p>
              </div>
              <div className="card-action">
                <a href="#" onClick={editPost.bind(null, post)}>Edit</a>
                <a href="#" onClick={deletePost.bind(null, post.id)} className="delete-card">Delete</a>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Home
