import axios from 'axios';
// import { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser, getUser } from '../../ducks/userReducer';
import logo from '../../img/logo-linear-color.svg';
import icon from '../../img/icon-color.svg';
import signOut from '../../img/logout-icon.svg';
import './DashHeader.css';

const DashHeader = props => {
    const { first_name, profile_pic } = props.user;

    // useEffect(() => {
    //     axios.get('auth/get')
    //         .then(res => {
    //             props.getUser(res.data)
    //         })
    //         .catch(err => console.log(err))
    // }, [props])

    const logout = () => {
        axios.get('auth/logout')
            .then(() => {
                props.clearUser()
                props.history.push('/signin')
            })
            .catch(err => console.log(err));
    }

    // console.log(props)
    return (
        <header className='dash-header'>
            <section className='dash-head-container'>
                <img src={ logo } alt='logo' className='dash-head-logo' />
                <img src={ icon } alt='icon' className='dash-head-icon' />
                <section className='dash-nav'>
                <Link to='/profile'><div className='user'>
                        <img src={ profile_pic } alt={ first_name } />
                        <p>{ first_name }</p>
                    </div></Link>
                    <button className='sign-out' onClick={ logout }>Sign Out</button>
                    <img src={ signOut } alt='sign-out' className='dash-logout' />
                </section>
            </section>
        </header>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default withRouter(connect(mapStateToProps, { clearUser, getUser })(DashHeader));