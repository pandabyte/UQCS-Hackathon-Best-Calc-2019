roman = ["I", "V", "X", "C", "D", "M", "L", "S", "."];

roman = ["I", "V", "X", "C", "D", "M", "L", "S", "."];

romanValueDict = [
	{key: 1, value: "I"},
    {key: 4, value: "IV"},
    {key: 5, value: "V"},
    {key: 9, value: "IX"},
    {key: 10, value: "X"},
    {key: 40, value: "XL"},
    {key: 50, value: "L"},
    {key: 90, value: "XC"},
    {key: 100, value: "C"},
    {key: 400, value: "CD"},
    {key: 500, value: "D"},
    {key: 900, value: "CM"},
    {key: 1000, value: "M"},
    {key: 1000000, value: "Mbar"},
]

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
        default:
        	return -1;
    }
}

function tokenize(inputStr, tokenList) {
    var i;
    input = inputStr.split('');
    for (i = 0; i < input.length; i++) {
    	var tokenStr = "";
        var current = input[i];
        if (current == "+" || current == "-" || current == "*" || current == "/") {
            // operator
            var token = new Token(current, current);
            tokenList.push(token);
        } else if (current == "(") {
        	var token = new Token(current, "left");
            tokenList.push(token);
        } else if (current == ")") {
        	var token = new Token(current, "right");
            tokenList.push(token);
        } else if (current == " ") {
        
        } else {
            // number, not an operator
            tokenStr = current;
            while (i + 1 < input.length && roman.includes(input[i + 1], 0)) {
                i++;
                tokenStr = tokenStr + input[i];
            }
            var token = new Token(tokenStr, "Roman");
            tokenList.push(token);
        }
    }
}

function check(a)
{
	if (a == "I")  {return (1)}
	else if (a == "V") {return (5)}
	else if (a == "X") {return (10)}
	else if (a == "L") {return (50)}
	else if (a == "C") {return (100)}
	else if (a == "D") {return (500)}
	else if (a == "M") {return (1000)}
    else if (a == "S") {return (0.5)}
    else if (a == ".") {return (1/12)}
}


function translate(s)
{
	curr = 0
	past = -1
	total = 0
	for (var i = 0; i < s.length; i++) {
		curr = check(s[i])
        if (curr == 0.5 || curr == 1/12) {
        	do {
            	total += curr;
        		i++;
                curr = check(s[i]);
        	} while (i < s.length && (curr == 0.5 || curr == 1/12));
            break;
        }
		if (past == -1)  
			{
				total += curr
			}
		else
			{
		  		if (past < curr)
		  			{
		  				total = total - past + ( curr - past)
		  			}
		  		else 
		  			{
		  				total += curr
		  			}	
			}
		past = curr
	}

	return total
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
            case "+": case "-": case "*": case "/":
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
        	case "Roman": 
            	token.value = translate(token.value);
                token.type = "dec";
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
                var token3 = new Token(token2.value + token1.value, "dec");
                stack.push(token3);
                break;
            case "-":
                var token1 = stack.pop();
                var token2 = stack.pop();
                var token3 = new Token(token2.value - token1.value, "dec");
                stack.push(token3);
                break;
            case "*":
                var token1 = stack.pop();
                var token2 = stack.pop();
                var token3 = new Token(token2.value * token1.value, "dec");
                stack.push(token3);
                break;
            case "/":
                var token1 = stack.pop();
                var token2 = stack.pop();
                var token3 = new Token(token2.value / token1.value, "dec");
                stack.push(token3);
                break;
        }
    }
    return stack[0].value;
}

function toRoman(decimal) {
	var output = "";
    fraction = decimal - Math.floor(decimal);
    decimal = Math.floor(decimal);
	while (decimal > 0) {
    	var i;
    	for (i = 0; i < romanValueDict.length - 1; i++) {
            if (decimal >= romanValueDict[i].key && decimal < romanValueDict[i + 1].key) {
                decimal = decimal - romanValueDict[i].key;
                output += romanValueDict[i].value;
            }
        }
    }
    output += toRomanFraction(fraction)
    return output;
}

function toRomanFraction(fraction) {
	var roundedNumerator = Math.round(fraction * 12);
    var output = "";
    if (roundedNumerator >= 6) {
    	output += "S";
        roundedNumerator -= 6;
    }
    var i;
    for (i = 0; i < roundedNumerator; i++) {
    	output += "."
    }
    return output;
}

