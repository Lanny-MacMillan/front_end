const Post = (props) => {

    return(
    //====================== POST _ID INFO TO DIV CARD =========================

        <div id='post-div'>
            <props.Switch checkedChildren="Comments" unCheckedChildren="Comments" onClick={props.toggleComments}/>
            <props.Switch checkedChildren="Edit" unCheckedChildren="Edit" onClick={props.toggleEdit}/> 
            <props.Switch checkedChildren="Delete" unCheckedChildren="Delete" onClick={props.toggleDelete}/> 
            <h4>Tag: {props.post.tags}</h4>
            <h3>Body: {props.post.body}</h3>
            <img src={props.post.img} ></img>
            <br/>
        {/* ===================== EDIT SWITCH/POST =========================*/}
            {/* <props.Switch checkedChildren="Toggle Edit" unCheckedChildren="Toggle Edit" onClick={props.toggleEdit}/>  */}
            <br/>
            {/* {props.showEdit ? 'Hello' : 'Goodbye'} */}
            {props.showEdit ?
            <div id='showEdit'>
                <form onSubmit={(event) => {props.editPost(event, props.post)}}>
                    <input placeholder={props.post.body} onChange={props.handleNewBody}  type="text" required/><br/>
                    <input placeholder={props.post.img} onChange={props.handleNewImg} type="text" required/><br/>
                    <input placeholder={props.post.tags} onChange={props.handleNewTag} type="text" required/><br/>
                    <input id='button' type="submit" value="Edit Message"/>
                </form>
            </div>
            : null}

            {/* ======================== DELETE POST ========================  */}

            <br/>
           {props.showDelete ? <button onClick={(event) => {props.removePost(props.post)}}>Delete Post</button> : null}
      
            

            {/* ====================== COMMENT SWITCH ======================== */}
            <br/>

            {props.showComments ? <>{props.post.comments}</>: null }

            <br/>
            <form onSubmit={(event) => {props.addComment(event, props.post)}}>
                    <input placeholder="What's on your mind..." onChange={props.handleNewComment}  type="text" required/><br/>
                    <input id='button' type="submit" value="Add Comment"/>
                </form>
            {/* <props.Switch checkedChildren="Hide Comments" unCheckedChildren="Show Comments" onClick={props.toggleComments}/> */}

        </div>
    )

} 
export default Post