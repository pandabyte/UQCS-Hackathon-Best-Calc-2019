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
  String display = '';

  Table generateButtons() {
    var buttonTexts = [
      ['M', '', '/'],
      ['C', 'D', '*'],
      ['X', 'L', '-'],
      ['I', 'V', '+'],
      ['', '', '='],
    ];

    return Table(
      children: List.from(buttonTexts.map(
        (row) => TableRow(
          children: List.from(
            row.map(
              (label) => FlatButton(
                onPressed: () {},
                child: Text(label),
              ),
            ),
          ),
        ),
      )),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: ConstrainedBox(
        constraints: const BoxConstraints.expand(),
        child: Column(
          children: <Widget>[
            Text('Input'),
            generateButtons(),
          ],
        ),
      ),
    );
  }
}
