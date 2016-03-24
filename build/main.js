/*global require */
var isNode = typeof window === 'undefined';
if (!isNode) {
	require('./browser.js');
}else{
	require('./sever.js');
}
