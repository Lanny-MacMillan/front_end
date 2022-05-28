import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Post from './components/Post'


function App() {

  const [body, setBody] = useState('')
  const [img, setImg] = useState('')
  const [tags, setTags] = useState('')
  const [posts, setAllPosts] = useState([])

  const APIBaseURL = 'http://localhost:3000/'
  // URL below isnt correct its just a placeholder
  // const APIBaseURL = 'https://stormy-temple-25752.herokuapp.com/'

  
  const handleNewBody = (event) => {
    setBody(event.target.value)
  }
  const handleNewImg = (event) => {
    setImg(event.target.value)
  }
  const handleNewTag = (event) => {
    setTags(event.target.value)
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post(
      APIBaseURL + 'posts/',
      {
        body:body,
        img:img,
        tags:tags,
      }//then request is so we dont have to reload page on submission
    ).then(()=>{
      axios
          .get(APIBaseURL + 'posts/')
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
          APIBaseURL + `posts/${postData._id}`,
          {
            body:body,
            img:img,
            tags:tags,
          }
      )
      .then(() => {
        axios
          .get(APIBaseURL + 'posts/')
          .then((response) => {
              setAllPosts(response.data)
          })
      })
  }
  
  // ============ NEEDS API ADDRESS ===================================================
  const removePost = (postData)=>{
    axios
        .delete(APIBaseURL + `posts/${postData._id}`)
        .then(()=>{
            axios
                .get(APIBaseURL + 'posts/')
                .then((response)=>{
                    setAllPosts(response.data)
                })
        })
  }

  useEffect(() => {
    axios 
        .get(APIBaseURL + 'posts/')
        .then((response) => {
          // console.log(response.data)
          setAllPosts(response.data)
        })
  }, [])

  return (
    <>
    <div id='title'>Bottle App</div>

    <div className='container'>
    <div id='createDiv'>
      <h2>Message Here</h2>
        <form onSubmit={handleFormSubmit}>
          <input type='text' placeholder='Body' onChange={handleNewBody} required/><br/>
          <input type='text' placeholder='Img' onChange={handleNewImg} required/><br/>
          <input type='text' placeholder='Tag' onChange={handleNewTag} required/><br/>
          <input type='submit' value='Create Post'/>
        </form><br/>
    </div>
    </div>
    <div className='container'>
    {posts.map((post)=> {
            return <Post 
            //    Props   =    Values
              removePost={removePost} 
              post={post} //this one confuses me but works
              img={img}
              tags={tags}
              editPost={editPost}
              handleNewBody={handleNewBody}
              handleNewImg={handleNewImg}
              handleNewTag={handleNewTag}
              key={posts._id}/>
          })}
    </div>
    <div class='sidenav'>
      <ul>
        <li>
          <a href='https://cloud.mongodb.com/v2/6290d9dd104b8b4c06555ef8#metrics/replicaSet/6290da14a1cd8c01b39440e9/explorer/test/posts/find'
          target="_blank">Atlas DB</a>
        </li>
        <li>
          <a href='https://github.com/Lanny-MacMillan/front_end'
          target="_blank">Git Front</a>
        </li>
        <li>
          <a href='https://github.com/Lanny-MacMillan/back_end' 
          target="_blank">Git Back</a>
          </li>
      </ul>
    </div>
    </>
  );
}

export default App;
