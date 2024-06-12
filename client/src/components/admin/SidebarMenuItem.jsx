import { MdOutlineDashboard, MdAccountCircle, MdLogout, MdOutlineCarRental } from "react-icons/md";
import { FaUsersGear, FaRoute, FaChevronRight, FaChevronDown } from "react-icons/fa6";
import { FaCar, FaComments } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

const SidebarMenuItem = ({ toggleCollapse }) => {
    const sideNavItems = [
        { 
            title: 'Dashboard',
            menuList: [{ 
                title: 'Dashboard', 
                path: '/dashboard',
                icon: <MdOutlineDashboard size={20} />
            }]
        },
        { 
            title: 'Manage',
            menuList: [
                {
                    title: 'Employees', 
                    path: '#',
                    icon: <FaUsersGear size={20} />,
                    submenu: true,
                    subMenuItems: [
                        { title: 'Add Employee', path: '/dashboard/employees/addEmp' },
                        { title: 'View Employees', path: '/dashboard/employees/viewEmps' }
                    ]
                },
                { 
                    title: 'Vehicles', 
                    path: '#',
                    icon: <FaCar size={20} />,
                    submenu: true,
                    subMenuItems: [
                        { title: 'Add Vehicle', path: '/dashboard/vehicles/addCar' },
                        { title: 'View Vehicles', path: '/dashboard/vehicles/viewCars' }
                    ]
                },
                { 
                    title: 'Tracks', 
                    path: '#',
                    icon: <FaRoute size={20} />,
                    submenu: true,
                    subMenuItems: [
                        { title: 'Last Position', path: '/dashboard/lastPosition' },             
                        { title: 'GeoFencing', path: '/dashboard/geoFencing' },
                        { title: 'Road History', path: '/dashboard/roadHistory' }
                    ]
                },
                { 
                    title: 'Orders', 
                    path: '/dashboard/orders',
                    icon: <MdOutlineCarRental size={20} />
                },
                { 
                    title: 'Feedbacks', 
                    path: '/dashboard/feedbacks',
                    icon: <FaComments size={20} />
                }
            ]
        }, 
        { 
            title: 'Settings',
            menuList: [
                {
                    title: 'Account', 
                    path: '/account',
                    icon: <MdAccountCircle size={20} />
                },
                {
                    title: 'Logout',
                    path: '#',
                    icon: <MdLogout size={20} />,
                    logout: true
                }
            ]
        },
    ];

    const [openSubMenus, setOpenSubMenus] = useState({});
    const location = useLocation();

    const toggleSubMenu = (index) => {
        setOpenSubMenus((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const isActive = (path, subMenuItems = []) => {
        if (location.pathname === path) return true;
        return subMenuItems.some(subItem => location.pathname === subItem.path);
    };

    const navigate = useNavigate();
    const logout = async () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    const menuGroupTitleSyle = classNames('py-4 tracking-[.1rem] font-medium uppercase text-sm text-sidebar-foreground',
        {
            'text-center': toggleCollapse
        }
    )

    return (
        <div>
            {sideNavItems.map((item, index) => {
                return (
                    <div key={index}>
                        <h3 className={menuGroupTitleSyle}>{!toggleCollapse ? item.title : '...'}</h3>
                        {item.menuList.map((menuItem, menuIndex) => (
                            menuItem.submenu
                                ? ( 
                                    <div key={menuIndex} className="rounded-md min-w-[18px]">
                                        <a className={`flex items-center min-h-[40px] h-full py-2 px-4 hover:text-lime-400 rounded-md transition duration-200 ${isActive(menuItem.path, menuItem.subMenuItems) ? 'rounded-md text-lime-400 font-bold bg-white/10' : 'text-white'}`} onClick={() => toggleSubMenu(`${index}-${menuIndex}`)}>
                                            {menuItem.icon} 
                                            {!toggleCollapse &&
                                                <>
                                                    <span className="ml-3 text-base leading-6 font-semibold">{menuItem.title}</span>
                                                    {openSubMenus[`${index}-${menuIndex}`] ? 
                                                        <FaChevronDown className="ml-auto stroke-2 text-xs" /> :
                                                        <FaChevronRight className="ml-auto stroke-2 text-xs" />
                                                    }
                                                </>
                                            }
                                        </a>
                                        {openSubMenus[`${index}-${menuIndex}`] && !toggleCollapse &&
                                            <div className="bg-white/10 border-l-4 mt-2 mb-2">
                                                <div className="grid gap-y-2 px-10 py-3 leading-5">
                                                    {menuItem.subMenuItems.map((subItem, subIndex) => (
                                                        <Link key={subIndex} to={subItem.path} className={`py-2 px-4 hover:text-lime-400 transition duration-200 ${isActive(subItem.path) ? 'rounded-md text-lime-400 font-bold bg-black' : 'text-white'}`}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                                : (
                                    menuItem.logout ? 
                                        <a key={menuIndex} onClick={logout} className={`flex items-center min-h-[40px] h-full py-2 px-4 cursor-pointer hover:text-lime-400 rounded-md transition duration-200 text-white`}>
                                            {menuItem.icon} 
                                            {!toggleCollapse && <span className="ml-3 leading-6 font-semibold">{menuItem.title}</span>}
                                        </a>
                                    :
                                        <Link key={menuIndex} to={menuItem.path} className={`flex items-center min-h-[40px] h-full py-2 px-4 hover:text-lime-400 rounded-md transition duration-200 ${isActive(menuItem.path) ? 'rounded-md text-lime-400 font-bold bg-white/10' : 'text-white'}`}>
                                            {menuItem.icon} 
                                            {!toggleCollapse && <span className="ml-3 leading-6 font-semibold">{menuItem.title}</span>}
                                        </Link>
                                )
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

SidebarMenuItem.propTypes = {
    toggleCollapse: PropTypes.bool.isRequired,
};

export default SidebarMenuItem;
