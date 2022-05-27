const Post = (props) => {

    return(
    //====================== POST TO DIV CARD =========================

        <div id='post-div'>
            <h3>Body: {props.post.body}</h3>
            <h4>Tag: {props.post.tag}</h4>

        {/* ===================== EDIT POST =========================*/}

            <h4>Edit Post</h4>
                <form onSubmit={(event) => {props.editPost(event, props.post)}}>
                    <input placeholder={props.post.body} onChange={props.handleNewBody} type="text" required/><br/>
                    <input placeholder={props.post.tag} onChange={props.handleNewTag} type="text" required/><br/>
                    <input id='button' type="submit" value="Edit Message"/>
                </form>

                {/* ================ DELETE POST ==================== */}

            <button onClick={(event) => {props.removePost(props.post)}}>Adopt</button>

        </div>
    )

} 
export default Post