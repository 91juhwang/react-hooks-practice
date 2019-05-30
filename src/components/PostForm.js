import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';


function PostForm({ addPost, editingPost}) {
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState({ title: '', body: ''})

  useEffect(() => {
    setPost(editingPost)
  }, [editingPost])

  const onChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if(post.id) {
      axios.put(`https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev/post/${post.id}`, post).then(res => {
        addPost(res.data)
        setPost({title: '', body: ''})
        setLoading(false);
      })
      .catch(err => console.log(err))
    } else {
      axios.post('https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev/post', post).then(res => {
        addPost(res.data);
        setPost({ title: '', body: ''})
        setLoading(false);
      }).catch(err => console.log(err));
    }
  }

  return (
    <Fragment>
      {!loading ? (
        <form className="push-in" onSubmit={onSubmit}>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text"
              name="title"
              value={post.title}
              onChange={onChange}
              className="validate" />
          </div>
          <div className="input-field">
            <label htmlFor="body">Body</label>
            <input type="text"
              name="body"
              value={post.body}
              onChange={onChange}
              className="validate" />
          </div>
          <button type="submit" className="waves-effect waveslight btn">
            {post.id ? 'Update' : 'Add'}
          </button>
        </form>
      ) : (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
    </Fragment>
  )
}

export default PostForm
