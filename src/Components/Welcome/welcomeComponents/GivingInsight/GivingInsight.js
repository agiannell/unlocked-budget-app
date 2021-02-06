import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './GivingInsight.css'

const GivingInsight = props => {
    const groupName = 'giving',
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
            <p>Awesome! You're giving ${ sum } this month!</p>
            <Link to='/welcome/debt-intro'><button>Continue</button></Link>
        </section>
    )
}

const mapStateToProps = reduxState => ({user: reduxState.userReducer.user})

export default connect(mapStateToProps)(GivingInsight);