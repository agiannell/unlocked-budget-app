import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser } from '../../ducks/userReducer';
import axios from 'axios';
import logo from '../../img/logo-linear-color.svg'
import icon from '../../img/icon-color.svg'
import signOut from '../../img/logout-icon.svg';
import './ProfileHeader.css'

const ProfileHeader = props => {
    const { clearUser } = props

    const logout = () => {
        axios.get('auth/logout')
            .then(() => {
                clearUser()
                props.history.push('/signin')
            })
            .catch(err => console.log(err));
    }

    return (
        <header className='profile-header'>
            <section className='profile-head-container'>
                <img src={ logo } alt='logo' className='profile-head-logo' />
                <img src={ icon } alt='icon' className='profile-head-icon' />
                <section className='profile-nav'>
                    <Link to='/dash'><button className='to-budget'>Back to Budget</button></Link>
                    <Link to='/dash'><button className='to-budget-mobile'>Back to Budget</button></Link>
                    <button className='sign-out' onClick={ logout }>Sign Out</button>
                    <img src={ signOut } alt='sign-out' onClick={ logout } className='profile-logout' />
                </section>
            </section>
        </header>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default withRouter(connect(mapStateToProps, { clearUser })(ProfileHeader));