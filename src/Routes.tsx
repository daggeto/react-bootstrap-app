import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {Home} from './sections/Home';
import {Registration} from './sections/Registration';
import {Login} from './sections/Login';

export const Routes: React.FunctionComponent =  () => {
  return (
    <BrowserRouter>
      <div className='Nav'>
        <div className='Link'>
          <Link to='/'>Home</Link>
        </div>
        <div className='Link'>
          <Link to='/registration'>Register</Link>
        </div>
        <div className='Link'>
          <Link to='/login'>Login</Link>
        </div>
      </div>

      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
