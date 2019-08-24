<script>

document.write("<b>LESSON 1: PRINT HELLO WORLD USING VARIABLES</b><br><br>");

// To start we will create 2 variables:
var variable1 = 'Hello ';
var variable2 = 'World!<br><br>'; // <br> means line break in html
 
// Create a third variable by adding both variables:
var final_text = variable1 + variable2;

// Print the final result:
document.write(final_text);

roman = ["I", "V", "X", "C", "D", "M", "L"];

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
    {key: 1000, value: "M"}
]
// Create a loop of 10 elements.
// Variable "i" starts with value 1 and while i<=10 it will increment 1 (i=i+1) 
for (var i=1; i<=10; i=i+1) {

  document.write(i); // Print the current "i" number

  // Print a comma followed by a space if i < 10
  if (i<10) {
    document.write(", ");
  }
}

function show_random_number() {

  var random_number = Math.random(); // generate random number between 0 and 1
  alert(random_number); // show popup with a random number
  
}

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
}


function translate(s)
{
	curr = 0
	past = -1
	total = 0
	for (var i = 0; i < s.length; i++) {
		curr = check(s[i])
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
		console.log(total)	
	}

	result = total
	console.log(s,"in decimal is ",result)
	return result
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
    document.write(stack[0].value);
}

function toRoman(decimal) {
	var output = "";
	while (decimal > 0) {
    	var i;
    	for (i = 0; i < romanValueDict.length - 1; i++) {
            if (decimal >= romanValueDict[i].key && decimal < romanValueDict[i + 1].key) {
                decimal = decimal - romanValueDict[i].key;
                output += romanValueDict[i].value;
            }
        }
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
                    	document.write(romanValueDict[j].key + "<br>");
                    	result += romanValueDict[j].key;
                	}
            	}
            } else {
                i++;
            	var temp = current + next;
            	for (j = 0; j < romanValueDict.length; j++) {
                	if (temp == romanValueDict[j].value) {
                    	document.write(romanValueDict[j].key + "<br>");
                    	result += romanValueDict[j].key;
                	}
            	}
            }
        } else {
            for (j = 0; j < romanValueDict.length; j++) {
                if (current == romanValueDict[j].value) {
                	document.write(romanValueDict[j].key + "<br>");
                    result += romanValueDict[j].key;
                }
            }
        }
    }
    document.write(result);
    return result;
}

var input = "VIII+XV*V";
inputStr = input.split();
document.write('<br>');
for (i = 0; i < inputStr.length; i++) {
	document.write(inputStr[i]);
}
document.write('<br>' + input.length + '<br>');
var tokenList = [];
var postFix = [];
tokenize(input, tokenList);
displayList(tokenList);
toPostFix(tokenList, postFix);
displayList(postFix);
evaluateNumber(postFix);
displayList(postFix);
evaluateExpression(postFix);
//var output = toRoman(49);

//document.write(translate("XIV"));
</script>

<p style="color: green">
The content above was created with JavaScript.<br>
This content is created with <b>HTML</b>.<br>
You can edit JavaScript and HTML in the left part of the page
and click "<b>Run code</b>" to view results in the right part of the page.
</p>
<b>LESSON 4: CALL A JAVASCRIPT FUNCTION:</b>
<input type=button onClick="show_random_number()" value="Generate random number">
