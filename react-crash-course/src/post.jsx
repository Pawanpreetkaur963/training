import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostsList from './components/postsList';


function post() {
  const [modalIsVisible, setModalIsVisible] = useState(false);



  function hideModalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        <PostsList
          isPosting={modalIsVisible}
          onStopPosting={hideModalHandler}
        />
      </main>
    </>
  );
}

export default post;