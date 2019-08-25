<script>

class Token {
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
};

function precedence(token) {
	switch (token.type) {
    	case "left": case "right":
        	return 0;
        case "+": case "-":
        	return 1;
        case "*": case "/":
        	return 2;
        case "_":  
        	return 3;
        default:
        	return -1;
    }
}

function tokenize(inputStr, tokenList) {
    var i;
    input = inputStr.split('');
    var minus = false;
    for (i = 0; i < input.length; i++) {
    	var tokenStr = "";
        var current = input[i];
        if (current == "*" || current == "/") {
            // operator
            var token = new Token(current, current);
            tokenList.push(token);
        } else if (current == "+" || current == "-") {
        	if (tokenList.length == 0) {
            	if (current == "-") {
                	//var token = new Token(0, "dec");
                	//tokenList.push(token);
                	//token = new Token(current, current);
                    var token = new Token("-", "_");
                    tokenList.push(token);
                }
            } else {
            	switch(tokenList[tokenList.length - 1].type) {
                	case "dec": case "right":
                        var token = new Token(current, current);
                        tokenList.push(token);
                        break;
                    case "left":
                    	if (current == "-") {
                        	//var token = new Token(0, "dec");
                			//tokenList.push(token);
                			//token = new Token(current, current);
                            var token = new Token("-", "_");
                    		tokenList.push(token);
                        }
                        break;
                    case "+": case "-": case "*": case "/":
                    	if (current == "-") {
                        	if (minus == true) {
                            	minus = false;
                            } else {
                            	minus = true;
                            }
                        }
                }
            }
        } else if (current == "(") {
        	var token = new Token(current, "left");
            tokenList.push(token);
        } else if (current == ")") {
        	var token = new Token(current, "right");
            tokenList.push(token);
        } else if (current == " ") {
        
        } else {
        	if (minus) {
            	var token = new Token("-", "_");
                tokenList.push(token);
                minus = false;
                document.write("-");
            }
            // number, not an operator
            tokenStr = current;
            while (i + 1 < input.length && input[i + 1] >= "0" && input[i + 1] <= "9") {
                i++;
                tokenStr = tokenStr + input[i];
            }
            if (input[i + 1] == ".") {
                i++;
                tokenStr = tokenStr + input[i];
                while (i + 1 < input.length && input[i + 1] >= "0" && input[i + 1] <= "9") {
                    i++;
                    tokenStr = tokenStr + input[i];
                }
            }
            var token = new Token(tokenStr, "dec");
            tokenList.push(token);
        }
    }
}

function displayList(tokenList) {
    for (i = 0; i < tokenList.length; i++) {
        document.write(tokenList[i].value + " " + tokenList[i].type + "<br>");
    }
    document.write('<br>');
}

function toPostFix(inFix, postFix) {
	// postFix is a list initially empty
	var list = [];
    var stack = [];
    var index;
    for (index = 0; index < inFix.length; index++) {
    	var token = inFix[index];
        switch (token.type) {
        	case "Roman": case "dec": case "bin": case "hex": case "oct":
            	postFix.push(token);
                break;
            case "+": case "-": case "*": case "/": case "_":
            	while (stack.length > 0 && stack[stack.length - 1].type != "left" && precedence(token) <= precedence(stack[stack.length - 1])) {
                	postFix.push(stack.pop());
                }
                stack.push(token);
                break;
            case "left":
            	stack.push(token);
                break;
            case "right":
            	while (stack.length > 0 && stack[stack.length - 1].type != "left") {
                	postFix.push(stack.pop());
                }
                if (stack[stack.length - 1].type == "left") {
                	stack.pop();
                }
                break;
        }
    }
    while (stack.length > 0) {
    	postFix.push(stack.pop());
    }
}

function evaluateNumber(postFix) {
	var i;
    for (i = 0; i < postFix.length; i++) {
    	var token = postFix[i];
    	switch (token.type) {
        	case "dec": 
            	if (token.value == ".") {
            		token.value = 0;
            	} else {
            		token.value = parseFloat(token.value, 10);
            	}
                break;
        }
    }
}

function evaluateExpression(postFix) {
	var stack = [];
    var i;
    for (i = 0; i < postFix.length; i++) {
    	var token = postFix[i];
        switch(token.type) {
        	case "dec":
            	stack.push(token);
                break;
            case "+":
            	var token1 = stack.pop();
                var token2 = stack.pop();
                if (typeof token1 === "undefined" || typeof token2 === "undefined") {
                	return "Error";
                }
                var token3 = new Token(token2.value + token1.value, "dec");
                stack.push(token3);
                break;
            case "-":
                var token1 = stack.pop();
                var token2 = stack.pop();
                if (typeof token1 === "undefined" || typeof token2 === "undefined") {
                	return "Error";
                }
                var token3 = new Token(token2.value - token1.value, "dec");
                stack.push(token3);
                break;
            case "*":
                var token1 = stack.pop();
                var token2 = stack.pop();
                if (typeof token1 === "undefined" || typeof token2 === "undefined") {
                	return "Error";
                }
                var token3 = new Token(token2.value * token1.value, "dec");
                stack.push(token3);
                break;
            case "/":
                var token1 = stack.pop();
                var token2 = stack.pop();
                if (typeof token1 === "undefined" || typeof token2 === "undefined") {
                	return "Error";
                }
                var token3 = new Token(token2.value / token1.value, "dec");
                stack.push(token3);
                break;
            case "_":
            	var token1 = stack.pop();
                if (typeof token1 === "undefined") {
                	return "Error";
                }
                var token3;
                if (token1.value == Math.abs(token1.value)) {
                	token3 = new Token(-Math.abs(token1.value), "dec");
                } else {
                	token3 = new Token(Math.abs(token1.value), "dec");
                }
                stack.push(token3);
                break;
        }
    }
    if (stack.length != 1) {
    	return "Error";
    } else {
    	return stack[0].value;
    }
}

function calculate(input) {
   	var tokenList = [];
    var postFix = [];
    tokenize(input, tokenList);
    var result = "";
    toPostFix(tokenList, postFix);
    evaluateNumber(postFix);
    var DecimalResult = evaluateExpression(postFix);
    return DecimalResult;
}

</script>


