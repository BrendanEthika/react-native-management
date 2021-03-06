import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from '@reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

export default function configureStore () {
  const enhancer = compose(
    applyMiddleware(
      loggerMiddleware,
      ReduxThunk,
    ),
  );
  const store = createStore(reducers, enhancer);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
