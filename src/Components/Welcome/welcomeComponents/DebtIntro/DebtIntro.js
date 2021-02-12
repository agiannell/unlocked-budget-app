import { Link } from 'react-router-dom';
import './DebtIntro.css'

const DebtIntro = props => {
    return (
        <section className='intro'>
            <section className='intro-content'>
                <h1>Debt</h1>
                <p>Debt is the largest roadblock to truly unlocking your future. Let's get your debt paid off! Start by listing every debt in your budget.</p>
                <Link to='/welcome/debt-entry'><button className='continue'>Continue</button></Link>
                <div className='go-back' onClick={ props.history.goBack }>&#60; Back</div>
            </section>
        </section>
    )
}

export default DebtIntro;