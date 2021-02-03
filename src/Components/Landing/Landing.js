import { Link } from 'react-router-dom';
import LandingHeader from '../LandingHeader/LandingHeader';
import './Landing.css'

function Landing() {
    return (
        <section>
            <LandingHeader />
            <section className='landing-main'>
                <p>you need unlocked</p>
                <Link to='/signin'><button>Sign In</button></Link>
            </section>
        </section>
    );
}

export default Landing;