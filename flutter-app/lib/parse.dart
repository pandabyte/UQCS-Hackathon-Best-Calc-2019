import 'dart:math';

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
      // Previous character is lower value than current character
      if ((log(values[i - 1]) / ln10) % 1 != 0) {
        // Previous character is not a power of 10
        return null;
      }

      var prevFactor = value / values[i - 1];
      if (prevFactor != 5.0 && prevFactor != 10.0) {
        return null;
      }

      values[i - 1] = values[i - 1] * -1;
    }

    values.add(value);
  }

  return values.reduce((a, b) => a + b);
}
