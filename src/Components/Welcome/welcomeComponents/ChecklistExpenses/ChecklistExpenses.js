import { connect } from 'react-redux';
import './ChecklistExpenses.css'

const ChecklistExpenses = props => {
    return (
        <section>
            ChecklistExpenses
        </section>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(ChecklistExpenses);