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

  var values = <int>[];
  for (var i = 0; i < roman.length; i++) {
    var value = digits[roman[i]];

    // Check invalid character
    if (value == null) {
      return null;
    }

    // Check invalid ordering
    if (i >= 1 && values[i - 1] < value) {
      return null;
    }

    values.add(value);
  }

  return values.reduce((a, b) => a + b);
}