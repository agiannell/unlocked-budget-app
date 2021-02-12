import { Link } from 'react-router-dom';
import './ExpensesIntro.css'

const ExpensesIntro = props => {
    return (
        <section className='intro'>
            <section className='intro-content'>
                <h1>Basic Expenses</h1>
                <p>Now, let's get started with the basics. Housing, transportaion, food, and lifestyle expenses. We'll kick it off with housing.</p>
                <Link to='/welcome/expenses-housing'><button className='continue'>Continue</button></Link>
                <div className='go-back' onClick={ props.history.goBack }>&#60; Back</div>
            </section>
        </section>
    )
}

export default ExpensesIntro;