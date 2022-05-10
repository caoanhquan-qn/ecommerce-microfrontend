import React, { lazy, Suspense, useState } from 'react';
import Header from './components/Header';
import LoadingBar from './components/LoadingBar';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';
import { createBrowserHistory } from 'history';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));
const LazyDashboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const customHistory = createBrowserHistory();

  return (
    <Router history={customHistory}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<LoadingBar />}>
            <Switch>
              <Route path="/auth">
                <LazyAuthApp
                  onSignIn={() => {
                    setIsSignedIn(true);
                    customHistory.push('/dashboard');
                  }}
                />
              </Route>
              <Route path="/dashboard">{isSignedIn ? <LazyDashboardApp /> : <Redirect to="/" />}</Route>
              <Route path="/" component={LazyMarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
