/*global require, module */
var React = require('react'),
	OrderForm = React.createFactory(require('./OrderForm.jsx'));

module.exports = React.createClass({
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
				<OrderForm />
			</div>
		);
	}
});
