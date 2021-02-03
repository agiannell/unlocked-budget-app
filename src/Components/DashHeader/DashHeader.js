import { Link } from 'react-router-dom';
import logo from '../../img/logo-linear-color.svg'
import './DashHeader.css';

const DashHeader = props => {
    return (
        <header className='dash-header'>
            <img src={ logo } alt='logo' />
            {/* <img className='profile-pic' src={  } alt={  } /> */}
            <button className='sign-out'>Sign Out</button>
        </header>
    )
}

export default DashHeader;