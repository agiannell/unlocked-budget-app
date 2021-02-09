import axios from 'axios';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DashHeader from '../DashHeader/DashHeader'
import Groups from '../Groups/Groups';
import Transactions from '../Transactions/Transactions';
import loadingSpinner from '../../img/loading.gif'
import './Dash.css';
import AddTransaction from '../AddTransaction/AddTransaction';

const Dash = props => {
    const [ groups, setGroups ] = useState([]),
          [ loading, setLoading ] = useState(true),
          [ transactions, setTransactions ] = useState([]),
          [ editTrans, setEditTrans ] = useState(false),
          [ groupNumber, setGroupNumber ] = useState(0),
          [ loadedGroups, setLoadedGroups ] = useState(0),
          { user_id } = props.user;

    useEffect(() => {
        axios.get(`/api/groups/${ user_id }`)
            .then(res => {
                setGroups(res.data)

            })
            .catch(err => console.log(err))

        axios.get(`/api/transaction/${ user_id }`)
            .then(res => {
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
            
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }, [user_id])

    const transactionToggle = () => {
        setEditTrans(!editTrans)
    }
        
    if(!user_id) {
        props.history.push('/signin')
    }
    // console.log(props)
    return (
        <section>
            { !editTrans
                ? (null)
                : (
                    <>
                        <AddTransaction
                            user_id={ user_id }
                            toggleFn={ transactionToggle } />
                    </>
                )
            }
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
                                    name={ e.name }
                                    loadedGroups={ loadedGroups }
                                    setLoadedGroups={ setLoadedGroups } />
                                )) }
                                <button className='add-group'>Add Group</button>
                                <div className='empty'></div>
                            </section>
                            <section className='chart'>
                                <div className='trans-head'>
                                    <h2>Transactions</h2>
                                    <div className='add-new' onClick={ transactionToggle }>
                                        <p>+</p>
                                        <p>Add New</p>
                                    </div>
                                </div>
                                <div className='trans-type'>
                                    <p>Untracked</p>
                                    <p>Tracked</p>
                                </div>
                                { transactions.map(e => (
                                    <Transactions />
                                )) }
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