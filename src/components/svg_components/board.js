import React, { Component } from "react";
import Compass from './compass.js';
import Line from './line.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//import uuidv4 from './../../utils/math.js';



export default class Board extends Component {

	constructor(props){
		super(props);

		this.state = {
			tool: 'none',
			components: this.buildComponents(props.initialComponents)
		}

		this.chooseTool = this.chooseTool.bind(this);
		this.getButton = this.getButton.bind(this);

		this.buttons = []

		for(var i=0; i< props.buttons.length; i++){
			this.buttons.push(this.getButton(props.buttons[i]))
		}
	}

    uuidv4() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  })
	}

	buildComponents(intialComponents){
		return intialComponents.map(intialComponent => {
			if (intialComponent.type === "line"){
				return (<Line id={intialComponent.id} x1={intialComponent.x1} y1={intialComponent.y1} x2={intialComponent.x2} y2={intialComponent.y2} />)
			}
		})
	}


    componentDidMount(){

        var svg = d3.select(this.svg);
 		var reference = this;

        svg.on("click", createComponent)

        function createComponent(){

          var coords = d3.mouse(this);

          var x = String(coords[0]);
          var y = String(coords[1]);
          var r = "8";
    	  var tool = reference.state.tool;
    	  var components = reference.state.components;

          if (tool === "compass"){
          	console.log("Adding compass")
          	reference.setState({components: components.concat([(<Compass id={reference.uuidv4()} x={x} y={y} r={r}/>)])})
          }
          if (tool === "line"){
          	console.log("Adding Line")
          	reference.setState({components: components.concat([(<Line id={reference.uuidv4()} x1={x} y1={y} x2={x} y2={y} />)])})
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
	      buttonStr = <Button color="secondary" variant="contained" key="compass" onClick={this.chooseTool('compass')}>Compass</Button>; 
	      break;
	    case 'line':
	      buttonStr = <Button color="secondary" variant="contained" key="line" onClick={this.chooseTool('line')}>Line</Button>; 
	      break;
	    default:
	      buttonStr = <Button  color="secondary" variant="contained" key="None" onClick={this.chooseTool('none')}>Pointer</Button>;
  		}

  		return <Grid item>{buttonStr}</Grid>
	}


	render(){

		return (
		  <Grid item container direction="row" spacing={2} justify="center">
		  	<Grid item xs={10} style={this.props.boardStyle}>
				<svg ref={svg => this.svg = svg} height="100%" width="100%">
			        <rect width="100%" height="100%" fill="#dedede"/>
				  	{this.state.components}
				</svg>
    		</Grid>
   	  	    <Grid item xs={2} height="100%" container direction="column" justify="center" spacing={2} >
	  	  	  {this.buttons}
	  	    </Grid>
		  </Grid>
		);
	}

}