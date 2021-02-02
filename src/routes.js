import { Switch, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import SignIn from './Components/SignIn/SignIn';
import Dash from './Components/Dash/Dash';
import Profile from './Components/Profile/Profile';

export default (
    <Switch>
        <Route exact path='/' component={ Landing } />
        <Route path='/signin' component={ SignIn } />
        <Route path='/dash' component={ Dash } />
        <Route path='/profile/:id' component={ Profile } />
    </Switch>
)