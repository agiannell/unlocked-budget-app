import { Link } from 'react-router-dom';
import './DebtIntro.css'

const DebtIntro = props => {
    return (
        <section className='debt-intro'>
            <h1>Debt</h1>
            <p>Debt is the largest roadblock to truly unlocking your future. Let's get your debt paid off! Start by listing every debt in your budget.</p>
            <Link to='/welcome/debt-entry'><button>Continue</button></Link>
        </section>
    )
}

export default DebtIntro;