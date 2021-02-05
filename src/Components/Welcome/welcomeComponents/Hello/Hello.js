import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Hello.css';

const Hello = props => {
    return (
        <section className='hello'>
            <h1>Hi { props.user.first_name }! Welcome to unlocked!</h1>
            <p>Let's get started on your path to unlock your financial potential. We'll get started with figuring out your income. You're well on your way!</p>
            <Link to='/welcome/income-intro'><button>Continue</button></Link>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(Hello);