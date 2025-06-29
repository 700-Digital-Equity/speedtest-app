import { Link } from "react-router-dom"
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {/* <li>
                    <Link to="/login">Login</Link>
                </li>*/}
                <li>
                    <Link to="/comparison">Leaderboard</Link>
                </li> 

            </ul>
        </nav>
    )
}