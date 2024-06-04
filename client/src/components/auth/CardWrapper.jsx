import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import AuthHeader from '@/components/auth/AuthHeader.jsx'
import BackButton from '@/components/auth/BackButton'

const CardWrapper = (props) => {
    const { label, title, backButtonHref, backButtonLabel, children } = props;

    return (
        <Card className={"shadow-md bg-black text-white w-[350px] border-lime-400"}>
            <CardHeader>
                <AuthHeader label={label} title={title}/>
            </CardHeader> 
            <CardContent >
                {children}
            </CardContent>
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel}/>
            </CardFooter>
        </Card>
    );
}

CardWrapper.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backButtonHref: PropTypes.string.isRequired,
    backButtonLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default CardWrapper;
