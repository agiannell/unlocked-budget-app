import { Link } from 'react-router-dom';
import './IncomeInsight.css'

const IncomeInsight = props => {
    return (
        <section>
            <h1>Income</h1>
            <p>Your income is your most powerful tool to achieving your unlocked financial goals. The foundation of your budget begins with your income.</p>
            <Link to='/welcome/checklist-expenses'><button>Continue</button></Link>
        </section>
    )
}

export default IncomeInsight;