/*global require */
var React = require('react'),
	ReactDOM = require('react-dom'),
	PopWindow = require('./Component/PopWindow.jsx'),
	StepInfo = require('./Component/StepInfo.jsx'),
	EventSystem = require('./lib/Event.js');

ReactDOM.render(<StepInfo />, document.getElementById('indexOrder'));
window.PopWindow = ReactDOM.render(<PopWindow />, document.getElementById('popwindow'));

setTimeout(function() {
	window.PopWindow.props.open();
	EventSystem.emit('PopWindowChange', 'PopWindowSignup');
}, 500);
