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
    };

    parseResults.forEach(
      (symbol, value) => expect(parseRoman(symbol), equals(value)),
    );
  });

  test('Test parsing invalid roman numbers', () {
    [
      'A', // Invalid characters
      'XAI',
      'IC', // Invalid ordering
      'VX',
    ].forEach(
      (symbol) => expect(parseRoman(symbol), equals(null)),
    );
  });
}
