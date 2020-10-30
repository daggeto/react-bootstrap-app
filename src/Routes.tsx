import React from "react";
import { BrowserRouter, Switch, Route, StaticRouter } from 'react-router-dom';
import {Home} from './sections/Home';
import {Registration} from './sections/Registration';
import {Login} from './sections/Login';
import {Header} from './foundation/components/Header';

interface Props {
  location?: string;
}

export const Routes = ({location}: Props) => {
  const routes = (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </>
  );

  if (location) {
    console.log('Static: ', location);
   return (
     <StaticRouter location={location} context={{}}>
       {routes}
     </StaticRouter>
   );
  } else {
    return <BrowserRouter>{routes}</BrowserRouter>;
  }
}
