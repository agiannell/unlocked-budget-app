import { Link } from 'react-router-dom';
import './GivingIntro.css'

const GivingIntro = props => {
    return (
        <section className='giving-intro'>
            <h1>Giving</h1>
            <p>Giving is a very important piece to your budget. It will help you to stay grounded knowing you are supporting a cause that's dear to you.</p>
            <Link to='/welcome/giving-entry'><button>Continue</button></Link>
        </section>
    )
}

export default GivingIntro;