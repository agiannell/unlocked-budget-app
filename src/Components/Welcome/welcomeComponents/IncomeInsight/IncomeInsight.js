import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './IncomeInsight.css'

const IncomeInsight = props => {
    const groupName = 'income',
          [ sum, setSum ] = useState(0);

    useEffect(() => {
        const { user_id } = props.user;

        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
            .then(res => {
                setSum(res.data[0].sum)
            })
            .catch(err => console.log(err));
    }, [props.user, groupName])

    const { first_name } = props.user
    // console.log(props);
    return (
        <section>
            <h1>${ sum }!</h1>
            <p>Nice job, { first_name }! Now let's make a plan to tell this money what to do.</p>
            <Link to='/welcome/expenses-intro'><button>Continue</button></Link>
        </section>
    )
}

const mapStateToProps = reduxState => ({user: reduxState.userReducer.user})

export default connect(mapStateToProps)(IncomeInsight);