import React, { Component } from "react";
import Compass from './compass.js';
import Line from './line.js';
import Grid from '@material-ui/core/Grid';



export default class Board extends Component {

	constructor(props){
		super(props);
		this.state = {
			tool: 'none',
			components: []
		}

		this.chooseTool = this.chooseTool.bind(this);
		this.getButton = this.getButton.bind(this);

		this.buttons = []

		for(var i=0; i< props.buttons.length; i++){
			this.buttons.push(this.getButton(props.buttons[i]))
		}
	}

    componentDidMount(){

        var svg = d3.select(this.svg);
 		var reference = this;


        svg.on("click", createComponent)

        function createComponent(){

          var coords = d3.mouse(this);

          var x = String(coords[0]);
          var y = String(coords[1]);
          var r = "2";
    	  var tool = reference.state.tool;
    	  var components = reference.state.components;

          if (tool === "compass"){
          	console.log("Adding compass")
          	reference.setState({components: components.concat([(<Compass x={x} y={y} r={r}/>)])})
          }
          if (tool === "line"){
          	console.log("Adding Line")
          	reference.setState({components: components.concat([(<Line x1={x} y1={y} x2={x} y2={y} />)])})
          }
        }
    }


	chooseTool(toolType){
		var reference = this;
		return () => {reference.setState({tool: toolType});}
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
				  <svg ref={svg => this.svg = svg} width="100%" height="100%" viewBox="0 0 100 100">
				  	{this.state.components}
				  </svg>
			  </Grid>
		  </Grid>
		);
	}

}