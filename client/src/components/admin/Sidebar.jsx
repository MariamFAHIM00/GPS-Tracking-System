import SidebarMenuItem from "./SidebarMenuItem";
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { useNavigate } from "react-router-dom";

const Sidebar = ({toggleCollapse}) => {
    const asideStyle= classNames(
        "sidebar overflow-y-auto overflow-x-auto fixed bg-black text-white z-50 h-full shadow-lg shadow-lime-400/20 transition duration-300 ease-in-out",
        {
            ["sm:w-[5.4rem] sm:left-0 left-[-100%]"]:toggleCollapse,
            ["w-[19rem]"]:!toggleCollapse
        }
    )

    const navigate = useNavigate();
    const logout = async () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    return (
        <aside className={asideStyle} >
            <div className="sidebar-top flex relative justify-center items-center py-5 px-3.5">
                {!toggleCollapse && <h1 className="text-white text-2xl font-bold font-ubuntu">Drive<span className="text-lime-400 italic">Lux</span></h1>}
                {toggleCollapse && <h1 className="text-white text-2xl font-bold font-ubuntu">D<span className="text-lime-400 italic">L</span></h1>}
            </div>
            <nav className="flex flex-col gap-2 transition duration-300">
                <div className="flex flex-col gap-2 px-4">
                    <SidebarMenuItem toggleCollapse={toggleCollapse}></SidebarMenuItem>
                </div>
            </nav>
        </aside>
    );
}

Sidebar.propTypes = {
    toggleCollapse: PropTypes.bool.isRequired,
};

export default Sidebar;
