import { connect } from 'react-redux';
import { useState } from 'react';
import { getUser } from '../../ducks/userReducer'
import axios from 'axios';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import './Profile.css';

const Profile = props => {
    const { user_id, first_name, last_name, profile_pic, email } = props.user,
          [ isEditing, setIsEditing ] = useState(false),
          [ firstName, setFirstName ] = useState(first_name),
          [ lastName, setLastName ] = useState(last_name),
          [ userEmail, setUserEmail ] = useState(email);

    const updateUserInfo = (e) => {
        e.preventDefault()

        axios.put(`/api/update-user/${ user_id }`, { firstName, lastName, userEmail })
            .then(res => {
                console.log(res.data);
                props.getUser(res.data);
                setIsEditing(!isEditing);
            })
            .catch(err => console.log(err));
    }

    console.log(isEditing);
    return (
        <section>
            { isEditing
                ? (
                    <section className='profile-edit'>
                        <form>
                            <section className='profile-form-header'>
                                <h2>Edit Profile</h2>
                                <h3 onClick={ () => setIsEditing(!isEditing) }>X</h3>
                            </section>
                            <section className='input-container'>
                                <section className='name-input'>
                                    <input
                                        type='text'
                                        placeholder='First Name'
                                        value={ firstName }
                                        onChange={ e => setFirstName(e.target.value) }
                                        />
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        value={ lastName }
                                        onChange={ e => setLastName(e.target.value) } />
                                </section>
                                <input 
                                    type='email'
                                    placeholder='Email'
                                    value={ userEmail }
                                    onChange={ e => setUserEmail(e.target.value) } />
                            </section>
                            <button onClick={ e => updateUserInfo(e) }>Submit</button>
                        </form>
                    </section>
                )
                : null
            }

            <ProfileHeader />
            <section className='profile'>
                <section className='user-info'>
                    <img src={ profile_pic } alt={ first_name } />
                    <h2>{ first_name } { last_name }</h2>
                    <h2 className='email'>Email: { email }</h2>
                </section>
                <button id='edit' onClick={ () => setIsEditing(!isEditing) }>Edit Profile</button>
            </section>
        </section>
    )
}

const mapStateToProps = reduxState => ({ user: reduxState.userReducer.user })

export default connect(mapStateToProps, { getUser })(Profile);