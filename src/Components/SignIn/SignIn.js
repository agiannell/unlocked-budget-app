import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/userReducer';
import SignInHeader from '../SignInHeader/SignInHeader';
import './SignIn.css';

const SignIn = props => {
    const [ email, setEmail ] = useState(''),
          [ password, setPassword ] = useState(''),
          [ firstName, setFirstName ] = useState(''),
          [ lastName, setLastName ] = useState(''),
          [ verPassword, setVerPassword ] = useState(''),
          [ registerView, setRegisterView ] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault()
        
        if(password && password === verPassword) {
            axios.post('/auth/register', { firstName, lastName, email, password })
            .then(res => {
                props.getUser(res.data)
                props.history.push('/welcome/hello')
            })
            .catch(err => console.log(err));
        } else {
            alert("Passwords don't match");
        }
    }
    
    const handleLogin = (e) => {
        e.preventDefault()

        axios.post('/auth/login', { email, password })
            .then(res => {
                props.getUser(res.data)
                props.history.push('/dash')
            })
            .catch(err => console.log(err));
    }

    return (
        <section>
            <SignInHeader />
            <section className='sign-in-main'>
                { !registerView
                    ? (
                        <>
                            <form>
                                <input 
                                    value={ email } 
                                    placeholder='Email' 
                                    onChange={ e => setEmail(e.target.value) } />
                                <input 
                                    value={ password } 
                                    placeholder='Password' 
                                    type='password'
                                    onChange={ e => setPassword(e.target.value) } />
                                <button onClick={ e => handleLogin(e) }>Sign In</button>
                            </form>
                            <p>Don't have an account? <span onClick={() => setRegisterView(!registerView) }>Register Here</span></p>
                        </>
                    )
                    : (
                        <>
                            <form>
                                <input  
                                    value={ firstName }
                                    placeholder='First Name'
                                    onChange={ e => setFirstName(e.target.value) } />
                                <input  
                                    value={ lastName }
                                    placeholder='Last Name'
                                    onChange={ e => setLastName(e.target.value) } />
                                <input  
                                    value={ email }
                                    placeholder='Email'
                                    onChange={ e => setEmail(e.target.value) } />
                                <input  
                                    value={ password }
                                    placeholder='Password'
                                    type='password'
                                    onChange={ e => setPassword(e.target.value) } />
                                <input  
                                    value={ verPassword }
                                    placeholder='Verify Password'
                                    type='password'
                                    onChange={ e => setVerPassword(e.target.value) } />
                                <button onClick={ e => handleRegister(e) }>Create Account</button>
                            </form>
                            <p>Already have an account? <span onClick={() => setRegisterView(!registerView) }>Sign In</span></p>
                        </>
                    ) }
                </section>
        </section>
    )
}

export default connect(null, { getUser })(SignIn);