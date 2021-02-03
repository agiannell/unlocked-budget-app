import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser, getUser } from '../../ducks/userReducer'
import logo from '../../img/logo-linear-color.svg'
import './DashHeader.css';

const DashHeader = props => {
    useEffect(() => {
        axios.get('auth/get')
            .then(res => {
                props.getUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    
    return (
        <header className='dash-header'>
            <img src={ logo } alt='logo' />
            <Link to='profile'><img className='profile-pic' src={ props.user.profile_pic } alt={ props.user.first_name } /></Link>
            <p>{ props.user.first_name }</p>
            <button className='sign-out'>Sign Out</button>
        </header>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps, { clearUser, getUser })(DashHeader);