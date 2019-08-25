import 'package:flutter/material.dart';

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
  String _input = '';

  FlatButton b(String value) {
    return FlatButton(
      onPressed: () {
        setState(() {
          _input += value;
        });
      },
      child: Text(value),
    );
  }

  List<Expanded> generateButtons() {
    var buttonTexts = [
      [
        b('M'),
        FlatButton(
          onPressed: () {
            setState(() {
              _input = '';
            });
          },
          child: Text('Clear'),
        ),
        b('/'),
      ],
      [b('C'), b('D'), b('*')],
      [b('X'), b('L'), b('-')],
      [b('I'), b('V'), b('+')],
      [b(''), b(''), b('=')],
    ];

    return List.from(
      buttonTexts.map(
        (row) => Expanded(
          child: Row(
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
          Text(_input),
          ...generateButtons(),
        ],
      ),
    );
  }
}