function toDecimal(Roman) {
	var roman = Roman.split('');
    var i;  var j;
    var current; var next;
    var result = 0;
    for (i = 0; i < roman.length; i++) {
    	current = roman[i];
        if (i + 1 < roman.length) {
        	next = roman[i + 1];
            if (next < current) {
            	for (j = 0; j < romanValueDict.length; j++) {
                	if (current == romanValueDict[j].value) {
                    	result += romanValueDict[j].key;
                	}
            	}
            } else {
                i++;
            	var temp = current + next;
            	for (j = 0; j < romanValueDict.length; j++) {
                	if (temp == romanValueDict[j].value) {
                    	result += romanValueDict[j].key;
                	}
            	}
            }
        } else {
            for (j = 0; j < romanValueDict.length; j++) {
                if (current == romanValueDict[j].value) {
                    result += romanValueDict[j].key;
                }
            }
        }
    }
    return result;
}

function validate(tokenList) {
	var i;
    for (var i = 0; i < tokenList.length; i++) {
    	var current = tokenList[i];
        if (current.type == "Roman") {
        	var value = translate(current.value);
    		var trueForm = toRoman(value);
    		if (trueForm != current.value) {
            	return false;
            }
        }
    }
    return true;
}

function calculateRoman(input) {
   	var tokenList = [];
    var postFix = [];
    tokenize(input, tokenList);
    if (validate(tokenList)) {
    	var result = "";
    	toPostFix(tokenList, postFix);
    	evaluateNumber(postFix);
    	var DecimalResult = evaluateExpression(postFix);
        if (DecimalResult < 0) {
        	result += "-";
            DecimalResult = -DecimalResult;
        }
        else if (DecimalResult == 0)
        	{return 0;	}
    	fractionPart = DecimalResult - Math.floor(DecimalResult);
        // guard for rounding
        if (fractionPart > 0.999999) {
        	fractionPart = 0;
            result += toRoman(Math.ceil(DecimalResult));
        } else {
        	result += toRoman(Math.floor(DecimalResult));
    		result += toRomanFraction(fractionPart);
        }
        return result;
    } else {
    	//Error here
        return "Error";
    }
}

function equalRoman()
{
	s = document.getElementById("numDisplay").value
	num = calculateRoman(s);
	document.getElementById("resDisplay").style.display = "flex"
	document.getElementById("resDisplay").innerHTML = "Result: " + num

}



function Decimal()
{
	document.getElementById("result1").innerHTML = "Mode: Decimal"
	document.getElementById("decimalCalc").style.display = "table"
	document.getElementById("romanCalc").style.display = "none"
	document.getElementById("numDisplay").innerHTML = "	"
}


function Roman()
{
	document.getElementById("result1").innerHTML = "Mode: Roman"
	document.getElementById("decimalCalc").style.display = "none"
	document.getElementById("romanCalc").style.display = 'table'
	document.getElementById("numDisplay").innerHTML = ""
}

function addDisplay(myField, num)
{
	if (myField.selectionStart ) {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + num
                + myField.value.substring(endPos, myField.value.length);
        } else {
            myField.value += num;
        }
	
}

function deleteOne()
{
	document.getElementById("numDisplay").value = document.getElementById("numDisplay").value.slice(0, -1)
	document.getElementById("resDisplay").innerHTML = "Result: -"
}

function deleteAll(){
	document.getElementById("numDisplay").value = ""
	document.getElementById("resDisplay").innerHTML = "Result: -"
}


// Decimal Calculation





function tokenizeD(inputStr, tokenList) {
    var i;
    input = inputStr.split('');
    for (i = 0; i < input.length; i++) {
    	var tokenStr = "";
        var current = input[i];
        if (current == "+" || current == "-" || current == "*" || current == "/") {
            // operator
            var token = new Token(current, current);
            tokenList.push(token);
        } else if (current == "(") {
        	var token = new Token(current, "left");
            tokenList.push(token);
        } else if (current == ")") {
        	var token = new Token(current, "right");
            tokenList.push(token);
        } else if (current == " ") {
        
        } else {
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



function toPostFixD(inFix, postFix) {
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
            case "+": case "-": case "*": case "/":
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

function evaluateNumberD(postFix) {
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

function evaluateExpressionD(postFix) {
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
        }
    }
    if (stack.length != 1) {
    	return "Error";
    } else {
    	return Math.round(stack[0].value * 1000) / 1000;
    }
    
}

function calculateDecimal(input) {
   	var tokenList = [];
    var postFix = [];
    tokenizeD(input, tokenList);
    var result = "";
    toPostFixD(tokenList, postFix);
    evaluateNumberD(postFix);
    var DecimalResult = evaluateExpressionD(postFix);
    return DecimalResult;
}

function equalDecimal(){
	s = document.getElementById("numDisplay").value
	num = calculateDecimal(s);
	document.getElementById("resDisplay").style.display = "flex"
	document.getElementById("resDisplay").innerHTML = "Result: " + num
}