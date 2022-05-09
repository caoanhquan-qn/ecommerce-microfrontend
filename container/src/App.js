import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import LoadingBar from './components/LoadingBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Suspense fallback={<LoadingBar />}>
            <Switch>
              <Route path="/auth" component={LazyAuthApp} />
              <Route path="/" component={LazyMarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
