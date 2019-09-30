import React, { Component } from "react";
import Line from './line.js';
import {addCompass, addLine} from './../../actions/actions.js';
import { connect } from 'react-redux';


class Compass extends Component {

  constructor(props){
    super(props);
    this.state = {newR: this.props.r}
    var colors = ["#fab432", "#b2d300", "#1adef0", "#f01a85"];
    var randInt = this.getRandomArbitrary(0, 4);
    this.color = colors[randInt]
  }

  getRandomArbitrary(min, max) {
      return parseInt(Math.random() * (max - min) + min);
  }

  componentDidMount(){



      var path = d3.select(this.node);
      var line = d3.select(this.line);
      var mover = d3.select(this.mover);
      var cx = parseFloat(this.props.x);
      var cy = parseFloat(this.props.y);
      var x = this.props.x;
      var y = this.props.y;
      var id = this.props.id;


      mover.call(d3.drag().on('drag', move(this)).on('end', release(this)));


      function release(reference){

          function distance(a, b) {
            var sum = 0

            for (var n = 0; n < a.length; n++) {
              sum += Math.pow(parseFloat(a[n]) - parseFloat(b[n]), 2)
            }

            return String(Math.sqrt(sum))
          }

          return () => {
            var r = distance([x, y], [d3.event.x, d3.event.y]) 
            reference.props.addCircle({x: x, y: y, r: r, id: id})
        }
      }


      function move(reference) {

          function distance(a, b) {
            var sum = 0

            for (var n = 0; n < a.length; n++) {
              sum += Math.pow(parseFloat(a[n]) - parseFloat(b[n]), 2)
            }

            return String(Math.sqrt(sum))
          }

          return () => {
            var r = distance([x, y], [d3.event.x, d3.event.y]) 
            const pathDimension = "M " + x  +", "+ y + " m -"+r+",0 "+ "a " + r + "," + r + " 0 1,0 " + String(parseFloat(r)*2)+ ",0" + " a " + r + "," + r + " 0 1,0 -" + String(parseFloat(r)*2)+ ",0"; 
            path.attr('d', pathDimension);          
            line.attr('x2', String(parseFloat(x)+parseFloat(r)));
            mover.attr('cx', String(parseFloat(x)+parseFloat(r)));

            reference.setState({newR: String(parseInt(r))})
          }
      }

  }	

	render(){

  	  const r = this.props.r;
  	  const innerRadius = String(parseFloat(r)-0.1);
      const diff = String(parseFloat(r) - parseFloat(innerRadius));
      const pathDimension = "M " + this.props.x  +", "+ this.props.y + " m -"+r+",0 "+ "a " + r + "," + r + " 0 1,0 " + String(parseFloat(r)*2)+ ",0" + " a " + r + "," + r + " 0 1,0 -" + String(parseFloat(r)*2)+ ",0"; 

      const midPoint = String(parseFloat(this.props.x) + parseFloat(r)/2.0)
      const aboveXaxis = String(parseFloat(this.props.y)-2) 
      const outerCirclePoint = String(parseFloat(this.props.x)+parseFloat(r))

      return (
              <g>
                <path ref={node => this.node = node} strokeWidth="2" d={pathDimension}  fill="none" stroke={this.color}/>
      			    <line ref={line => this.line = line} strokeWidth="2" x1={this.props.x} y1={this.props.y} x2={outerCirclePoint} y2={this.props.y} stroke="#000000"/>
                <circle cx={this.props.x} cy={this.props.y} r="4" fill="#000000" />
                <text x = {midPoint} y={aboveXaxis} fontSize="16">{this.state.newR}</text>				
                <circle ref={mover => this.mover = mover} cx={outerCirclePoint} cy={this.props.y} r="4" fill="#000000" />
			        </g>
             );
	}

}


const mapDispatchToProps = (dispatch) => {
  return {
    addCircle: (newProp) => {
      dispatch(addCompass(newProp))
    }
  }
}

export default connect(null, mapDispatchToProps)(Compass);