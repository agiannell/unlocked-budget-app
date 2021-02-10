import axios from 'axios';
import { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser, getUser } from '../../ducks/userReducer'
import logo from '../../img/logo-linear-color.svg'
import './DashHeader.css';

const DashHeader = props => {
    const { first_name, profile_pic, user_id } = props.user;

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
                    <Link to={ `/profile/${ user_id }` }><img src={ profile_pic } alt={ first_name } /></Link>
                    <p>{ first_name }</p>
                </div>
                <button className='sign-out' onClick={ logout }>Sign Out</button>
            </section>
        </header>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default withRouter(connect(mapStateToProps, { clearUser, getUser })(DashHeader));