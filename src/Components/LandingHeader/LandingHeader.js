import { Link } from 'react-router-dom';
import './LandingHeader.css';
import logo from '../../img/logo-linear-color.svg';
import icon from '../../img/icon-color.svg';

const LandingHeader = props => {
    return (
        <header className='landing-header'>
            <section className='landing-container'>
                <img src={ logo } alt='logo' className='logo' />
                <img src={ icon } alt='icon' className='icon' />
                <Link to='/signin'><button id='header-sign-in'>Sign In</button></Link>
            </section>
        </header>
    )
}

export default LandingHeader;