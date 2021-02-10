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
          [ categories, setCategories ] = useState([]),
          [ loading, setLoading ] = useState(true),
          [ transactions, setTransactions ] = useState([]),
          [ editTrans, setEditTrans ] = useState(false),
        //   [ groupNumber, setGroupNumber ] = useState(0),
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

        axios.get(`/api/user-categories/${ user_id }`)
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.log(err));
            
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [user_id])

    useEffect(() => {
        axios.get(`/api/transaction/${ user_id }`)
        .then(res => {
            setTransactions(res.data)
        })
        .catch(err => console.log(err))
    }, [editTrans, user_id])

    const transactionToggle = () => {
        setEditTrans(!editTrans)
    }

    const addGroup = () => {
        axios.post('/api/group', { user_id, name: '' })
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
                            categories = { categories }
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
                                    user_id={ user_id }
                                    loadedGroups={ loadedGroups }
                                    setLoadedGroups={ setLoadedGroups } />
                                )) }
                                <button className='add-group'>Add Group</button>
                                <div className='empty'></div>
                            </section>
                            <section className='trans-container'>
                                <section className='transactions'>
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
                                    <div className='trans-list'>
                                        { transactions.map(e => (
                                            <Transactions
                                                key={ e.trans_id }
                                                date={ e.date }
                                                name={ e.name }
                                                amount={ e.amount }
                                                type={ e.type }
                                                transId={ e.trans_id } />
                                            )) }
                                    </div>
                                </section>
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