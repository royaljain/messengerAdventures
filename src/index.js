import React, { Component } from "react";
import ReactDOM from "react-dom";
import DrawParallelLine from "./activities/draw_parallel_line/draw_parallel_line.js";
import Container from '@material-ui/core/Container';
import { Provider } from 'react-redux';
import store from './store/create_store.js'

class App extends Component {

  render(){
    return (
	  <Provider store={store}>
		<Container maxWidth="md" style={{"marginTop": "25px"}}>
	    	<DrawParallelLine />
      	</Container>
	  </Provider>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
