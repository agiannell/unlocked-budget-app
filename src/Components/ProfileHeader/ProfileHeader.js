import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser } from '../../ducks/userReducer';
import axios from 'axios';
import logo from '../../img/logo-linear-color.svg'
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
        <header className='dash-header'>
            <img src={ logo } alt='logo' />
            <section className='profile-nav'>
                <Link to='/dash'><button className='to-budget'>Back to Budget</button></Link>
                <button className='sign-out' onClick={ logout }>Sign Out</button>
            </section>
        </header>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default withRouter(connect(mapStateToProps, { clearUser })(ProfileHeader));