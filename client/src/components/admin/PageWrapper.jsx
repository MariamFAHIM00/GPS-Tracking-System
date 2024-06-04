import classNames from "classnames";
import PropTypes from 'prop-types';

const PageWrapper = ({toggleCollapse, children}) => {
    const pageStyle= classNames(
        "bg-black flex-grow text-white p-2 mt-16 ",
        {
            ["sm:pl-[20.4rem]"]:!toggleCollapse,
            ["sm:pl-[7rem]"]:toggleCollapse
        }
    )
    return (
        <div className={pageStyle}>
            {children}
        </div>
    );
}

PageWrapper.propTypes = {
    toggleCollapse: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};


export default PageWrapper;
