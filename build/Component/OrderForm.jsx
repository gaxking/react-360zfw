/*global require, $, module */
var React = require('react'),
	NickName = require('./Form.jsx').NickName,
	Phone = require('./Form.jsx').Phone,
	Location = require('./Form.jsx').Location,
	EventSystem = require('../lib/Event.js');

module.exports = React.createClass({
	handleClick:function() {
		var name = this.refs.NickName.getValue();
		var phone = this.refs.Phone.getValue();
		var location = this.refs.Location.getValue();

		if(name && phone) {
			$.post('http://test.360zfw.com/u_order', { name:name, phone:phone, province:location.province, city:location.city, fangan:0},
				function(oid) {
					this.refs.NickName.setValue('');
					this.refs.Phone.setValue('');

					PopWindow.props.open();
					EventSystem.emit('PopWindowChange', 'PopWindowUserDetial', {oid:oid});
				}.bind(this)
			);
		}
	},
	render: function() {
		return(
			<div className="mctr-fm">
				<NickName ref="NickName" />
				<Phone ref="Phone" />
				<Location ref="Location" />
				<div className="mctr-but">
					<input type="button" value="立即申请" onClick={this.handleClick} />
				</div>
				<div className="mctr-bdir"><span>▪</span>咨询热线：4006-360-749</div>
			</div>
		);
	}
});
