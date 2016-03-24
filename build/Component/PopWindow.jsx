/*global require, $, module */
var React = require('react'),
	Phone = require('./Form.jsx').Phone,
	PassWord = require('./Form.jsx').PassWord,
	NickName = require('./Form.jsx').NickName,
	EventSystem = require('../lib/Event.js');

var PopWindowLogin = React.createClass({
	handleClick:function() {
		var phone = this.refs.Phone.getValue();
		var password = this.refs.PassWord.getValue();

		if(phone && password) {
			$.post('http://test.360zfw.com/u_login', { name:name, phone:phone},
				function(data) {
					if(data.errorCode==0) {
						window.location.reload();
					}else{
						alert(data.msg);
					}
				},
				"json"
			);
		}
	},
	render: function() {
		return (
			<div className="login">
				<h1>用户登录</h1>
				<div>
					<Phone ref="Phone" tips="手机号" />
					<PassWord ref="PassWord" />
				</div>
				<input type="button" value="登录" className="sign-btn" onClick={this.handleClick} />
			</div>
		);
	}
});

var PopWindowSignup = React.createClass({
	getInitialState: function() {
		return {
			checked: true
		};
	},
	handleClick:function() {
		var phone = this.refs.Phone.getValue();
		var password = this.refs.PassWord.getValue();
		var name = this.refs.NickName.getValue();

		if(phone && password && name) {
			$.post('http://test.360zfw.com/u_signup', { name:name, phone:phone, pass:password },
				function(data) {
					if(data.errorCode==0) {
						window.location.reload();
					}else{
						alert(data.msg);
					}
				},
				"json"
			);
		}
	},
	handleChange:function() {
		this.setState({
			checked:event.target.checked
		});
	},
	handleSignup:function() {
		EventSystem.emit('PopWindowChange', 'PopWindowLogin');
	},
	render: function() {
		return (
			<div className="login">
				<h1>用户注册</h1>
				<p className="tips">
					请您完善详细资料，以便我们尽快为您安排服务。
				</p>
				<div>
					<Phone ref="Phone" tips="手机号" />
					<NickName ref="NickName" tips="用户名" />
					<PassWord ref="PassWord" />
				</div>
				<div className="safe accept-service">
					<span className="safe-login">
						<input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
						<label>我已阅读并接受<a>《360装房网服务协议》</a></label>
					</span>
				</div>
				<input type="button" value="立即注册" className="sign-btn" onClick={this.handleClick} />
				<div className="has-account">
					<span>
						<a onClick={this.handleSignup}>立即登录</a>
						<span>已有账号?</span>
					</span>
				</div>
			</div>
		);
	}
});

var PopWindowSuccess = React.createClass({
	render: function() {
		return(
			<center className="successContent">
				<div></div>
				<h1>提交成功！</h1>
				<p>设计师将在24小时内联系您，请保持手机畅通。</p>
			</center>
		);
	}
});

