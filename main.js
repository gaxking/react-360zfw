/*global require, $ */
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var EventEmitter = require('fbemitter').EventEmitter;
var emitter = new EventEmitter();
var ReactDOMServer = require('react-dom/server');
require('babel-core/register')({
	presets: ['es2015', 'react']
});

var StepInfo = React.createClass({
	propTypes:{
		steptips: React.PropTypes.object.isRequired
	},
	getDefaultProps: function() {
		return {
			steptips: {
				1: {content: "免费上门收房量房，为您挑选合适的设计方案", pos:"-339px"},
				2: {content: "免费设计，透明选材，报价快，支持线下比价", pos:"-352px"},
				3: {content: "确定合作意向，签订合同后施工过程绝无加价", pos:"-365px"},
				4: {content: "科学施工，严格监管，手机监工省力省心", pos:"-378px"},
				5: {content: "全面检测保证质量，公开验收标准现场查看", pos:"-391px"},
				6: {content: "行业首创售后服务标杆，让爱家持久如新", pos:"-404px"}
			}
		};
	},
	getInitialState: function() {
		return {
			step:1
		};
	},
	handleClick:function(event) {
		if(event.target.tagName.toLowerCase() == 'span') {
			var num = parseInt(event.target.innerHTML);
			this.setState({
				step:num
			});
		}
	},
	render: function() {
		var pos = this.props.steptips[this.state.step].pos,
			content = this.props.steptips[this.state.step].content,
			step = this.state.step;

		var isHover = {
			1: step == 1 ?'step1 shover1':'step1',
			2: step == 2 ?'step2 shover2':'step2',
			3: step == 3 ?'step3 shover3':'step3',
			4: step == 4 ?'step4 shover4':'step4',
			5: step == 5 ?'step5 shover5':'step5',
			6: step == 6 ?'step6 shover6':'step6'
		};

		return(
			<div>
				<div className="mctr-top">
					<span className="nf mctrt-t">收房量房</span>
					<span className="mctrt-l"></span>
					<span className="nf mctrt-t">设计报价</span>
					<span className="mctrt-l"></span>
					<span className="nf mctrt-t">签订合同</span>
					<span className="mctrt-l"></span>
					<span className="nf mctrt-t">施工监工</span>
					<span className="mctrt-l"></span>
					<span className="nf mctrt-t">竣工验收</span>
					<span className="mctrt-l"></span>
					<span className="nf mctrt-t">售后保障</span>
				</div>
				<div className="mctr-num" onClick={this.handleClick} style={{backgroundPosition:'0 ' + pos}}>
					<span className={isHover[1]}>1</span>
					<span className={isHover[2]}>2</span>
					<span className={isHover[3]}>3</span>
					<span className={isHover[4]}>4</span>
					<span className={isHover[5]}>5</span>
					<span className={isHover[6]}>6</span>
				</div>
				<div className="mctr-dir">{content}</div>
			</div>
		);
	}
});

