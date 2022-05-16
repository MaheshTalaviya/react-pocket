import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LOGIN, HOME, DASHBOARD, TRANSTION, USERS, MERCHANTS, APPROVALS, CHANGEEMAIL, ACCOUNTSETTING, ADMINMANAGMENT, CHANGEEMAILSUCCESS, CHANGEPASSWORD, RESETPASSWORD, CHANGEPASSWORDSUCCESS, MERCHANTSDETAILS, ADCAMPAIGNS, USERDETAILS, USERKYCMANAGMENT, DEFAULTFEESSETUP, CATEGORYSETUP, INVITATION } from './routeConstants'
import Login from './../pages/Login/Login'
import Dashboard from './../pages/Dashboard/Dashboard'
import Transtion from '../pages/Transactions/Transactions'
import Users from './../pages/Users/User'
import Merchants from './../pages/Merchants/Merchants'
import Approvals from './../pages/Approvals/Approvals'
import AccountSetting from './../pages/Setting/AccountSetting/AccountSetting'
import AdminManagment from './../pages/Setting/AdminManagment/AdminManagment'
import ChangeEmail from './../pages/Setting/AccountSetting/ChangeEmail'
import ChangeEmailSucces from './../pages/Setting/AccountSetting/ChangeEmailSuccess'
import ChangePassword from './../pages/Setting/AccountSetting/ChangePassword'
import ResetPassword from '../pages/Setting/AccountSetting/ResetPassword'
import PasswordChangeSuccess from '../pages/Setting/AccountSetting/PasswordChangeSuccess'
import MerchantDetails from '../pages/Merchants/MerchantDetails'
import AdCampaigns from '../pages/Merchants/AdCampaigns'
import UserDetails from '../pages/Users/UserDetails'
import UserKycManagment from '../pages/Users/UserKycManagment'
import UsersDetails from '../pages/Users/UserDetails'
import DefaultFeesSetup from '../pages/Setting/DefaultFeesSetup/DefaultFeesSetup'
import CategorySetup from '../pages/Setting/CategorySetting/CategorySetup'
import PrivateRoute from './privatRoute';
import Contact from '../pages/Contact/index'
import Invetation from '../pages/Invitation/Invetation'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path={HOME} component={Login} />
      <Route exact path={LOGIN} component={Login} />
      <Route exact path='/contact-us' component={Contact} /> 
      <PrivateRoute exact path={DASHBOARD} component={Dashboard} />
      <PrivateRoute exact path={TRANSTION} component={Transtion} />
      <PrivateRoute exact path={USERS} component={Users} />
      <PrivateRoute exact path={MERCHANTS} component={Merchants} />
      <PrivateRoute exact path={APPROVALS} component={Approvals} />
      <PrivateRoute exact path={ACCOUNTSETTING} component={AccountSetting} />
      <PrivateRoute exact path={ADMINMANAGMENT} component={AdminManagment} />
      <PrivateRoute exact path={CHANGEEMAIL} component={ChangeEmail} />
      <PrivateRoute exact path={CHANGEEMAILSUCCESS} component={ChangeEmailSucces} />
      <PrivateRoute exact path={CHANGEPASSWORD} component={ChangePassword} />
      <PrivateRoute exact path={RESETPASSWORD} component={ResetPassword} />
      <PrivateRoute exact path={CHANGEPASSWORDSUCCESS} component={PasswordChangeSuccess} />
      <PrivateRoute exact path={MERCHANTSDETAILS} component={MerchantDetails} />
      <PrivateRoute exact path={ADCAMPAIGNS} component={AdCampaigns} />
      <PrivateRoute exact path={USERDETAILS} component={UserDetails} />
      <PrivateRoute exact path={USERKYCMANAGMENT} component={UserKycManagment} />
      <PrivateRoute exact path={DEFAULTFEESSETUP} component={DefaultFeesSetup} />
      <PrivateRoute exact path={CATEGORYSETUP} component={CategorySetup} />
      <PrivateRoute exact path={INVITATION} component={Invetation} />
    </BrowserRouter>
  )
}
export default Routes;