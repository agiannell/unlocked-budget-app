import axios from 'axios';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DashHeader from '../DashHeader/DashHeader'
import Groups from '../Groups/Groups';
import Transactions from '../Transactions/Transactions';
import loadingSpinner from '../../img/loading.gif'
import './Dash.css';

const Dash = props => {
    const [ groups, setGroups ] = useState([]),
          [ loading, setLoading ] = useState(true),
          [ transactions, setTransactions ] = useState(true),
          [ editTrans, setEditTrans ] = useState(false),
          { user_id } = props.user;

    useEffect(() => {
        axios.get(`/api/groups/${ user_id }`)
            .then(res => {
                setGroups(res.data)
            })
            .catch(err => console.log(err))
            
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }, [user_id])
        
    if(!user_id) {
        props.history.push('/signin')
    }
    console.log(props)
    return (
        <section>
            { !loading
                ? (
                    <>
                        <DashHeader />
                        <section className='dash-main'>
                            <section className='budget'>
                                { groups.map(e => (
                                    <Groups 
                                    key={ e.group_id }
                                    id={ e.group_id }
                                    name={ e.name } />
                                )) }
                                <button className='add-group'>Add Group</button>
                                <div className='empty'></div>
                            </section>
                            <section className='chart'>
                                <div className='trans-head'>
                                    <h2>Transactions</h2>
                                    <div className='add-new'>
                                        <p>+</p>
                                        <p>Add New</p>
                                    </div>
                                </div>
                                <div className='trans-type'>
                                    <p>Untracked</p>
                                    <p>Tracked</p>
                                </div>
                                <Transactions />
                            </section>
                        </section>
                    </>
                )
                : (
                    <section className='loading'>
                        <img src={ loadingSpinner } alt='loading' />
                    </section>
                )
            }
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(Dash);