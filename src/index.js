import ReactDOM from 'react-dom';
import {Page1} from './containers';


document.addEventListener('DOMContentLoaded', function () {

  // const elem = document.createElement('div');
  // elem.innerHTML = 'hello react';
  console.log('1111');
  ReactDOM.render(<Page1/>, document.querySelector('#container'));

});