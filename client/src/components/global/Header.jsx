import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import PropTypes from 'prop-types';

const Header = ({ handleLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = localStorage.getItem('token');
    const location = useLocation();
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'My Position', path: '/myPosition' },
        { link: 'Page-Y', path: '/#S' },
        { link: 'Page-Z', path: '/#C' },
    ];

    const navigate = useNavigate();
    const logout = async () => {
        localStorage.removeItem('token');
        handleLogout();
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-black relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex justify-between items-center w-[92%] mx-auto px-6 py-3">
                    <div>
                        <h1 className="text-white text-2xl font-bold font-ubuntu"> Let's <span className="text-lime-400 italic"> Track</span></h1>
                    </div>
                    <div className="">
                        <ul className="lg:flex justify-center items-center gap-8 hidden">
                            {navItems.map(({ link, path }) => (
                                <Link
                                    key={path}
                                    className={`text-white uppercase font-semibold cursor-pointer p-3 rounded-lg font-ubuntu text-[13px] ${isActive(path) ? 'bg-lime-400 text-slate-950' : 'hover:bg-lime-400 hover:text-black'}`}
                                    to={path}
                                    offset={-100}
                                >
                                    {link}
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:hidden w-full bg-black p-4 absolute top-[70px] left-0`} onClick={closeMenu}>
                        <ul className="flex flex-col justify-center items-center gap-2 w-full">
                            {navItems.map(({ link, path }) => (
                                <Link
                                    key={path}
                                    className={`text-white uppercase font-semibold cursor-pointer p-3 rounded-lg w-full text-center text-[13px] ${isActive(path) ? 'bg-lime-400 text-slate-950' : 'hover:bg-lime-400 hover:text-black'}`}
                                    to={path}
                                    offset={-100}
                                >
                                    {link}
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center gap-6">
                        {token ? (
                            <Button onClick={logout} className={'signIn'} variant={'signIn'} size={'signIn'}>
                                <Link>Logout</Link>
                            </Button>
                        ) : (
                            <Button className={'signIn'} variant={'signIn'} size={'signIn'}>
                                <Link to="/login">Sign In</Link>
                            </Button>
                        )}
                        <div className="lg:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <FaXmark className="text-white text-3xl cursor-pointer" /> : <FaBars className="text-white text-3xl cursor-pointer" />}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

Header.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};

export default Header;
