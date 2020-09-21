/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import navItems from './navItems.json';
import { setAuth } from '../../redux/userSlice';
import { logout } from '../../services/authentication';

const Navbar = ({ userRole, selected }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const itemList = navItems[userRole];
    const username = useSelector((state) => state.user.username);

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
                    {
                        itemList.map((item) => (
                            <li key={item.name} className={`nav-item ${(item.name === selected) && 'active'}`}>
                                <Link className="nav-link" to={item.link}>{item.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <span className="navbar-text">
                {`Hi, ${username}`}
                &nbsp; &nbsp; &nbsp;
            </span>
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
