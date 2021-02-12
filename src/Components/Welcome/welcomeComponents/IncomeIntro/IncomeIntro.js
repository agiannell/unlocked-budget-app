import { Link } from 'react-router-dom';
import './IncomeIntro.css';

const IncomeIntro = props => {
    return (
        <section className='intro'>
            <section className='intro-content'>
                <h1>Income</h1>
                <p>Your income is your most powerful tool to achieving your unlocked financial goals. The foundation of your budget begins with your income.</p>
                <Link to='/welcome/income-entry'><button className='continue'>Continue</button></Link>
            </section>
        </section>
    )
}

export default IncomeIntro;