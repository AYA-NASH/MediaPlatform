
function PostView({ post , likes}){

    return (
        <div className="PostView">
            <h3>{post.user.name}</h3>
            <h6>{post.updatedAt}</h6>
            <div className="Grid">
                {/* getting media component */}
            </div>
            <div className="likes">
                {/* getting the like button component */}
                {likes}
            </div>
        </div>
    );
}

export default PostView;