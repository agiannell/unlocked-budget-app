import { Link } from 'react-router-dom';
import LandingHeader from '../LandingHeader/LandingHeader';
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
                        <Link to='/signin'><button>Sign In</button></Link>
                    </section>
                    <section className='budget-preview'>
                        <h2>Your Transactions</h2>
                        <div className='transaction'></div>
                    </section>
                </section>
            </section>
        </section>
    );
}

export default Landing;