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
	},
	doBounce : function(){
		this.obj = this.elm1.getBoundingClientRect();
		this.computedStyle = window.getComputedStyle(this.elm);
		this.x = parseInt(this.computedStyle.left);
 		this.y = parseInt(this.computedStyle.top);
		if (this.x < 0 || (this.x + 20) > this.obj.width) this.incX = -this.incX;
		if (this.y < 0 || (this.y + 20) > this.obj.height) this.incY = -this.incY;
		this.elm.style.left = this.x + this.incX + "px";
		this.elm.style.top = this.y + this.incY + "px";
	}
};

$(mainObject.init.bind(mainObject, true));
