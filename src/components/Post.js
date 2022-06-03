const Post = (props) => {

    return(
//====================================== POST _ID INFO TO DIV CARD ===================================

    <div id='post-div'>
        <button onClick={() => {props.toggleComments(props.post)}}>Comments</button>
        <button onClick={() => {props.toggleEdit(props.post)}}>Edit</button>
        <button onClick={() => {props.toggleDelete(props.post)}}>Delete</button>
            <br/>
        {/* <props.Switch checkedChildren="Comments" unCheckedChildren="Comments" onClick={() => {props.toggleComments(props.post)}}/>

        <props.Switch checkedChildren="Edit" unCheckedChildren="Edit" onClick={() => {props.toggleEdit(props.post)}}/>

        <props.Switch checkedChildren="Delete" unCheckedChildren="Delete" onClick={() => {props.toggleDelete(props.post)}}/> 
 */}
        <h4>Tag(s): <br/>{props.post.tags}</h4>
        <h4>Name : {props.post.name}</h4>
        <h4>{props.post.body}</h4>
        <img src={props.post.img} ></img>

{/* ============================================ EDIT POST =========================================*/}

            {/* {props.showEdit ? 'Hello' : 'Goodbye'} */}
            {props.post.showEdit ? 
            <div id='showEdit'>
                <br/>
                <form onSubmit={(event) => {props.editPost(event, props.post)}}>
                    <input placeholder={props.post.body} onChange={props.handleNewBody}  type="text" required/><br/>
                    <input placeholder={props.post.img} onChange={props.handleNewImg} type="text" required/><br/>
                    <input placeholder={props.post.tags} onChange={props.handleNewTag} type="text" required/><br/>
                    <input id='button' type="submit" value="Edit Message"/>
                </form>
            </div>
            : null}

{/* =========================================== DELETE POST =========================================  */}
            <br/>
            <br/>
            {props.post.showDelete ? 
            <button onClick={(event) => {props.removePost(props.post)}}>Delete...Are you sure?</button> : null}

            

{/* ========================================== COMMENT POST ========================================= */}
            
            {props.post.showComments ? <h2>Comments</h2> : null}
            {props.post.showComments ? <hr/> : null}
            {props.post.showComments ? 
            
                <div id='showComments'>   
                    {props.post.comments.map((comment)=>{
                        return(
                        <li>-{comment}</li>
                        )
                    })}

                </div>
            : null }

            <br/>
            <form onSubmit={(event) => {props.addComment(event, props.post)}}>
                    <input placeholder="What's on your mind..." onChange={props.handleNewComment}  type="text" required/><br/>
                    <input id='button' type="submit" value="Add Comment"/>
                </form>

        </div>
    )

} 
export default Post