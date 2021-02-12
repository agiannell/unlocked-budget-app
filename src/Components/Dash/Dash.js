import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import DashHeader from '../DashHeader/DashHeader'
import Groups from '../Groups/Groups';
import Transactions from '../Transactions/Transactions';
import { SyncLoader } from 'react-spinners'
import AddTransaction from '../AddTransaction/AddTransaction';
import './Dash.css';

const Dash = props => {
    const [ groups, setGroups ] = useState([]),
          [ categories, setCategories ] = useState([]),
          [ loading, setLoading ] = useState(true),
          [ trackedTransactions, setTrackedTransactions ] = useState([]),
          [ untrackedTransactions, setUntrackedTransactions ] = useState([]),
          [ editTrans, setEditTrans ] = useState(false),
        //   [ groupNumber, setGroupNumber ] = useState(0),
          [ loadedGroups, setLoadedGroups ] = useState(0),
          [ showTracked, setShowTracked ] = useState(false),
          { user_id } = props.user;

    const getGroups = useCallback(() => {
        axios.get(`/api/groups/${ user_id }`)
        .then(res => {
            setGroups(res.data)
        })
        .catch(err => console.log(err))
    }, [user_id])

    const getTrackedTrans = useCallback(() => {
        axios.get(`/api/transactions-tracked/${ user_id }`)
        .then(res => {
            setTrackedTransactions(res.data)
        })
        .catch(err => console.log(err))
    }, [user_id])

    const getUntrackedTrans = useCallback(() => {
        axios.get(`/api/transactions-untracked/${ user_id }`)
        .then(res => {
            setUntrackedTransactions(res.data)
        })
        .catch(err => console.log(err))
    }, [user_id])

    useEffect(() => {
        getGroups()
        getTrackedTrans()
        getUntrackedTrans()

        axios.get(`/api/user-categories/${ user_id }`)
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.log(err));
            
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [user_id, getGroups, getTrackedTrans, getUntrackedTrans])

    // useEffect(() => {
    //     axios.get(`/api/transactions/${ user_id }`)
    //     .then(res => {
    //         setTransactions(res.data)
    //     })
    //     .catch(err => console.log(err))
    // }, [editTrans, user_id])

    const transactionToggle = () => {
        setEditTrans(!editTrans)
    }

    const addGroup = () => {
        axios.post('/api/group', { user_id, groupName: 'New Group' })
        .then(res => {
            setGroups(res.data)
        })
        .catch(err => console.log(err))
    }
        
    if(!user_id) {
        props.history.push('/signin')
    }

    // console.log(user_id);
    // console.log(groups);
    // console.log(showTracked);
    console.log(trackedTransactions);
    // console.log(untrackedTransactions);
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
                                { groups?.map(e => (
                                    <Groups 
                                    key={ e.group_id }
                                    id={ e.group_id }
                                    name={ e.name }
                                    user_id={ user_id }
                                    getGroupsFn={ getGroups }
                                    loadedGroups={ loadedGroups }
                                    setLoadedGroups={ setLoadedGroups } />
                                )) }
                                <button className='add-group' onClick={ addGroup }>Add Group</button>
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
                                        <p 
                                        onClick={ () => setShowTracked(false) }
                                        className={ showTracked ? null : 'highlight-red' }>Untracked</p>
                                        <p 
                                        onClick={ () => setShowTracked(true) }
                                        className={ !showTracked ? null : 'highlight-blue' }>Tracked</p>
                                    </div>
                                    <div className='trans-list'>
                                        { !showTracked
                                            ? (
                                                <section>
                                                    { untrackedTransactions.map(e => (
                                                        <Transactions
                                                        key={ e.trans_id }
                                                        date={ e.date }
                                                        name={ e.name }
                                                        amount={ e.amount }
                                                        type={ e.type }
                                                        transId={ e.trans_id }
                                                        notes={ e.notes }
                                                        categories={ categories } />
                                                        )) }
                                                </section>
                                            ) 
                                            : (
                                                <section>
                                                    { trackedTransactions.map(e => (
                                                        <Transactions
                                                        key={ e.trans_id }
                                                        date={ e.date }
                                                        name={ e.name }
                                                        amount={ e.amount }
                                                        type={ e.type }
                                                        transId={ e.trans_id }
                                                        notes={ e.notes }
                                                        categories={ categories } />
                                                        )) }
                                                </section>
                                            ) 
                                        }
                                    </div>
                                </section>
                            </section>
                        </section>
                    </>
                )
                : (
                    <section className='loading'>
                        <SyncLoader
                            color='#fff'
                            size='30px' />
                    </section>
                )
            }
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps)(Dash);