import React, { Component } from "react";

export default class Line extends Component {

  componentDidMount(){

      var point = d3.select(this.point);
      var line = d3.select(this.line);

      point.call(d3.drag().on('drag', move).on('end', release));

      function release(){
        console.log("released")
      }

      function move () {
          point.attr('cx', d3.event.x);
          point.attr('cy', d3.event.y);          
          line.attr('x2', d3.event.x)
          line.attr('y2', d3.event.y)
      }

  }	

	
	render(){

      return (<g>
      			<line ref={line => this.line = line} x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} stroke="#b2d300"/>
                <circle cx={this.props.x1} cy={this.props.y1} r="1" fill="#000000" />
                <circle ref={point => this.point = point} cx={this.props.x2} cy={this.props.y2} r="1" fill="#000000" />      			
			 </g>);
	}

}
