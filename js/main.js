var mainObject = {
	elm : null,
	elm1 : null,
	myDetails : null,
	x : null,
	y : null,
	obj : null,
	computedStyle : null,
	incX : 1,
	incY : 1,
	inter : 0,
	init : function(eventBinding){
		eventBinding =  eventBinding || false;
		if(eventBinding) { 
			this.elm = $(".innerBox").get(0);
			this.elm1 = $(".headerWrapper").get(0);
			this.myDetails = $(".myDetails");
			this.bindEvents();
		}		
		clearInterval(this.inter);
		this.inter = setInterval(this.doBounce.bind(this), 20);
	},
	bindEvents : function(){
		var _this = this;
		$(_this.elm).hover(function() {
			clearInterval(_this.inter);
			$(this).removeClass("animate").addClass("stopped");
			_this.myDetails.finish().slideDown("fast");
		}, function() {
			_this.init();
			$(this).removeClass("stopped").addClass("animate");
			_this.myDetails.finish().slideUp("fast");
		}).click(function() {
			window.open("https://www.facebook.com/profile.php?id=100007985747854", "_blank");
		});
		$(window).resize(function(){
			_this.obj = _this.elm1.getBoundingClientRect();
		}).resize().load(function(){
			setTimeout(function(){
				$("#disqus_thread").addClass("discussPartialDisplay");
			}, 3000);
		});
		
	},
	doBounce : function(){
		//this.obj = this.elm1.getBoundingClientRect();
		this.computedStyle = window.getComputedStyle(this.elm);
		this.x = parseInt(this.computedStyle.left);
 		this.y = parseInt(this.computedStyle.top);
		if (this.x < 0 || (this.x + 20) > this.obj.width) this.incX = -this.incX;
		if (this.y < 0 || (this.y + 20) > this.obj.height) this.incY = -this.incY;
		this.elm.style.left = this.x + this.incX + "px";
		this.elm.style.top = this.y + this.incY + "px";
	},
	processAlgo : function(x, y, stepNumber, helper) {
		var xType = typeof x, yType = typeof y;
		xType == (xType == "function") ? "object" : xType;
		yType == (yType == "function") ? "object" : yType;
	}
};

$(mainObject.init.bind(mainObject, true));
