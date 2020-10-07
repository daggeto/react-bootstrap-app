import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {Home} from './sections/Home';
import {Registration} from './sections/Registration';
import {Login} from './sections/Login';
import {Header} from './foundation/components/Header';

export const Routes: React.FunctionComponent =  () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
