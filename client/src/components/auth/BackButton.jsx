import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import { Button } from '../ui/button';

const BackButton = (props) => {
    const { href, label } = props;
    return (
        <Button variant={"link"} className={"font-normal w-full"}>
            <Link className={"text-[#a3e635]"} to={href}> {label} </Link>
        </Button>
    );
}

BackButton.propTypes = {
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default BackButton;
