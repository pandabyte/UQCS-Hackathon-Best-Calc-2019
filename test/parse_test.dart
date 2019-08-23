import 'package:flutter_test/flutter_test.dart';

import 'package:best_calc/parse.dart';

void main() {
  test('Check simple roman numbers', () {
    const digits = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000,
    };

    digits.forEach(
      (symbol, value) => expect(
        parseRoman(symbol),
        equals(value),
      ),
    );
  });
}
