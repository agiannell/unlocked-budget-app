import { Link } from 'react-router-dom';
import logo from '../../img/logo-stacked-color.svg'
import './SignInHeader.css';

const SignInHeader = props => {
    return (
        <header className='sign-in-header'>
            <Link to='/'><img src={ logo } alt='logo' /></Link>
        </header>
    )
}

export default SignInHeader;