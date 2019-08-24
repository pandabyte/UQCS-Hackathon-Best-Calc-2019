import 'dart:math';

const ROMAN_VALUE = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000,
};

const ROMAN_SYMBOL = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M',
};

bool isPowerOfTen(int number) {
  return (log(number) / ln10) % 1 == 0;
}

/* Parses a Roman numeral string and returns its integer value or null if it is
 * invalid.
 */
int parseRoman(String roman) {
  var values = <int>[];
  for (var i = 0; i < roman.length; i++) {
    var value = ROMAN_VALUE[roman[i]];

    // Check invalid character
    if (value == null) {
      return null;
    }

    // Check for consecutive 5s
    if (i >= 1 && values[i - 1] == value && !isPowerOfTen(value)) {
      return null;
    }

    // Values after a subtraction must be smaller than the subtracting value
    if (i >= 2 && values[i - 2] < 0 && -values[i - 2] <= value) {
      return null;
    }

    // Subtractions
    if (i >= 1 && values[i - 1] < value) {
      if (!isPowerOfTen(values[i - 1])) {
        // Previous character is not a power of 10
        return null;
      }

      var prevFactor = value / values[i - 1];
      if (prevFactor != 5.0 && prevFactor != 10.0) {
        // Current value is more than 10x the previous value
        return null;
      }

      if (i >= 2) {
        if (values[i - 2] < value) {
          // Both previous two characters are lower value than current character
          return null;
        }

        if (!isPowerOfTen(value) && !isPowerOfTen(values[i - 2])) {
          return null;
        }
      }

      values[i - 1] = values[i - 1] * -1;
    }

    values.add(value);
  }

  return values.reduce((a, b) => a + b);
}

String generateRoman(int number) {
  return ROMAN_SYMBOL[number];
}
