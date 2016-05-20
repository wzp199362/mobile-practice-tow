'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.less');

//引入照片数据
var imagesData = require('../data/imagesData.js');

imagesData = (function(index){
	for(var i = 0; i < index.length; i++){
		var singleImage = index[i];

		singleImage.imageURL = require('../images/' + singleImage.fileName);

		index[i] = singleImage;
	}
	return index;
})(imagesData);
// 顶部导航栏组件
var PageNav = React.createClass({
	handleClick: function(e){
		this.props.inverse();

		e.stopPropagation();
		e.preventDefault();
	},
	render: function(){
		var collapsedClassName = 'collapsed';
		collapsedClassName += this.props.arrage.menuState ? ' in ' : '';
		return (
				<div className="container">
					<div className="nav-header">
						<button onClick={this.handleClick}>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="nav-logo"><img src={imagesData[0].imageURL}/></a>
						<a className="nav-word"><img src={imagesData[1].imageURL}/></a>
					</div>
					<div className={collapsedClassName} >
						<ul className="nav-login">
							<li><a>登录</a></li>
							<li><a>注册</a></li>
						</ul>
						<form></form>
						<ul>
							<li><a>新闻</a></li>
							<li><a>文章</a></li>
							<li><a>电台</a></li>
							<li><a>视频</a></li>
							<li><a>平台</a></li>
							<li><a>专题</a></li>
							<li><a>App</a></li>
						</ul>
					</div>
				</div>
			);
	}
});

// 页面幻灯片部分
var SildeImages = React.createClass({
	render: function(){
		return (
			<div className="slide-images">
				<a><img src={this.props.data.imageURL}/></a>
			</div>
		);
	}
});
// 页面幻灯片控制组件
var SildeControl = React.createClass({
	handleClick: function(){
		if(this.props.place){
			this.props.center();
		}
	},
	render: function(){
		return (
				<span className="slide-control" onClick={this.handleClick}></span>
			);
	}
});

// 页面幻灯片组件
var SildePart = React.createClass({
	placeState: function(){
		var placeInformation = 0;
		for(var i = 0; i < imagesData.slice(2).length; i++){
			this.state.position[i] = {
				place: placeInformation
			};
			placeInformation += 360;
		}
	},

	getInitialState: function(){
		return {
			position: [
				/*
				 * place 保存每张图片的位置信息
				 */
			]
		};
	},
	setCenterImage: function(index){
		return function(){
			var position = this.state.position;
		}.bind(this);
	},
	render: function(){
		var sildeImages = [];
		var sildeControl = [];
		imagesData.slice(2).forEach(function(value, index){

			if(!this.state.position[index]){
				this.state.position[index] = {
					place: 0,
					center: 0
				};
			}
			sildeImages.push(<SildeImages data={value}/>);
			sildeControl.push(<SildeControl arrange={this.state.position[index]} center={this.setCenterImage(index)}/>);
		}.bind(this));
		return (
				<div className="slide-box" ref="sildeChange">
					<a></a>
					<a></a>
					<div className="slide-tranlate">
						{sildeImages}
					</div>
					<div className="control-images">
						{sildeControl}
					</div>
				</div>
			);
	}
});
// 页面主控制组件
var MobilePracticeTowApp = React.createClass({
	// 改变状态
	inverse: function(index){
		return function(){
			var collapsedArr = this.state.collapsedArr;
			collapsedArr[index].menuState = !collapsedArr[index].menuState;

			this.setState({
				collapsedArr: collapsedArr
			});
		}.bind(this);
	},
//初始化控制状态
	getInitialState: function(){
		return {
			collapsedArr: [
				/*
				  Menustate: false 下拉菜单列表状态
				 */
			]
		};
	},

  render: function() {
	if(!this.state.collapsedArr[0]){
		this.state.collapsedArr[0] = {
			menuState: false
		};
	}
    return (
		<div className="page-main">
			<nav className="page-nav">
				<PageNav arrage={this.state.collapsedArr[0]} inverse={this.inverse(0)}/>
			</nav>
			<div className="page-wrapper">
				<SildePart />
			</div>
			<footer className="page-footer"></footer>
		</div>
    );
  }
});
React.render(<MobilePracticeTowApp />, document.getElementById('content')); // jshint ignore:line

module.exports = MobilePracticeTowApp;
