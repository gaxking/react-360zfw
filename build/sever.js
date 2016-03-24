/*global require */
require('node-jsx').install({extension: '.jsx'});

var React = require('react'),
	ReactDOMServer = require('react-dom/server'),
	StepInfo = React.createFactory(require('./Component/StepInfo.jsx')),
	PopWindow = React.createFactory(require('./Component/PopWindow.jsx'));

StepInfo = ReactDOMServer.renderToString(StepInfo());
PopWindow = ReactDOMServer.renderToString(PopWindow());

console.log(StepInfo);
console.log(PopWindow);
