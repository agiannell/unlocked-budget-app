import { Link } from 'react-router-dom';
import LandingHeader from '../LandingHeader/LandingHeader';
import FBLogo from '../../img/fb-logo-white.svg'
import IGLogo from '../../img/ig-logo-white.svg'
import twitterLogo from '../../img/twitter-logo-white.svg'
import './Landing.css'

function Landing() {
    return (
        <section>
            <LandingHeader />
            <section className='landing-main'>
                <section className='landing-content'>
                    <section className='landing-info'>
                        <h1>Take Control of Your Finances</h1>
                        <p>With unlocked, you can take back control of your money. It's time you make your money work for you, not the other way around. Simply sign in, get your monthly plan set up, and start telling your money what to do.</p>
                        <Link to='/signin'><button id='sign-in'>Sign In</button></Link>
                    </section>
                    <section className='budget-preview'>
                        <h2>Your Transactions</h2>
                        <div className='transaction'>
                            <span>JAN<br />1</span>
                            <div className='trans-content'>
                                <span>Groceries</span>
                                <span>-$87.24</span>
                            </div>
                        </div>
                        <div className='transaction'>
                            <span>JAN<br />1</span>
                            <div className='trans-content'>
                                <span>Coffee</span>
                                <span>-$5.68</span>
                            </div>
                        </div>
                        <div className='transaction'>
                            <span>JAN<br />1</span>
                            <div className='trans-content'>
                                <span>Shell Gas</span>
                                <span>-$20.00</span>
                            </div>
                        </div>
                        <div className='transaction'>
                            <span>JAN<br />2</span>
                            <div className='trans-content'>
                                <span>Disney +</span>
                                <span>-$6.99</span>
                            </div>
                        </div>
                        <div className='transaction'>
                            <span>JAN<br />2</span>
                            <div className='trans-content'>
                                <span>In-n-Out</span>
                                <span>-$11.56</span>
                            </div>
                        </div>
                        <div className='transaction'>
                            <span>JAN<br />3</span>
                            <div className='trans-content'>
                                <span>Target</span>
                                <span>-$98.42</span>
                            </div>
                        </div>
                        <div className='transaction'>
                            <span>JAN<br />3</span>
                            <div className='trans-content'>
                                <span>Costco</span>
                                <span>-$223.78</span>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
            <footer className='landing-footer'>
                <p>&copy; 2021 GNL designs</p>
                <div className='social-icons'>
                    <img src={ FBLogo } alt='facebook logo' />
                    <img src={ IGLogo } alt='instagram logo' />
                    <img src={ twitterLogo } alt='twitter logo' />
                </div>
            </footer>
        </section>
    );
}

export default Landing;