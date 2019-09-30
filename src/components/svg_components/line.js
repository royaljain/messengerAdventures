import React, { Component } from "react";
import {addLine} from './../../actions/actions.js';
import { connect } from 'react-redux';
import uuidv4 from './../../utils/math.js';

class Line extends Component {

  constructor(props){
    super(props);
    var colors = ["#fab432", "#b2d300", "#1adef0", "#f01a85"];
    var randInt = this.getRandomArbitrary(0, 4);
    this.color = colors[randInt]
  }

  getRandomArbitrary(min, max) {
      return parseInt(Math.random() * (max - min) + min);
  }

  componentDidMount(){

      var point = d3.select(this.point);
      var line = d3.select(this.line);
      var id = this.props.id;

      point.call(d3.drag().on('drag', move).on('end', release(this)));

      function release(reference){

        return () => {
            reference.props.addLine({x1: reference.props.x1, y1: reference.props.y1, x2: d3.event.x, y2: d3.event.y, id: id})
        }
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
      			<line ref={line => this.line = line} x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} stroke={this.color} strokeWidth="2"/>
                <circle cx={this.props.x1} cy={this.props.y1} r="4" fill="#000000" />
                <circle ref={point => this.point = point} cx={this.props.x2} cy={this.props.y2} r="4" fill="#000000" />      			
			 </g>);
	}

}

const mapDispatchToProps = (dispatch) => {
  return {
    addLine: (newProp) => {
      dispatch(addLine(newProp))
    }
  }
}

export default connect(null, mapDispatchToProps)(Line);