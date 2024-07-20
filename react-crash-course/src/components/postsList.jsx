import { useState, useEffect } from 'react';
import Post from './post';
import NewPost from './newpost';
import Modal from './modal';
import classes from './postslist.module.css';

function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setFetching(true);
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const resData = await response.json();
        setPosts(resData.posts);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setFetching(false);
      }
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(error => console.error('Post error:', error));

    setPosts(existingPosts => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.id} author={post.author} body={post.body} /> // Ensure key is unique
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Loading posts...</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
