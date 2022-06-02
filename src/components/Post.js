const Post = (props) => {

    return(
//====================================== POST _ID INFO TO DIV CARD ===================================

        <div id='post-div'>
            <props.Switch checkedChildren="Comments" unCheckedChildren="Comments" onClick={props.toggleComments}/>
            <props.Switch checkedChildren="Edit" unCheckedChildren="Edit" onClick={props.toggleEdit}/> 
            <props.Switch checkedChildren="Delete" unCheckedChildren="Delete" onClick={props.toggleDelete}/> 
            <h4>Tag(s): <br/>{props.post.tags}</h4>
            <h3>{props.post.body}</h3>
            <img src={props.post.img} ></img>
            <br/>
{/* ============================================ EDIT POST =========================================*/}

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

{/* =========================================== DELETE POST =========================================  */}

            <br/>
            {props.showDelete ? <button onClick={(event) => {props.removePost(props.post)}}>Delete Post</button> : null}

            

{/* ========================================== COMMENT POST ========================================= */}
            <br/>

            {props.showComments ? 
                <div id='showComments'>   
                    {props.post.comments.map((comment)=>{
                        return(
                        <li>{comment}</li>
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