import { Link } from 'react-router-dom';
import './ExpensesIntro.css'

const ExpensesIntro = props => {
    return (
        <section className='expenses-intro'>
            <h1>Basic Expenses</h1>
            <p>Now, let's get started with the basics. Housing, transportaion, food, and lifestyle expenses. We'll kick it off with housing.</p>
            <Link to='/welcome/expenses-housing'><button>Continue</button></Link>
        </section>
    )
}

export default ExpensesIntro;