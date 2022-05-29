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
  // URL below is to our backend...
  // const APIBaseURL = 'https://stark-crag-15310-backend.herokuapp.com/'

  
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
    <div id='title'>
      <img id='logo'src='https://i.imgur.com/jHIS9Lc.png'/>
      
    </div>

    <div className='container'>
      <div id='createDiv'>
      <img id='sideLogo' src='https://i.imgur.com/LUF3DVe.png?1'/>
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


    <div id='search'>
      <form id="form"> 
      <input type="search" id="query" name="q" placeholder="Search..."/>
        <button>Search Tags</button>
      </form>
    </div>
    <div id='info'>
        <div id='projectTeam'>
          <a href='x'>Contact Us</a>
          <a href='x'>How to Use</a>
          <a href='x'>About Us</a>
          <br/>
          <p>Project Team:<hr/></p>
          <ul>
            <li>
              <a href='https://github.com/Lanny-MacMillan' target="_blank">Lanny</a>
              <a href='https://github.com/kbrpronet' target="_blank">Kai</a>
            </li>
          <p>Dev Links:<hr/></p>
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
      </div>
    </div>
    </>
  );
}

export default App;

