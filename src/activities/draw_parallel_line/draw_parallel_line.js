import React, { Component } from "react";
import BaseActivity from './../base_activity.js';
import Board from './../../components/svg_components/board.js';
import ActivityHeading from './../../components/typography_components/activity_heading.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {ADD_COMPASS, ADD_LINE} from './../../actions/action_types.js';
import { connect } from 'react-redux';


var style = {
	board:{
      minHeight: '500px',
      maxHeight: '500px',

    }
}

var initialLine = {id: "initialLine", type: "line", x1: 50, y1: 400, x2: 500, y2:400};

class DrawParallelLine extends BaseActivity {

	constructor(props){
		super(props);
		this.activity_heading = "In this activity you have to draw a line parallel to the existing one using a compass and a scale";
		this.buttons = ['compass', 'line', 'none'];
		this.solved_message = "Congratulations on Acing this level !!"
	}


	render(){
	 	
		var initialComponents = [initialLine]; 

	 	return (
	 		<Grid container direction="column" spacing={4}>
	 			<Grid item container justify="center" direction="row">
	 				<Grid item xs={8}>
 						<ActivityHeading text={this.activity_heading}/>
	 				</Grid>
	 			</Grid>
	 			<Grid item>
		 			<Paper>
			 			<Board initialComponents={initialComponents} buttons={this.buttons} boardStyle={style.board}/>
		 			</Paper>
	 			</Grid>
	 			{
	 				this.props.solved?
		 				<Grid item container justify="center" direction="row">
		 					<Grid item xs={6}>
	 							<ActivityHeading text={this.solved_message}/>
		 					</Grid>
		 				</Grid>:
		 				<div></div>
	 			}
	 		</Grid>	
	 	);
	}
}


function mapStateToProps(state) {
  console.log(state);


  const components = state.svg_components;
  var initialLine = {id: "initialLine", type: "line", x1: 50, y1: 400, x2: 500, y2:400};
  
  var lines = [];

  for(var key in components){
  	if (components[key].type == ADD_LINE){
  		lines.push(components[key])
  	}
  }

  var threshold = 3;

  for (var i=0; i < lines.length; i++){
  	var line = lines[i];

  	if ((Math.abs(parseFloat(line.y2)- parseFloat(line.y1))) < threshold){
  	  return {solved: true}
  	}
  }

  return {solved: false}

}

export default connect(mapStateToProps)(DrawParallelLine)