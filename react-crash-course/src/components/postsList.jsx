import { useState } from 'react';

import Post from './post';
import NewPost from './newpost';
import Modal from './modal';
import classes from './postslist.module.css';



function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPosts ] =  useState([]);

  function addPostHandler(postData) {
    setPosts((existingPosts) => [postData, ...existingposts]);
  }
  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author="Manuel" body="Check out the full course!" />
      </ul>
    </>
  );
}

export default PostsList;