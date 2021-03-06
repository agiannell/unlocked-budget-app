import { connect } from 'react-redux';
import { useState } from 'react';
import { getUser } from '../../ducks/userReducer'
import { v4 as randomString } from 'uuid';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import './Profile.css';

const Profile = props => {
    const { user_id, first_name, last_name, profile_pic, email } = props.user,
          [ isEditing, setIsEditing ] = useState(false),
          [ updatingPic, setUpdatingPic ] = useState(false),
          [ isUploading, setIsUploading ] = useState(false),
          [ firstName, setFirstName ] = useState(first_name),
          [ lastName, setLastName ] = useState(last_name),
          [ userEmail, setUserEmail ] = useState(email),
          [ url, setUrl ] = useState('https://unlocked-default-pic.s3-us-west-1.amazonaws.com/default-profile-pic.svg');

    const updateUserInfo = e => {
        e.preventDefault()

        axios.put(`/api/user-info/${ user_id }`, { firstName, lastName, userEmail })
            .then(res => {
                props.getUser(res.data);
                setIsEditing(!isEditing);
            })
            .catch(err => console.log(err));
    };

    const updateProfilePic = () => {
        axios.put(`/api/user-pic/${ user_id }`, { profile_pic: url })
            .then(res => {
                props.getUser(res.data);
                setUpdatingPic(!updatingPic);
            })
            .catch(err => console.log(err));
    }

    const getSignedRequest = ([ file ]) => {
        setIsUploading(true);
        const fileName = `${ randomString() }-${ file.name.replace(/\s/g, '-') }`;

        axios.get('/sign-s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        })
        .then(res => {
            const { signedRequest, url } = res.data
            uploadFile(file, signedRequest, url)
        })
        .catch(err => console.log(err));
    };

    const uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type
            },
        };

        axios.put(signedRequest, file, options)
            .then(res => {
                setIsUploading(false)
                setUrl(url)
            })
            .catch(err => {
                setIsUploading(false);
                if(err.res.status === 403) {
                    alert(
                        `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${ err.stack }`
                    );
                } else {
                    alert(`ERROR: ${ err.status }\n ${ err.stack }`);
                }
            });
    };

    // console.log(url);
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
            { updatingPic
                ? (
                    <section className='pic-edit'>
                        <section className='pic-window'>
                            <section className='pic-form-header'>
                                <h2>Update Profile Pic</h2>
                                <h3 onClick={ () => setUpdatingPic(!updatingPic) }>X</h3>
                            </section>
                            <section className='pic-upload'>
                                <img src={ url } alt={ first_name } />
                                <Dropzone
                                    onDropAccepted={ getSignedRequest }
                                    accept='image/*'
                                    multiple={ false }>
                                    {({ getRootProps, getInputProps }) => (
                                        <div
                                        className='dropzone'
                                        { ...getRootProps() }>
                                            <input { ...getInputProps() } />
                                            { isUploading ? <BarLoader color='#484D6D' /> : <p>Drop fies here, or click to select files</p> }
                                        </div>
                                    )}
                                </Dropzone>
                            </section>
                            <button onClick={ updateProfilePic }>Submit</button>
                        </section>
                    </section>
                )
                : null
            }

            <ProfileHeader />
            <section className='profile'>
                <section className='user-info'>
                    <img 
                        src={ profile_pic } 
                        alt={ first_name }
                        onClick={ () => setUpdatingPic(!updatingPic) } />
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