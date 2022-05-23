import React, { useEffect } from 'react'
import { LoginScreen } from '../components/auth/LoginScreen'
import {
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { Loading } from '../components/loading/Loading';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { AdminRoute } from './AdminRoute';
import { UsersScreen } from '../components/users/UsersScreen';
// import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AppRouter = () => {
  
  const dispatch = useDispatch();
  const { checking, uid, isAdmin } = useSelector( state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      dispatch( startChecking() );
    }, 1000);
  }, [dispatch])
  
  if(checking) {
    return <Loading />;
   
  }

  return (
      <Router>
          <div>
              <Switch>
                  <PrivateRoute exact path="/" component={ CalendarScreen }  isAuthenticated={ !!uid }/>
                  <PublicRoute exact path="/login" component={ LoginScreen } isAuthenticated={ !!uid } />
                  <AdminRoute exact path="/register" component={RegisterScreen} isAuthenticated={ !!uid } isAdmin={isAdmin}/>
                  <AdminRoute exact path="/users" component={UsersScreen} isAuthenticated={ !!uid } isAdmin={isAdmin}/>

                  <Redirect to="/" />
              </Switch>
          </div>
      </Router>
  )
}
