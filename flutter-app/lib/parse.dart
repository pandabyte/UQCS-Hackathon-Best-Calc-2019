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
  if (roman == 'N') {
    return 0;
  }

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

    // Cannot have 4 consecutive characters of the same value
    if (i >= 3 && values[i - 3] == value) {
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

  if (values.length == 0) {
    return null;
  }

  return values.reduce((a, b) => a + b);
}

String generateRoman(int number) {
  if (number == 0) {
    return 'N';
  }

  var roman = StringBuffer();

  if (number < 0) {
    roman.write('-');
    number = -number;
  }

  // Separate digits by decimal place value
  var digits = number.toString().split('').map((digit) => num.parse(digit));

  var place = digits.length - 1;
  for (var digit in digits) {
    var remaining = digit;
    var romanDigit1 = ROMAN_SYMBOL[pow(10, place)];
    if (digit != 5 && romanDigit1 == null) {
      return null;
    }
    // If digit is not 5 then romanDigit1 is not null

    if (digit == 9) {
      var romanDigit10 = ROMAN_SYMBOL[pow(10, place + 1)];
      if (romanDigit10 == null) {
        return null;
      }
      roman.write(romanDigit1 + romanDigit10);
      remaining = 0;
    } else if (digit >= 4) {
      if (digit == 4) {
        roman.write(romanDigit1);
        remaining += 1;
      }
      var romanDigit5 = ROMAN_SYMBOL[5 * pow(10, place)];
      if (romanDigit5 == null) {
        return null;
      }
      roman.write(romanDigit5);
      remaining -= 5;
    }

    for (var i = 0; i < remaining; i++) {
      roman.write(romanDigit1);
    }
    place--;
  }
  return roman.toString();
}
