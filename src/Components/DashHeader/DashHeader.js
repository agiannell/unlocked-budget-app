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
    }, [props])

    const logout = () => {
        axios.get('auth/logout')
            .then(() => {
                props.clearUser()
                props.push('/signin')
            })
            .catch(err => console.log(err));
    }

    // console.log(props)
    return (
        <header className='dash-header'>
            <img src={ logo } alt='logo' />
            <section className='dash-nav'>
                <div className='user'>
                    <Link to='profile'><img src={ props.user.profile_pic } alt={ props.user.first_name } /></Link>
                    <p>{ props.user.first_name }</p>
                </div>
                <button className='sign-out' onClick={ logout }>Sign Out</button>
            </section>
        </header>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps, { clearUser, getUser })(DashHeader);