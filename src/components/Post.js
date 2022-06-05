const Post = (props) => {

    return(
//====================================== POST _ID INFO TO DIV CARD ===================================
<div id='post-div'>
        <div class="container-fluid">
            <div class="row">  
                <div class="col-10 mx-auto, col-sm-4 mx-auto, col-md-3 mx-auto">
                    <ul class="navbar-nav mx-auto">
                        <button onClick={() => {props.toggleComments(props.post)}} id='commentButton' class="btn btn-secondary btn-sm">Comments</button>
                    </ul>
                </div>
                <div class="col-10 mx-auto, col-sm-4 mx-auto, col-md-3 mx-auto">
                    <ul class="navbar-nav mx-auto">
                        <button onClick={() => {props.toggleDelete(props.post)}} id='deleteButton' class="btn btn-danger btn-sm">Delete</button>
                    </ul>
                </div>
                <div class="col-10 mx-auto, col-sm-4 mx-auto, col-md-3 mx-auto">
                        <ul class="navbar-nav mx-auto">
                        <button onClick={() => {props.toggleEdit(props.post)}} id='editButton' class="btn btn-secondary btn-sm">Edit</button>
                    </ul>
                </div>
            </div>
        </div>    
            <br/>
        <div class="container-fluid">    
            <div class="row">  
                <div id='name' class="col-4 mx-auto, col-sm-4 mx-auto, col-md-6 mx-auto">
                Name : {props.post.name}
                </div>
                <div id='tags' class="col-4 mx-auto, col-sm-4 mx-auto, col-md-6 mx-auto">
                Tag(s): {props.post.tags}
                </div>
            </div>
        </div>
    <br/>
    <div class="container-fluid">    
        <div class="row">  
            <div class="col-10 mx-auto, col-sm-10 mx-auto, col-md-10 mx-auto">
                <h6>{props.post.body}</h6>
            </div>
            <br/>
            <div class="col-10 mx-auto, col-sm-10 mx-auto, col-md-8 mx-auto">
                <img src={props.post.img} class="img-fluid" alt="Responsive image"></img>
            </div>
        </div>
    </div>
        

{/* ============================================ EDIT POST =========================================*/}
    <div class="container-fluid">    
            <div class="row">  
                <div class="col-8 mx-auto, col-sm-8 mx-auto, col-md-5 mx-auto">
                    {props.post.showEdit ? 
                    <div class="form-group">
                    <br/>
                        <form class="form-horizontal" onSubmit={(event) => {props.editPost(event, props.post)}}>
                            <input class="form-control input-sm" id="inputsm" placeholder={props.post.body} onChange={props.handleNewBody}  type="text" required/>
                            <input class="form-control input-sm" id="inputsm" placeholder={props.post.img} onChange={props.handleNewImg} type="text" required/>
                            <input class="form-control input-sm" id="inputsm" placeholder={props.post.tags} onChange={props.handleNewTag} type="text" required/>
                            <input class="form-control input-sm" id='buttonEdit' type="submit" value="Edit Message"/>
                        </form>
                    </div>
                    : null}
                </div>
            </div>
{/* =========================================== DELETE POST =========================================  */}
            <div class="row">   
                <div class="col-8 mx-auto, col-sm-10 mx-auto, col-md8 mx-auto">
                    {props.post.showDelete ? 
                        <button class="btn btn-danger btn-sm" onClick={(event) => {props.removePost(props.post)}}>Delete</button>              
                    : null}
                </div>
            </div>
        </div>

{/* ========================================== COMMENT POST ========================================= */}
    <div class="container-fluid">    
            <div class="row">  
                <div class="col-10 mx-auto, col-sm-10 mx-auto, col-md-12 mx-auto">
                    {props.post.showComments ? <h2>Comments</h2> : null}
                    {props.post.showComments ? <hr/> : null}
                </div>
            </div>
            <div class="row"> 
                <div id='showComments' class="col-10 mx-auto, col-sm-10 mx-auto, col-md-10 mx-auto">
                    {props.post.showComments ? 
                        <>   
                        {props.post.comments.map((comment)=>{
                        return(<li> -{comment} </li>)
                        })}
                        </>
                    : null }
                </div>
            </div>
    </div>
    <br/>
{/* ======================================= NEW COMMENT FORM ======================================= */}
    <div class="container-fluid">    
        <div class="row">  
            <div class="col-8 mx-auto, col-sm-8 mx-auto, col-md-8 mx-auto">
                <form onSubmit={(event) => {props.addComment(event, props.post)}}>
                    <input placeholder="What's on your mind..." onChange={props.handleNewComment}  class="form-control" type="text" required/><br/>
                    <input id='editSubmit' class="form-control" type="submit" value="Add Comment"/>
                </form>
            </div>
        </div>
    </div>

</div>
)
} 
export default Post