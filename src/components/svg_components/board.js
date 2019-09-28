import React, { Component } from "react";
import Compass from './compass.js';
import Line from './line.js';
import Grid from '@material-ui/core/Grid';



export default class Board extends Component {

	constructor(props){
		super(props);
		this.state = {
			tool: 'none'
		}

		this.chooseTool = this.chooseTool.bind(this);
		this.getButton = this.getButton.bind(this);

		this.buttons = []

		for(var i=0; i< props.buttons.length; i++){
			this.buttons.push(this.getButton(props.buttons[i]))
		}
	}


	chooseTool(toolType){
		return () => {console.log("ToolType : " + toolType); this.setState({tool: toolType});}
	}

	getButton(buttonType){

	  var buttonStr;

	  switch(buttonType) {
	    case 'compass':
	      buttonStr = <button key="compass" type="button" onClick={this.chooseTool('compass')}>Compass</button>; 
	      break;
	    case 'line':
	      buttonStr = <button key="line" type="button" onClick={this.chooseTool('line')}>Line</button>; 
	      break;
	    default:
	      buttonStr = <button key="None" type="button" onClick={this.chooseTool('none')}>Pointer</button>;
  		}

  		return <Grid item>{buttonStr}</Grid>
	}


	render(){
		return (
		  <Grid container direction="column">
		  	  <Grid item container direction="row">
		  	  	{this.buttons}
		  	  </Grid>
		  	  <Grid item>
				  <svg width="100%" height="100%" viewBox="0 0 100 100">
				  	<Compass x="50"  y="50" r="10"/>
				  </svg>
			  </Grid>
		  </Grid>
		);
	}

}