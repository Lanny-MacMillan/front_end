import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Post from './components/Post'


function App() {
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('')
  const [posts, setAllPosts] = useState([])

  
  const handleNewBody = (event) => {
    setBody(event.target.value)
  }
  const handleNewTag = (event) => {
    setTag(event.target.value)
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post(
      'http://localhost:3000/posts',
      {
        body:body,
        tag:tag,
      }//then request is so we dont have to reload page on submission
    ).then(()=>{
      axios
          .get('http://localhost:3000/posts')
          .then((response)=>{
              setAllPosts(response.data)
          })
      })
  }

  
  // ============ NEEDS API ADDRESS ===================================================
  const editPost = (event, postData) => {
    event.preventDefault()
      axios
        .put(
          `http://localhost:3000/posts/${postData._id}`,
          {
            body:body,
            tag:tag,
          }
      )
      .then(() => {
        axios
          .get('http://localhost:3000/posts')
          .then((response) => {
              setAllPosts(response.data)
          })
      })
  }
  
  // ============ NEEDS API ADDRESS ===================================================
  const removePost = (postData)=>{
    axios
        .delete(`http://localhost:3000/posts/${postData._id}`)
        .then(()=>{
            axios
                .get('http://localhost:3000/posts')
                .then((response)=>{
                    setAllPosts(response.data)
                })
        })
  }

  // ============ NEEDS API ADDRESS ===================================================
  useEffect(() => {
    axios 
        .get('http://localhost:3000/posts')
        .then((response) => {
          // console.log(response.data)
          setAllPosts(response.data)
        })
  }, [])

  return (
    <>
    <h1>Bottle App</h1>
    <section>
      <h2>Message Here</h2>
        <form onSubmit={handleFormSubmit}>
          <input type='text' placeholder='Body' onChange={handleNewBody} required/><br/>
          <input type='text' placeholder='Tag' onChange={handleNewTag} required/><br/>
          <input type='submit' value='Create Post'/>
        </form><br/>
    </section>
    <div className='container'>
    {posts.map((post)=> {
            return <Post 
            //    Props   =    Values
              removePost={removePost} 
              post={post} //this one confuses me but works
              editPost={editPost}
              handleNewBody={handleNewBody}
              handleNewTag={handleNewTag}
              key={posts._id}/>
          })}
    </div>
    </>
  );
}

export default App;
