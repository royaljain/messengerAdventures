import React, { Component } from "react";
import BaseActivity from './../base_activity.js';
import Board from './../../components/svg_components/board.js';


export default class DrawParallelLine extends BaseActivity {

	render(){
	 	return (<Board buttons={['compass', 'line']}/>);
	}
}