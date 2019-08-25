import 'package:flutter_test/flutter_test.dart';

import 'package:best_calc/parse.dart';

void main() {
  test('Test parsing valid roman numbers', () {
    const parseResults = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000,
      'VII': 7,
      'CXI': 111,
      'IV': 4,
      'IX': 9,
      'XC': 90,
      'XIX': 19,
      'XCI': 91,
    };

    parseResults.forEach(
      (symbol, result) => expect(parseRoman(symbol), equals(result)),
    );
  });

  test('Test parsing invalid roman numbers', () {
    [
      'A', // Invalid characters
      'XAI',
      'IC', // Invalid ordering
      'VX',
      'IIV',
      'VV',
      'VIV',
      'IVI',
      'IIII',
    ].forEach(
      (symbol) => expect(parseRoman(symbol), equals(null)),
    );
  });

  test('Test generating roman numbers', () {
    const generateResults = {
      1: 'I',
      5: 'V',
      10: 'X',
      50: 'L',
      100: 'C',
      500: 'D',
      1000: 'M',
      7: 'VII',
      101: 'CI',
      4: 'IV',
      9: 'IX',
    };

    generateResults.forEach(
      (number, result) => expect(generateRoman(number), equals(result)),
    );
  });
}
