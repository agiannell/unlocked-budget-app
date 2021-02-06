import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './DebtInsight.css'

const DebtInsight = props => {
    const groupName = 'debt',
          [ sum, setSum ] = useState(0);

    useEffect(() => {
        const { user_id } = props.user;

        axios.get(`/api/category-sum/${ user_id }/${ groupName }`)
            .then(res => {
                setSum(res.data[0].sum)
            })
            .catch(err => console.log(err));
    }, [props.user, groupName])

    return (
        <section>
            <p>Debt is stealing ${ sum } of you hard-earned money!</p>
            <Link to='/welcome/final-insight'><button>Continue</button></Link>
        </section>
    )
}

const mapStateToProps = reduxState => ({user: reduxState.userReducer.user})

export default connect(mapStateToProps)(DebtInsight);