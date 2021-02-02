import { Link } from 'react-router-dom';
import LandingHeader from '../LandingHeader/LandingHeader';

function Landing() {
    return (
        <section>
            <LandingHeader />
            <Link to='/signin'><button>Sign In</button></Link>
        </section>
    );
}

export default Landing;