var PopWindowUserDetial = React.createClass({
	propTypes:{
		oid: React.PropTypes.string,
		change: React.PropTypes.func.isRequired
	},
	getInitialState: function() {
		return {
			isEmpty:false
		};
	},
	handleClick:function() {
		var area = this.getArea();
		if(area) {
			$.post('http://test.360zfw.com/u_replenish', { area:area, vtime:this.refs.vtime.value, suretime:this.refs.suretime.value, type:this.refs.type.value, address:this.refs.address.value, oid:this.refs.oid.value},
				function() {
					this.props.change('PopWindowSuccess');
				}.bind(this)
			);
		}
	},
	handleChange:function() {
		this.setState({
			isEmpty:false
		});
	},
	getArea:function() {
		this.setState({
			isEmpty:this.refs.area.value?false:true
		});

		return this.refs.area.value;
	},
	render: function() {
		var error = this.state.isEmpty?<label className="error"><em></em> 请填写大概面积</label>:undefined;
		return(
				<div>
				<h1>恭喜您申请成功！</h1>
				<p className="tips">
					客服将在24小时之内联系您，请保持手机畅通。现在请您完善详细资料，以便我们尽快为您安排服务。
				</p>
				<div>
					<div className="pow-line">
						<label htmlFor="vtime" className="pow-label"><span>*</span>&nbsp;量房时间</label>
						<div className="pow-element">
							<select className="pow-element" name="vtime" ref="vtime">
								<option value="今天内">今天内</option>
								<option value="明天">明天</option>
								<option value="三天内">三天内</option>
								<option value="近一周内">近一周内</option>
								<option value="一周以上">一周以上</option>
							</select>
						</div>
					</div>
					<div className="pow-line">
						<label htmlFor="area" className="pow-label"><span>*</span>&nbsp;房屋面积</label>
						<div className="pow-element">
							<div>
								<input className="area" onChange={this.handleChange} ref="area" name="area" maxLength="4" /><em className="pow-uni">㎡</em>
								{error}
								<p id="area-error"></p>
							</div>
						</div>
					</div>
					<div className="pow-line">
						<label htmlFor="suretime" className="pow-label"><span>*</span>&nbsp;装修计划</label>
						<div className="pow-element"><div>
								<select name="suretime" ref="suretime" >
									<option value="半个月内">半个月内</option>
									<option value="1个月">1个月</option>
									<option value="2个月">2个月</option>
									<option value="2个月以上">2个月以上</option>
								</select>
							</div>
						</div>
					</div>
					<div className="pow-line">
						<label htmlFor="type" className="pow-label"><span>*</span>&nbsp;装修类型</label>
						<div className="pow-element"><div>
								<select name="type" ref="type" >
									<option value="1">毛坯整装</option>
									<option value="2">二手整装</option>
									<option value="3">精装升级</option>
									<option value="4">二手翻新</option>
								</select>
							</div>
						</div>
					</div>
					<div className="cb"></div>
					<div className="pow-address">
						<label htmlFor="address" className="pow-label">楼盘地址</label>
						<div className="pow-element">
							<input type="text" className="select" name="address" ref="address" />
						</div>
					</div>
					<input type="button" value="提交" className="pow-btn" onClick={this.handleClick} />
					<input type="hidden" ref="oid" value={this.props.oid} id="data_time" />
				</div>
			</div>
		);
	}
});

module.exports = React.createClass({
	propTypes:{
		oid: React.PropTypes.string,
		type: React.PropTypes.string,
		open: React.PropTypes.func,
		change: React.PropTypes.func
	},
	getInitialState: function() {
		return {
			type: this.props.type
		};
	},
	getDefaultProps: function() {
		return {
			open:function() {
				$('#myModal').reveal({revealId:"myModal", animation:"fade"});
			},
			close:function() {
				$(".reveal-modal-bg").trigger("click");
			}
		};
	},
	componentDidMount: function() {
		var _this = this;
		EventSystem.addListener('PopWindowChange', function(type, data) {
			var state = {
				type:type
			};

			if(type == 'PopWindowUserDetial') {
				state.oid = data.oid;
			}
			_this.setState(state);
		});
	},
	change:function(type) {
		this.setState({
			type:type
		});
	},
	render: function() {
		var content;
		switch(this.state.type) {
		case 'PopWindowUserDetial':
			content = <PopWindowUserDetial oid={this.state.oid} change={this.change} />;
			break;
		case 'PopWindowSuccess':
			content = <PopWindowSuccess />;
			break;
		case 'PopWindowLogin':
			content = <PopWindowLogin />;
			break;
		case 'PopWindowSignup':
			content = <PopWindowSignup />;
			break;
		default:
			content = undefined;
		}

		return(
			<div id="myModal" className="reveal-modal" >
				<a className="close-reveal-modal">&#215;</a>
				{content}
			</div>
		);
	}
});

