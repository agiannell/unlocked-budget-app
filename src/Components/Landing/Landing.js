import { Link } from 'react-router-dom';

function Landing() {
    return (
        <section>
            <Link to='/signin'><button>Sign In</button></Link>
        </section>
    );
}

export default Landing;