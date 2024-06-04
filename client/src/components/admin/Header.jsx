import { FaBars} from "react-icons/fa6";
import PropTypes from 'prop-types';
import classNames from "classnames";
import UserNav from "./UserNav";

const Header = ({toggleCollapse, setToggleCollapse}) => {
    const sidebarToggle = () => {
        setToggleCollapse(!toggleCollapse);
    }

    const headerStyle=classNames(
        "fixed bg-black w-full z-0 px-4 shadow-sm shadow-lime-400/20",
        {
            ["sm:pl-[20rem]"]:!toggleCollapse,
            ["sm:pl-[6rem]"]:toggleCollapse
        }
    )
    return (
        <header className={headerStyle}>
            <div className="flex items-center justify-between h-16">
                <button onClick={sidebarToggle} className="order-2 sm:order-1 flex items-center justify-center border-[1px] border-white hover:border-black bg-black text-white hover:bg-lime-400 hover:text-black rounded-md h-[30px] w-[30px] shadow-md shadow-lime-400/10 transition duration-300 ease-in-out ">
                    <FaBars className="cursor-pointer" />
                </button>
                <div className="order-1 sm:order-2 h-10 w-10 rounded-full flex items-center justify-center text-center">
                    <UserNav/>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    toggleCollapse: PropTypes.bool.isRequired,
    setToggleCollapse: PropTypes.func.isRequired,
};

export default Header;
