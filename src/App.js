import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Post from './components/Post';
import Chat from './components/Chat';
import io from "socket.io-client";
import Fuse from 'fuse.js';
import { Switch } from 'antd'
const socket = io.connect("http://localhost:3001");

function App() {

  const [body, setBody] = useState('')
  const [img, setImg] = useState('')
  const [tags, setTags] = useState('')
  const [posts, setAllPosts] = useState([])
  const [query, setQuery] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    //allow join room if user has name and room has name
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const APIBaseURL = 'http://localhost:3000/'
  
  // URL below is to our backend...
  // const APIBaseURL = 'https://stark-crag-15310-backend.herokuapp.com/'




  
const toggleEdit = () => {
  showEdit ? setShowEdit(false): setShowEdit(true)
}
  // ====================== SEARCH ===========================
  const fuse = new Fuse(posts, {
    keys: [
      'body',
      'tags',
    ],
    includeScore: true
  })
  
  const results = fuse.search(query);
  const postsResults = query ? results.map(result => result.item): posts

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value)
  }
  console.log('results', results)

  // ==========================================================
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
    {postsResults.map((post)=> {
            return <Post 
            //    Props   =    Values
              removePost={removePost} 
              post={post} //this one confuses me but works
              img={img}
              tags={tags}
              Post={Post}
              editPost={editPost}
              Switch={Switch}
              toggleEdit={toggleEdit}
              handleNewBody={handleNewBody}
              handleNewImg={handleNewImg}
              handleNewTag={handleNewTag}
              // displayEdit={displayEdit}
              showEdit={showEdit}
              key={posts._id}/>
          })}
    </div>

    <div class='sidenav'>


    <div id='search'>
      <form id="form"> 
      <input type="search" value={query} onChange={handleOnSearch} id="query" name="q" placeholder="Search..."/>
        <button>Search Posts</button>
      </form>
    </div>
    <div className="chat">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Bottle Chat</h3>
          <h6>Use Room ID 'Bottle' for general chat, or create a new room to chat in</h6>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
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

