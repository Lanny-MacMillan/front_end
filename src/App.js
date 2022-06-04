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
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [img, setImg] = useState('')
  const [tags, setTags] = useState('')
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [posts, setAllPosts] = useState([])
  const [query, setQuery] = useState('')
  const [newShowDelete, setNewShowDelete] = useState(false)
  const [newShowEdit, setNewShowEdit] = useState(false)
  const [newShowComments, setNewShowComments] = useState(false)
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  // const [showEdit, setShowEdit] = useState(false)
  // const [showDelete, setShowDelete] = useState(false)



  // =============================== JOIN CHAT FUNCTION ====================================
  const joinRoom = () => {
    //allow join room if user has name and room has name
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  // ==================================== API BASE URLS ====================================

  // const APIBaseURL = 'http://localhost:3000/'
  // URL below is to our backend...
  const APIBaseURL = 'https://stark-crag-15310-backend.herokuapp.com/'

  // ================================= SWITCH TOGGLE COMMENT ===============================

  const toggleComments = (postData, event) => {
    newShowComments ? setNewShowComments(false): setNewShowComments(true)
    axios
    .put(`http://localhost:3000/posts/${postData._id}`, 
      {
      showComments: newShowComments
      })
    .then(()=>{
      axios
          .get('http://localhost:3000/posts').then((response)=>{
          setAllPosts(response.data)
    })
  })
}

  // ================================= SWITCH TOGGLE EDIT ==================================

  const toggleEdit = (postData, event) => {
    newShowEdit ? setNewShowEdit(false): setNewShowEdit(true)
    axios
    .put(`http://localhost:3000/posts/${postData._id}`, 
      {
      showEdit: newShowEdit
      })
    .then(()=>{
      axios
          .get('http://localhost:3000/posts').then((response)=>{
          setAllPosts(response.data)
    })
  })
}

// ================================= SWITCH TOGGLE DELETE ===============================

  const toggleDelete = (postData, event) => {
    newShowDelete ? setNewShowDelete(false): setNewShowDelete(true)
    axios
    .put(`http://localhost:3000/posts/${postData._id}`, 
      {
      showDelete: newShowDelete
      })
    .then(()=>{
      axios
          .get('http://localhost:3000/posts').then((response)=>{
          setAllPosts(response.data)
    })
  })
}

  // ======================================== SEARCH =======================================

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

  // ===================================== HANDLES CHANGES =================================

  const handleNewName = (event) => {
    setName(event.target.value)
  }
  const handleNewBody = (event) => {
    setBody(event.target.value)
  }
  const handleNewImg = (event) => {
    setImg(event.target.value)
  }
  const handleNewTag = (event) => {
    setTags(event.target.value)
  }
  const handleNewComment = (event) => {
    setComment(event.target.value)
  }
  
    // ================================ CREATE POST FUNCTION =================================

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post(
      APIBaseURL + 'posts/',
      {
        name:name,
        body:body,
        img:img,
        tags:tags,
        showEdit: false,
        showDelete: false,
        showComments: false
      }//then request is so we dont have to reload page on submission
    ).then(()=>{
      event.target.reset()
      axios
          .get(APIBaseURL + 'posts/')
          .then((response)=>{
              setAllPosts(response.data)
          })
      })
  }
  // ================================ ADD COMMENT FUNCTION =================================

  const addComment = (event, postData) => {
    event.preventDefault()
      axios
        .put(
          APIBaseURL + `posts/${postData._id}`,
          {
            comments:[...postData.comments, comment]
          }
      )
      .then(() => {
        event.target.reset()
        axios
          .get(APIBaseURL + 'posts/')
          .then((response) => {
              setAllPosts(response.data)
          })
      })
  }

  // ================================= EDIT FUNCTION ==================================
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
        event.target.reset()
        axios
          .get(APIBaseURL + 'posts/')
          .then((response) => {
              setAllPosts(response.data)
          })
      })
  }
  
  // ================================ DELETE FUNCTION =================================
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

  // =========================== GET AND SET ALL FUNCTION ==============================
  
  useEffect(() => {
    axios 
        .get(APIBaseURL + 'posts/')
        .then((response) => {
          // console.log(response.data)
          setAllPosts(response.data)
          setComments(response.data)
        })
  }, [])




  return (
    <>
  {/* ======================== HEADER AND LOGO ====================================== */}

    <div id='title'>
      <img id='logo'src='https://i.imgur.com/jHIS9Lc.png'/>
    </div>


  {/* ======================== CREATE/POST DIV AND LOGO2 =================================== */}
  <div id='createDiv' class="container-fluid">
    <div class="row">  
      <div class="col-xs-6 mx-auto, col-sm-8 mx-auto, col-md-8 mx-auto">
        <img id='sideLogo' src='https://i.imgur.com/LUF3DVe.png?1'/>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6 mx-auto, col-sm-8 mx-auto, col-md-8 mx-auto">
        <form onSubmit={handleFormSubmit}>
          <input type='text' class="form-control" placeholder='Name' onChange={handleNewName} required/>
          <input type='text' class="form-control" placeholder='Body' onChange={handleNewBody} required/>
          <input type='text' class="form-control" placeholder='Img(url)' onChange={handleNewImg} required/>
          <input type='text' class="form-control" placeholder='Tag' onChange={handleNewTag} required/>
          <input type='submit' class="form-control" value='Create Post'/>
        </form><br/>
      </div>
    </div>
  </div>
    



  {/* ======================== MAP-SEARCH/ALL POSTS PASS PROPS =================================== */}

    <div className='container'>
    {postsResults.map((post)=> {
            return <Post 
            //  Props   =    Values
              removePost={removePost} 
              post={post} 
              img={img}
              tags={tags}
              Post={Post}
              comment={comment}
              editPost={editPost}
              Switch={Switch}
              addComment={addComment}
              // showComments={showComments}
              // showDelete={showDelete}
              // newShowDelete={newShowDelete}
              toggleEdit={toggleEdit}
              toggleComments={toggleComments}
              toggleDelete={toggleDelete}
              handleNewBody={handleNewBody}
              handleNewImg={handleNewImg}
              handleNewTag={handleNewTag}
              handleNewComment={handleNewComment}
              comments={comments}
              // showEdit={showEdit}
              key={posts._id}/>
          })}
    </div>

  {/* =========================== SIDENAVBAR ===================================== */}

    <div className='sidenav'>

  {/* ================================ SEARCH ===================================== */}
      <div id='search'>
        <form id="form" > 
          <input class="form-control"  type="search"  value={query} onChange={handleOnSearch} id="query" name="q" placeholder="Search Posts..."/>
        </form>
      </div>

  {/* ================================= CHAT ====================================== */}
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

  {/* ================================ CONTACT/INFO/TEAM DIV ===================================== */}
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
            </ul>
          </div>
        </div>
    </div>
    </>
  );
}

export default App;


