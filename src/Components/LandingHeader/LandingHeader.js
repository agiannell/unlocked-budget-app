import './LandingHeader.css';
import logo from '../../img/logo-linear-color.svg';

const LandingHeader = props => {
    return (
        <header>
            <section className='container'>
                <img src={ logo } alt='logo' />
                <button>Sign In</button>
            </section>
        </header>
    )
}

export default LandingHeader;