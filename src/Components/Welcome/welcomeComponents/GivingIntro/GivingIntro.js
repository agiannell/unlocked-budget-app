import { Link } from 'react-router-dom';
import './GivingIntro.css'

const GivingIntro = props => {
    return (
        <section className='intro'>
            <section className='intro-content'>
                <h1>Giving</h1>
                <p>Giving is a very important piece to your budget. It will help you to stay grounded knowing you are supporting a cause that's dear to you.</p>
                <Link to='/welcome/giving-entry'><button className='continue'>Continue</button></Link>
                <div className='go-back' onClick={ props.history.goBack }>&#60; Back</div>
            </section>
        </section>
    )
}

export default GivingIntro;