
import { useState } from 'react';

import Post from './post';
import NewPost from './newpost';
import Modal from './modal';
import classes from './postslist.module.css';

 function PostsList({ isPosting, onStopPosting }) {
   //fetch('https://localhost:8080/podts').then(response => response.json()).then(data => { setPosts(data.posts)});
  const [posts, setPosts] = useState([]);
  useEffect( () => {
   async function fetchPosts() {
    const response = await fetch('http://localhost:8080/posts')
    const resData =await response.json();
      setPosts(data.posts);

   }
   fetchPosts();
  }, []);

 function addPostHandler(postData) {
   fetch('https://localhost:8080/podts',{
      method:'Post',
      body: JSON.stringify(postData),
      header: {
        'Content-Type': 'application/json'
      }
    });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