var OrderForm = React.createClass({
	handleClick:function() {
		var name = this.refs.NickName.getValue();
		var phone = this.refs.Phone.getValue();
		var location = this.refs.Location.getValue();

		if(name && phone) {
			$.post('http://test.360zfw.com/u_order', { name:name, phone:phone, province:location.province, city:location.city, fangan:0},
				function(oid) {
					this.refs.NickName.setValue('');
					this.refs.Phone.setValue('');

					PopWindowComponent.props.open();
					emitter.emit('PopWindowChange', 'PopWindowUserDetial', {oid:oid});
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
var InputMixin = {
	getInitialState: function() {
		return {
			isFocus:false
		};
	},
	handleFocus:function() {
		this.setState({
			isFocus:true
		});
	},
	handleBlur:function() {
		this.setState({
			isFocus:false
		});
	},
	handleChange:function(event) {
		this.setState({
			isEmpty:false,
			value:event.target.value
		});
	},
	getValue:function() {
		this.setState({
			isEmpty:this.state.value?false:true
		});

		return this.state.value;
	},
	setValue:function(val) {
		this.setState({
			isEmpty:false,
			value:val
		});
	}
};

var NickName = React.createClass({
	mixins:[InputMixin],
	getDefaultProps: function() {
		return {
			tips: "称呼"
		};
	},
	propTypes: {
		tips: React.PropTypes.string.isRequired
	},
	render: function() {
		var _class = classNames({
			'active': this.state.isFocus
		});

		var error = this.state.isEmpty?<label><em></em> 请填写{this.props.tips}</label>:undefined;

		return(
			<div className="mctr-form">
				<input placeholder={this.props.tips} type="text" name="yourname" className={_class} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} value={this.state.value} />
				{error}
			</div>
		);
	}
});

var Phone = React.createClass({
	mixins:[InputMixin],
	getDefaultProps: function() {
		return {
			tips: "电话"
		};
	},
	propTypes: {
		tips: React.PropTypes.string.isRequired
	},
	render: function() {
		var _class = classNames({
			'active': this.state.isFocus
		});

		var error = this.state.isEmpty?<label><em></em> 请填写{this.props.tips}</label>:undefined;

		return(
			<div className="mctr-form">
				<input placeholder={this.props.tips} type="text" name="yourname" className={_class} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} value={this.state.value} />
				{error}
			</div>
		);
	}
});

var PassWord = React.createClass({
	mixins:[InputMixin],
	render: function() {
		var _class = classNames({
			'active': this.state.isFocus
		});

		var error = this.state.isEmpty?<label><em></em> 请填写密码</label>:undefined;

		return(
			<div className="mctr-form">
				<input placeholder="密码" type="password" maxLength="20" className={_class} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} value={this.state.value} />
				{error}
			</div>
		);
	}
});

var Location = React.createClass({
	propTypes:{
		provinces: React.PropTypes.object.isRequired
	},
	getDefaultProps: function() {
		var cities = {}; 
		cities['台湾']=new Array('台北', '台南', '其他'); 
		cities['北京']=new Array('北京'); 
		cities['上海']=new Array('上海'); 
		cities['天津']=new Array('天津'); 
		cities['重庆']=new Array('重庆'); 
		cities['河北']=new Array('石家庄', '张家口', '承德', '秦皇岛', '唐山', '廊坊', '保定', '沧州', '衡水', '邢台', '邯郸'); 
		cities['山西']=new Array('太原', '大同', '朔州', '阳泉', '长治', '晋城', '忻州', '吕梁', '晋中', '临汾', '运城');
		cities['辽宁']=new Array('沈阳', '朝阳', '阜新', '铁岭', '抚顺', '本溪', '辽阳', '鞍山', '丹东', '大连', '营口', '盘锦', '锦州', '葫芦岛'); 
		cities['吉林']=new Array('长春', '白城', '松原', '吉林', '四平', '辽源', '通化', '白山', '延边'); 
		cities['黑龙江']=new Array('哈尔滨', '齐齐哈尔', '黑河', '大庆', '伊春', '鹤岗', '佳木斯', '双鸭山', '七台河', '鸡西', '牡丹江', '绥化', '大兴安'); 
		cities['江苏']=new Array('南京', '徐州', '连云港', '宿迁', '淮阴', '盐城', '扬州', '泰州', '南通', '镇江', '常州', '无锡', '苏州'); 
		cities['浙江']=new Array('杭州', '湖州', '嘉兴', '舟山', '宁波', '绍兴', '金华', '台州', '温州', '丽水'); 
		cities['安徽']=new Array('合肥', '宿州', '淮北', '阜阳', '蚌埠', '淮南', '滁州', '马鞍山', '芜湖', '铜陵', '安庆', '黄山', '六安', '巢湖', '池州', '宣城'); 
		cities['福建']=new Array('福州', '南平', '三明', '莆田', '泉州', '厦门', '漳州', '龙岩', '宁德'); 
		cities['江西']=new Array('南昌', '九江', '景德镇', '鹰潭', '新余', '萍乡', '赣州', '上饶', '抚州', '宜春', '吉安'); 
		cities['山东']=new Array('济南', '聊城', '德州', '东营', '淄博', '潍坊', '烟台', '威海', '青岛', '日照', '临沂', '枣庄', '济宁', '泰安', '莱芜', '滨州', '菏泽'); 
		cities['河南']=new Array('郑州', '三门峡', '洛阳', '焦作', '新乡', '鹤壁', '安阳', '濮阳', '开封', '商丘', '许昌', '漯河', '平顶山', '南阳', '信阳', '周口', '驻马店'); 
		cities['湖北']=new Array('武汉', '十堰', '襄攀', '荆门', '孝感', '黄冈', '鄂州', '黄石', '咸宁', '荆州', '宜昌', '恩施', '襄樊'); 
		cities['湖南']=new Array('长沙', '张家界', '常德', '益阳', '岳阳', '株洲', '湘潭', '衡阳', '郴州', '永州', '邵阳', '怀化', '娄底', '湘西'); 
		cities['广东']=new Array('广州', '清远', '韶关', '河源', '梅州', '潮州', '汕头', '揭阳', '汕尾', '惠州', '东莞', '深圳', '珠海', '江门', '佛山', '肇庆', '云浮', '阳江', '茂名', '湛江'); 
		cities['海南']=new Array('海口', '三亚'); 
		cities['四川']=new Array('成都', '广元', '绵阳', '德阳', '南充', '广安', '遂宁', '内江', '乐山', '自贡', '泸州', '宜宾', '攀枝花', '巴中', '达川', '资阳', '眉山', '雅安', '阿坝', '甘孜', '凉山'); 
		cities['贵州']=new Array('贵阳', '六盘水', '遵义', '毕节', '铜仁', '安顺', '黔东南', '黔南', '黔西南'); 
		cities['云南']=new Array('昆明', '曲靖', '玉溪', '丽江', '昭通', '思茅', '临沧', '保山', '德宏', '怒江', '迪庆', '大理', '楚雄', '红河', '文山', '西双版纳'); 
		cities['陕西']=new Array('西安', '延安', '铜川', '渭南', '咸阳', '宝鸡', '汉中', '榆林', '商洛', '安康'); 
		cities['甘肃']=new Array('兰州', '嘉峪关', '金昌', '白银', '天水', '酒泉', '张掖', '武威', '庆阳', '平凉', '定西', '陇南', '临夏', '甘南'); 
		cities['青海']=new Array('西宁', '海东', '西宁', '海北', '海南', '黄南', '果洛', '玉树', '海西'); 
		cities['内蒙古']=new Array('呼和浩特', '包头', '乌海', '赤峰', '呼伦贝尔盟', '兴安盟', '哲里木盟', '锡林郭勒盟', '乌兰察布盟', '鄂尔多斯', '巴彦淖尔盟', '阿拉善盟'); 
		cities['广西']=new Array('南宁', '桂林', '柳州', '梧州', '贵港', '玉林', '钦州', '北海', '防城港', '南宁', '百色', '河池', '柳州', '贺州'); 
		cities['西藏']=new Array('拉萨', '那曲', '昌都', '林芝', '山南', '日喀则', '阿里'); 
		cities['宁夏']=new Array('银川', '石嘴山', '吴忠', '固原'); 
		cities['新疆']=new Array('乌鲁木齐', '克拉玛依', '喀什', '阿克苏', '和田', '吐鲁番', '哈密', '博尔塔拉', '昌吉', '巴音郭楞', '伊犁', '塔城', '阿勒泰'); 
		cities['香港']=new Array('香港'); 
		cities['澳门']=new Array('澳门'); 

		return {
			provinces: cities
		};
	},
	getInitialState: function() {
		return {
			isFocus:false,
			province:'广东',
			city:this.props.provinces['广东'][0]
		};
	},
	handleChangeProvince:function(event) {
		this.setState({
			province: event.target.value,
			city:this.props.provinces[event.target.value][0]
		});
	},
	handleChangeCity:function(event) {
		this.setState({
			city: event.target.value
		});
	},
	renderProvince: function() {
		var optionsProvince = [];
		for(var x in this.props.provinces) {
			optionsProvince.push(<option key={x} value={x}>{x}</option>);
		}
		return optionsProvince;
	},
	renderCity: function() {
		var optionsCity = [], provinceObj = this.props.provinces[this.state.province];
		for(var x in provinceObj) {
			optionsCity.push(<option key={provinceObj[x]} value={provinceObj[x]}>{provinceObj[x]}</option>);
		}
		return optionsCity;
	},
	getValue:function() {
		return this.state;
	},
	render: function() {
		return(
			<div className="mctr-form">
				<select className="mctrf-sl" value={this.state.province} onChange={this.handleChangeProvince} >{this.renderProvince()}</select>
				<select className="mctrf-sr" value={this.state.city} onChange={this.handleChangeCity}>{this.renderCity()}</select>
			</div>
		);
	}
});

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
	handleChange:function() {
		this.setState({
			checked:event.target.checked
		});
	},
	handleSignup:function() {
		emitter.emit('PopWindowChange', 'PopWindowLogin');
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

var PopWindow = React.createClass({
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
		emitter.addListener('PopWindowChange', function(type, data) {
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

//ReactDOM.render(<StepInfo/>, document.getElementById('indexOrder'));
//ReactDOMServer.renderToString(<StepInfo/>, document.getElementById('indexOrder'));

/*
var PopWindowComponent = ReactDOM.render(<PopWindow />, document.getElementById('popwindow'));

setTimeout(function() {
	PopWindowComponent.props.open();
	emitter.emit('PopWindowChange', 'PopWindowSignup');
}, 500);*/
