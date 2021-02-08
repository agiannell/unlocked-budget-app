import { Switch, Route } from 'react-router-dom';
import Hello from './welcomeComponents/Hello/Hello';
import IncomeIntro from './welcomeComponents/IncomeIntro/IncomeIntro';
import IncomeEntry from './welcomeComponents/IncomeEntry/IncomeEntry';
import IncomeInsight from './welcomeComponents/IncomeInsight/IncomeInsight';
import ExpensesIntro from './welcomeComponents/ExpensesIntro/ExpensesIntro';
import ExpensesHousing from './welcomeComponents/ExpensesHousing/ExpensesHousing';
import ExpensesTransportation from './welcomeComponents/ExpensesTransportation/ExpensesTransportation';
import ExpensesFood from './welcomeComponents/ExpensesFood/ExpensesFood';
import ExpensesLifestyle from './welcomeComponents/ExpensesLifestyle/ExpensesLifestyle';
import ExpensesInsight from './welcomeComponents/ExpensesInsight/ExpensesInsight';
import GivingIntro from './welcomeComponents/GivingIntro/GivingIntro';
import GivingEntry from './welcomeComponents/GivingEntry/GivingEntry';
import GivingInsight from './welcomeComponents/GivingInsight/GivingInsight';
import DebtIntro from './welcomeComponents/DebtIntro/DebtIntro';
import DebtEntry from './welcomeComponents/DebtEntry/DebtEntry';
import DebtInsight from './welcomeComponents/DebtInsight/DebtInsight';
import FinalInsight from './welcomeComponents/FinalInsight/FinalInsight';


export default (
    <Switch>
        <Route exact path='/welcome/hello' component={ Hello } />
        <Route path='/welcome/income-intro' component={ IncomeIntro } />
        <Route path='/welcome/income-entry' component={ IncomeEntry } />
        <Route path='/welcome/income-insight' component={ IncomeInsight } />
        <Route path='/welcome/expenses-intro' component={ ExpensesIntro } />
        <Route path='/welcome/expenses-housing' component={ ExpensesHousing } />
        <Route path='/welcome/expenses-transportation' component={ ExpensesTransportation } />
        <Route path='/welcome/expenses-food' component={ ExpensesFood } />
        <Route path='/welcome/expenses-lifestyle' component={ ExpensesLifestyle } />
        <Route path='/welcome/expenses-insight' component={ ExpensesInsight } />
        <Route path='/welcome/giving-intro' component={ GivingIntro } />
        <Route path='/welcome/giving-entry' component={ GivingEntry } />
        <Route path='/welcome/giving-insight' component={ GivingInsight } />
        <Route path='/welcome/debt-intro' component={ DebtIntro } />
        <Route path='/welcome/debt-entry' component={ DebtEntry } />
        <Route path='/welcome/debt-insight' component={ DebtInsight } />
        <Route path='/welcome/final-insight' component={ FinalInsight } />
    </Switch>
)