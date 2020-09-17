import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/userSlice';
import { logout } from '../../services/authentication';

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSignout = () => {
        logout();
        history.push('/login');
        dispatch(setAuth({}));
    };

    return (
        <nav className="navbar fixed-top navbar-expand navbar-dark bg-primary">
            <a className="navbar-brand" href="/">Meetings App</a>
            <div className="navbar-collapse collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/calendar">Calendar</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/meetings">Meetings</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/teams">Teams</Link>
                    </li>
                </ul>
            </div>
            <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
                onClick={handleSignout}
            >
                Sign out
            </button>
        </nav>
    );
};
export default Navbar;
