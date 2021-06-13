import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Parent from './Parent';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


//reducer
function reducer(state = [], action){
  switch(action.type){
    case 'setlocation':
      return[
        ...state,
        {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        }
      ]
      default:
        return state;
  }
}

const store = createStore(reducer);
export default store;

ReactDOM.render(
  <Provider store={store}>
    <Parent></Parent>
  </Provider>
  ,
  document.getElementById('root')
);


