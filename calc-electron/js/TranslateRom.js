function check(a)
{
	if (a == "I")  {return (1)}
	else if (a == "V") {return (5)}
	else if (a == "X") {return (10)}
	else if (a == "L") {return (50)}
	else if (a == "C") {return (100)}
	else if (a == "D") {return (500)}
	else if (a == "M") {return (1000)}
	else if (a == ".") {return (1/12)} 
	else if (a == "S") {return (1/2)}	
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

function doTranslate()
{
	num = translate(document.getElementById("firstNum").value);	
	document.getElementById("result1").innerHTML = "The decimal of the number is " + num
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

function addDisplay(num)
{
	document.getElementById("numDisplay").value += num
}

function deleteOne()
{
	document.getElementById("numDisplay").value = document.getElementById("numDisplay").value.slice(0, -1)
}

function deleteAll(){
	document.getElementById("numDisplay").value = ""
}
