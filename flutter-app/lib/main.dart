import 'package:flutter/material.dart';
import 'dart:math';

import 'parse.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Best Calc',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: RomanCalculator(title: 'Roman Calculator'),
    );
  }
}

class RomanCalculator extends StatefulWidget {
  RomanCalculator({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _RomanCalculatorState createState() => _RomanCalculatorState();
}

class _RomanCalculatorState extends State<RomanCalculator> {
  bool _error = false;
  int _result = 0;
  String _input = '';
  String _operation = '';

  FlatButton numberButton(String value) {
    return FlatButton(
      onPressed: () {
        setState(() {
          _error = false;
          _input += value;
        });
      },
      child: Text(value),
    );
  }

  FlatButton operationButton(String value) {
    return FlatButton(
      onPressed: () {
        setState(() {
          var parseResult = parseRoman(_input);
          if (parseResult == null) {
            _error = true;
          } else {
            switch (_operation) {
              case '+':
                _result += parseResult;
                break;
              case '-':
                _result -= parseResult;
                break;
              case '*':
                _result *= parseResult;
                break;
              case '/':
                _result = _result ~/ parseResult;
                break;
            }
            _input = '';
            _operation = value;
          }
        });
      },
      child: Text(value),
    );
  }

  List<Expanded> generateButtons() {
    var buttonTexts = [
      [
        numberButton('M'),
        FlatButton(
          onPressed: () {
            setState(() {
              _error = false;
              _input = _input.substring(0, max(_input.length - 1, 0));
            });
          },
          child: Text('Del'),
        ),
        operationButton('/'),
      ],
      [numberButton('C'), numberButton('D'), operationButton('*')],
      [numberButton('X'), numberButton('L'), operationButton('-')],
      [numberButton('I'), numberButton('V'), operationButton('+')],
      [
        numberButton(''),
        FlatButton(
          onPressed: () {
            setState(() {
              _error = false;
              _result = 0;
              _input = '';
            });
          },
          child: Text('Clear'),
        ),
        FlatButton(
          onPressed: () {
            var parseResult = parseRoman(_input);
            setState(() {
              if (parseResult == null) {
                _error = true;
              } else {
                switch (_operation) {
                  case '+':
                    _result += parseResult;
                    break;
                  case '-':
                    _result -= parseResult;
                    break;
                  case '*':
                    _result *= parseResult;
                    break;
                  case '/':
                    _result = _result ~/ parseResult;
                    break;
                }
                _input = '';
              }
            });
          },
          child: Text('='),
        ),
      ],
    ];

    return List.from(
      buttonTexts.map(
        (row) => Expanded(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: List.from(row.map((button) => Expanded(child: button))),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(
        children: <Widget>[
          Text(_error ? 'nope' : (_input == '' ? generateRoman(_result) : _input)),
          ...generateButtons(),
        ],
      ),
    );
  }
}
