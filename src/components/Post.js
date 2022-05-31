const Post = (props) => {

    return(
    //====================== POST TO DIV CARD =========================

        <div id='post-div'>
            <h4>Tag: {props.post.tags}</h4>
            <h3>Body: {props.post.body}</h3>
            <img src={props.post.img} ></img>
            {/* <h4>Tag: {props.post.tags.map(tags)} */}
        <br/>
        {/* ===================== EDIT POST =========================*/}
            <props.Switch checkedChildren="Toggle Edit" unCheckedChildren="Toggle Edit" onClick={props.toggleEdit}/> 
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

                {/* ================ DELETE POST ==================== */}
            <br/>
            <button onClick={(event) => {props.removePost(props.post)}}>Delete</button>

        </div>
    )

} 
export default Post