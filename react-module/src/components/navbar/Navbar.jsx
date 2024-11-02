import { Link } from "react-router-dom";
import './Navbar.css'
function Navbar() {
    return (
        <div className="Navbar">
            <Link to={"/"}> Home </Link>
            <Link to={"create-post"}> Create Post </Link>
            <Link to={"/login"} id="login"> Login </Link>
        </div>
    )
}
export default Navbar;