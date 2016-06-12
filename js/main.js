var mainObject = {
    elm: null,
    elm1: null,
    myDetails: null,
    equalsBtn: null,
    resultDisplayer: null,
    lhs: null,
    rhs: null,
    result: true,
    x: null,
    y: null,
    obj: null,
    computedStyle: null,
    incX: 1,
    incY: 1,
    inter: 0,
    init: function(eventBinding) {
        eventBinding = eventBinding || false;
        if (eventBinding) {
            this.elm = $(".innerBox").get(0);
            this.elm1 = $(".headerWrapper").get(0);
            this.myDetails = $(".myDetails");
            this.resultDisplayer = $(".resultDisplayer");
            this.rhs = $(".rhs");
            this.lhs = $(".lhs");
            this.equalsBtn = $(".componentButton.equals");
            this.bindEvents();
            window.console.log = (str, cls) => {
                this.setItInParagraph(str, cls);
            }
        }
        clearInterval(this.inter);
        this.inter = setInterval(this.doBounce.bind(this), 20);
    },
    bindEvents: function() {
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
        _this.equalsBtn.click(function() {
            var x = _this.lhs.val().trim(),
                y = _this.rhs.val().trim();
            try {
				_this.setResultsArea(); 
                _this.result = eval("(" + x + ") == (" + y + ")");
                _this.processAlgo(eval("(" + x + ")"), eval("(" + y + ")"), 1, x, y);
				console.log("RESULT : " + _this.result.toString().toUpperCase(), _this.result.toString())
            } catch (e) {
                console.log(e);
            }
        });
        $(window).resize(function() {
            _this.obj = _this.elm1.getBoundingClientRect();
        }).resize().load(function() {
            setTimeout(function() {
                $("#disqus_thread").addClass("discussPartialDisplay");
            }, 2000);
        });
    },
    doBounce: function() {
        this.computedStyle = window.getComputedStyle(this.elm);
        this.x = parseInt(this.computedStyle.left);
        this.y = parseInt(this.computedStyle.top);
        if (this.x < 0 || (this.x + 20) > this.obj.width) this.incX = -this.incX;
        if (this.y < 0 || (this.y + 20) > this.obj.height) this.incY = -this.incY;
        this.elm.style.left = this.x + this.incX + "px";
        this.elm.style.top = this.y + this.incY + "px";
    },
    setResultsArea : function(){
	this.resultDisplayer.empty().removeClass("center");
    },
    setItInParagraph: function(str, cls) {
        return $("<p class="+ cls +">").html(((cls == "explanation") ? "&#x21E8; " : "") + str).appendTo(this.resultDisplayer);
    },
    stringChecker: function(val) {
        return typeof val == "string" ? "\"" + val + "\"" : typeof val == "object" ? this.getObjectRep(val) : val;
    },
    getValForNSOBool: function(val, valType) {
        val = valType == "boolean" ? +val : val;
        return val;
    },
    getValForNSObject: function(val, helper, helperVal) {
        val = (helper == helperVal) ? this.toPrimitive(val) : val;
        return val;
    },
    toPrimitive: function(obj, helper) {
        helper = typeof obj.valueOf();
        return (helper === "object") ? obj.valueOf().toString() : (helper == "string") ? obj.valueOf() : obj.valueOf();
    },
    getObjectRep: function(val) {
        return Object.prototype.toString.call(val).includes("Array") ? "[...]" : "{Object...}";
    },
    isUndefinedOrNull: function(type, val) {
        return (type === "undefined" || (type === "object" && val === null));
    },
    isNumberStringObjectCombination: function(xType, yType) {
        return (xType == "number" && yType == "object") || (xType == "object" && yType == "number") || (xType == "string" && yType == "object") || (xType == "object" && yType == "string");
    },
    isNumberStringCombination: function(xType, yType) {
        return ((xType === "number" && yType === "string") || (xType === "string" && yType === "number"));
    },
    isNumberStringObject_WithBooleanCombination: function(xType, yType) {
        return xType === "boolean" || yType === "boolean";
    },
    renderReferenceLookup: function(id, additionalId) {
        switch (id) {
            case 1000:
                console.log("Refer line numbers 1.A and B in AECA.", "reference");
                break;
            case 1001:
                console.log("Refer line numbers 1.C.i and ii in AECA.", "reference");
                break;
            case 1002:
                switch (additionalId) {
                    case "number":
                        console.log("Refer line numbers 1.C.iii ,iv ,v and vi in AECA.", "reference");
                        break;
                    case "string":
                        console.log("Refer line number 1.D in AECA.", "reference");
                        break;
                    case "boolean":
                        console.log("Refer line number 1.E in AECA.", "reference");
                        break;
                    case "object":
                        console.log("Refer line number 1.F in AECA.", "reference");
                        break;
                }
                break;
            case 1003:
                console.log("Refer line number 2 and 3 in AECA.", "reference");
                break;
            case 1004:
                console.log("Refer line number 4 and 5 in AECA.", "reference");
                break;
            case 1005:
                console.log("Refer line number 6 and 7 in AECA.", "reference");
                break;
            case 1006:
                console.log("Refer line number 8 and 9 in AECA.", "reference");
                break;
            case 1007:
                console.log("Refer line number 10 in AECA.", "reference");
                break;
        }
    },
    processAlgo: function(x, y, stepNumber, stringX, stringY, helper) {
        var xType = typeof x,
            yType = typeof y;
        xType == (xType == "function") ? "object" : xType;
        yType == (yType == "function") ? "object" : yType;
        console.log("CALL #" + stepNumber + "<span>Arguments - LHS : " + stringX + " RHS : " + stringY + "</span>", "steps");
        if (xType === yType) {
            if (this.isUndefinedOrNull(xType, x)) {
                console.log("Both LHS and RHS are '" + (x + "") + "'. Hence the given expression will always be evaluated to 'true'.", "explanation");
                this.renderReferenceLookup(1000);
                return;
            } else if (xType === "number") {
                if (x !== x || y !== y) {
                    console.log("Though LHS and RHS are of type number, " + ((x !== x) ? "LHS" : "RHS") + " is 'NaN'. Basically 'NaN' will be evaluated to false even it is compared with itself. So the given expression will yield 'false' always.", "explanation");
                    this.renderReferenceLookup(1001);
                    return;
                }
            }
            console.log("LHS and RHS are of same type '" + xType + "'. Additionally, both are having " + ((x === y) ? "same" : "different") + ((xType === "object") ? " References" : " values") + ". So the given expression will be evaluated to '" + (x === y).toString() + "'.", "explanation");
            this.renderReferenceLookup(1002, xType);
            return;
        } else if (this.isUndefinedOrNull(xType, x) && this.isUndefinedOrNull(yType, y)) {
            console.log("When 'undefined' and 'null' are compared the result will always be 'true'. In our case LHS resolves to '" + (x + "") + "' and RHS resolves to '" + (y + "") + "'. So the given expression will evalautes to 'true'", "explanation");
            this.renderReferenceLookup(1003);
            return;
        } else if (this.isNumberStringCombination(xType, yType)) {
            console.log("LHS is a '" + xType + "' and RHS is a '" + yType + "', Hence " + ((xType === "string") ? "LHS" : "RHS") + " will be converted to 'number' first.", "explanation");
            console.log(((xType === "string") ? "LHS" : "RHS") + " will be converted as number to form the expression (" + (x = +x, x) + " == " + (y = +y, y) + "). After that, algorithm will be called recursively by supplying the gained expression.", "explanation");
            this.renderReferenceLookup(1004);
            return this.processAlgo(x, y, ++stepNumber, x , y);
        } else if (this.isNumberStringObject_WithBooleanCombination(xType, yType)) {
            console.log("If either RHS or LHS is a boolean, then it has to be converted to number first.", "explanation");
            console.log("Here, " + ((xType == "boolean") ? "LHS" : "RHS") + " is boolean. So after translating it into a number the whole expression becomes like below,", "explanation");
            x = this.getValForNSOBool(x, xType);
            y = this.getValForNSOBool(y, yType);
            console.log(this.stringChecker(x) + " == " + this.stringChecker(y) + ". And here we need a recursive call to the algorithm, to evaluate the newly generated expression.", "explanation");
            this.renderReferenceLookup(1005);
            return this.processAlgo(x, y, ++stepNumber, this.stringChecker(x), this.stringChecker(y));
        } else if (this.isNumberStringObjectCombination(xType, yType)) {
            helper = (xType === "object") ? "RHS" : "LHS";
            console.log(helper + " is a " + ((xType === "object") ? yType : xType) + ". And its opponent is an object. So object has to be converted to its primitive form first before further evaluations.", "explanation");
            console.log("ToPrimitve(" + (helper == "RHS" ? "LHS" : "RHS") + ") will be called and the following expression will be framed,", "explanation");
            x = this.getValForNSObject(x, helper, "RHS");
            y = this.getValForNSObject(y, helper, "LHS");
            console.log(this.stringChecker(x) + " == " + this.stringChecker(y) + ". Next, the framed expression will be passed to a recursive call of the algorithm.", "explanation");
            this.renderReferenceLookup(1006);
            return this.processAlgo(x, y, ++stepNumber, this.stringChecker(x), this.stringChecker(y));
        } else {
            console.log("No condition match found in AECA! Hence the given expression will be evaluated as 'false'", "explanation")
            this.renderReferenceLookup(1007);
        }
    }
};

$(mainObject.init.bind(mainObject, true));
