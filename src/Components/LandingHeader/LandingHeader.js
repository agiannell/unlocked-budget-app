import { Link } from 'react-router-dom';
import './LandingHeader.css';
import logo from '../../img/logo-linear-color.svg';

const LandingHeader = props => {
    return (
        <header className='landing-header'>
                <img src={ logo } alt='logo' />
                <Link to='/signin'><button>Sign In</button></Link>
        </header>
    )
}

export default LandingHeader;