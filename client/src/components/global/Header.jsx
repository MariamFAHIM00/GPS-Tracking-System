import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import PropTypes from 'prop-types';

const Header = ({handleLogout}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = localStorage.getItem('token');
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    const navItems = [
        { link: 'Home', path: '/#' },
        { link: 'Page-X', path: '/#D' },
        { link: 'Page-Y', path: '/#S' },
        { link: 'Page-Z', path: '/#C' },
    ]

    const navigate = useNavigate();
    const logout = async () => {
        localStorage.removeItem('token');
        handleLogout();
        navigate("/");
    };

    return (
        <header className='bg-gradient-to-b from-black via-black to-white'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Add a container with max-width */}
                <nav className='flex justify-between items-center w-[92%] mx-auto px-6 py-3'>
                    <div>
                        <h1 className='text-white text-2xl font-bold font-ubuntu'> Lets <span className='text-lime-400 italic'> Track</span></h1>
                    </div>
                    <div className=''>
                        <ul className='lg:flex justify-center items-center gap-8 hidden'>
                            {navItems.map(({ link, path }) => (
                                <Link key={path} className='text-white uppercase font-semibold cursor-pointer p-3 rounded-lg hover:bg-lime-400 hover:text-black font-ubuntu text-[13px]' to={path} offset={-100}> {link} </Link>
                            ))}
                        </ul>
                    </div>
                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:hidden w-full bg-black p-4 absolute top-[70px] left-0`} onClick={closeMenu}>
                        <ul className='flex flex-col justify-center items-center gap-2 w-full'>
                            {navItems.map(({ link, path }) => (
                                <Link key={path} className='text-white uppercase font-semibold cursor-pointer p-3 rounded-lg hover:bg-lime-400 hover:text-black w-full text-center text-[13px]' to={path} offset={-100}> {link} </Link>
                            ))}
                            
                        </ul>
                    </div>
                    <div className='flex items-center gap-6'>
                        {token ? (
                            <Button onClick={logout} className={'signIn'} variant={'signIn'} size={'signIn'}>
                                <Link >Logout</Link>
                            </Button>
                        ) : (
                            <Button className={'signIn'} variant={'signIn'} size={'signIn'}>
                                <Link to="/login">Sign In</Link>
                            </Button>
                        )}
                        <div className='lg:hidden' onClick={toggleMenu}>
                            {isMenuOpen ? <FaXmark className='text-white text-3xl cursor-pointer' /> : <FaBars className='text-white text-3xl cursor-pointer' />}                
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

Header.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};

export default Header;
