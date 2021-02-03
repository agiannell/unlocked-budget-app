import { Link } from 'react-router-dom';
import './LandingHeader.css';
import logo from '../../img/logo-linear-color.svg';

const LandingHeader = props => {
    return (
        <header>
            <section className='container'>
                <img src={ logo } alt='logo' />
                <Link to='/signin'><button>Sign In</button></Link>
            </section>
        </header>
    )
}

export default LandingHeader;