import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default class ActivityHeading extends Component {

	render(){
		return (
		  <Grid container direction="row">
		  	  <Grid item container direction="row">
		          <Typography align="center" color="inherit" variant="h6">
		            {this.props.text}
		          </Typography>
			  </Grid>
		  </Grid>
		);
	}

}