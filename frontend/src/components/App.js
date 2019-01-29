import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/index'

import Grid from '@material-ui/core/Grid';

import Calc from './calc/Calc'
import History from './history/History'

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));


import style from '../css/App.styl';
//test
const App = () => {
  return (
    <Provider store={store} history={history}>
      <section className={style.container}>
        <Grid
          container
        >
          <Grid
            item
            sm={6}
            xs={12}
          >
            <Calc />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <History />
          </Grid>
        </Grid>
      </section>
    </Provider>
  )
}

export default App;