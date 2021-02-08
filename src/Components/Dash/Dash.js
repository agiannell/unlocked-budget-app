import axios from 'axios';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DashHeader from '../DashHeader/DashHeader'
import Groups from '../Groups/Groups';
import loadingSpinner from '../../img/loading.gif'
import './Dash.css';

const Dash = props => {
    const [ groups, setGroups ] = useState([]),
          [ loading, setLoading ] = useState(true),
          [ transactions, setTransactions ] = useState(true),
          [ editTrans, setEditTrans ] = useState(false),
          { user_id } = props.user;

    useEffect(() => {
        const getGroups = () => {
            axios.get(`/api/groups/${ user_id }`)
                .then(res => {
                    setGroups(res.data)
                    setLoading(false);
                })
                .catch(err => console.log(err))
        };

        if(!user_id) {
            props.history.push('/signin')
        }
        getGroups();
    }, [user_id, props.history])

    // console.log(props)
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
                                Chart stuff
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