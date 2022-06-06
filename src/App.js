import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Post from './components/Post';
import Chat from './components/Chat';
import io from "socket.io-client";
import Fuse from 'fuse.js';
import { Switch } from 'antd';

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
    .put(APIBaseURL + `posts/${postData._id}`, 
      {
      showComments: newShowComments
      })
    .then(()=>{
      axios
          .get(APIBaseURL).then((response)=>{
          setAllPosts(response.data)
    })
  })
}

  // ================================= SWITCH TOGGLE EDIT ==================================

  const toggleEdit = (postData, event) => {
    newShowEdit ? setNewShowEdit(false): setNewShowEdit(true)
    axios
    .put(APIBaseURL + `posts/${postData._id}`, 
      {
      showEdit: newShowEdit
      })
    .then(()=>{
      axios
          .get(APIBaseURL).then((response)=>{
          setAllPosts(response.data)
    })
  })
}

// ================================= SWITCH TOGGLE DELETE ===============================

  const toggleDelete = (postData, event) => {
    newShowDelete ? setNewShowDelete(false): setNewShowDelete(true)
    axios
    .put(APIBaseURL + `posts/${postData._id}`, 
      {
      showDelete: newShowDelete
      })
    .then(()=>{
      axios
          .get(APIBaseURL).then((response)=>{
          setAllPosts(response.data)
    })
  })
}

  // ======================================== SEARCH =======================================

  const fuse = new Fuse(posts, {
    keys: [
      'name',
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
            comments:[...postData.comments, comment],
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
  <div className='container'>
    <div id='createDiv' class="container-fluid">
      <div class="row">  
        <div class="col-xs-8 mx-auto, col-sm-8 mx-auto, col-md-10 mx-auto">
          <img id='sideLogo' src='https://i.imgur.com/LUF3DVe.png?1'/>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-8 mx-auto, col-sm-8 mx-auto, col-md-10 mx-auto">
          <form  onSubmit={handleFormSubmit}>
            <input type='text' class="form-control input-sm" placeholder='Name' onChange={handleNewName} required/>
            <input type='text' class="form-control input-sm" placeholder='Body' onChange={handleNewBody} required/>
            <input type='text' class="form-control input-sm" placeholder='Img(url)' onChange={handleNewImg} required/>
            <input type='text' class="form-control input-sm" placeholder='Tag' onChange={handleNewTag} required/>
            <input type='submit' id='createPost' class="form-control input-sm" value='Create Post'/>
          </form><br/>
        </div>
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
            <button class="joinBtn" onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>

  {/* ================================ CONTACT/INFO/TEAM DIV ===================================== */}
      <div id='info'>
          <div id='projectTeam'>
          {/* ======== Contact Us - Modal Link ======= */}
          <hr/>
          <a type="button" class="btn" data-toggle="modal" data-target="#contactUs">
            <i class="bi bi-envelope"> Contact Us</i>
          </a>
          {/* ===========-Contact Us - Modal ========== */}
          <div class="modal fade" id="contactUs" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="contactUsTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Contact Bottle Devs</h5>
                </div>
                <div class="modal-body">
                <p class="text-dark">
                <form action="mailto:Admin@BottleApp@.com"
                    method="POST"
                    enctype="multipart/form-data"
                    name="EmailForm">
                    Name:<br/>
                    <input type="text" size="19" name="Contact-Name"/><br/>
                    Email:<br/>
                    <input type="email" name="Contact-Email"/><br/>
                    Message:<br/>
                    <textarea name="Contact-Message" rows="6" cols='20'></textarea><br/>
                    <button id="send" class="btn btn-primary" type="submit" value="Submit">Send</button>

                  </form>
                </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          {/* ======== How to Use - Modal Link======= */}
          <a type="button" class="btn" data-toggle="modal" data-target="#howToUse">
          <i class="bi bi-question-circle"> How to Use</i>
          </a>
          {/* ========= How to Use - Modal ========== */}
          <div class="modal fade" id="howToUse" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="howToUseTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">How to use</h5>
                </div>
                <div class="modal-body">
                <p class="text-muted">
                Use Bottle to drop a message with: your name, your message, an img and a tag and connect with friends or others with comments and messages. You can hide and show the comments, the delete button and the edit form with the three button at the top of each message.<br/>
                Find friends or specific posts easily with fuzzy search at the top of the sidebar. <br/>
                Chat with friends in Bottle Chat a live chat app that stays on your sidebar while you scrolls friends recent message posts! Enjoy your time in the Bottle
                </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">I Get It</button>
                </div>
              </div>
            </div>
          </div>
          {/* ========About Us - Modal Link======= */}
          <a href type="button" class="btn" data-toggle="modal" data-target="#aboutUs">
          <i class="bi bi-people-fill"> About Us</i>
          </a>
          {/* ========== About Us - Modal ======== */}
          <div class="modal fade" id="aboutUs" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="aboutUsTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" font-color="#000000" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">About Us</h5>
                </div>
                <div class="modal-body" >
                <p class="text-dark">
                We are the team who brought you Bottle! Two Boston based devs...That should be all you need to know...but if you want more our github links are below at the bottom of the sidebar, or you can email us for more info at the contact us link in the sidebar
                </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
            <br/>
            <hr/>
            <p id='projectTeam'>Project Team:
              <a href='https://github.com/Lanny-MacMillan' target="_blank">
              <i class="bi bi-github"> Lanny</i></a>

              <a href='https://github.com/kbrpronet' target="_blank">
              <i class="bi bi-github"> Kai</i></a>
              </p>
          </div>
        </div>
        <h8 class="tag" >© 2022 The Bottle App.</h8>
    </div>
    <span>
        <a href="#top" id="toTop">
          <i id='toTop' class="bi bi-arrow-up-circle-fill"></i>
        </a>
    </span>
    </>
  );
}


export default App;


