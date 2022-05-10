import React, { lazy, Suspense, useState } from 'react';
import Header from './components/Header';
import LoadingBar from './components/LoadingBar';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));
const LazyDashboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<LoadingBar />}>
            <Switch>
              <Route path="/auth">
                <LazyAuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">{isSignedIn ? <LazyDashboardApp /> : <Redirect to="/" />}</Route>
              <Route path="/" component={LazyMarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
