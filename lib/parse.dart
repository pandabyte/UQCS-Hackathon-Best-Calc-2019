int parseRoman(String roman) {
  const digits = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000,
  };

  var result = 0;
  for (var i = 0; i < roman.length; i++) {
    var value = digits[roman[i]];

    if (value == null) {
      return null;
    }

    result += value;
  }

  return result;
}