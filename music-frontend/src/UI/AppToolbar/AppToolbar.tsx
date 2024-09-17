import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/User/userSlice";

const AppToolbar = ()=>{

    const user = useAppSelector(selectUser);

    let links = (
        <>
            <NavLink className="navbar-brand text-light ms-auto" to='/register'>Sign up</NavLink>
            <NavLink className="navbar-brand text-light" to='/login'>Sign in</NavLink>
        </>
    );

    if (user) {
        links = (
            <>
                <NavLink className="navbar-brand text-light ms-auto" to='/track-history'>Track-History</NavLink>
                <NavLink className="navbar-brand text-light" to='/user'>{user.username}</NavLink>
            </>
        )
    }

    return(
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <NavLink className="navbar-brand text-light" to='/' >Music</NavLink>
                {links}
            </div>
        </nav>
    )
}

export default AppToolbar;