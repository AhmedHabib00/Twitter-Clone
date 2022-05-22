// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:whisper/layout/SignUp/signup.dart';

void main() {
  testWidgets("Signup Page", (WidgetTester tester) async {
    //find all widgets needed
    var textField = find.byType(TextFormField);

    //execute the actual test
    await tester.pumpWidget(
      const MaterialApp(
        home: SignUpPage(),
      ),
    );

    //rebuilds your widgets
    await tester.pump();

    //check outputs
    //expect(textField, findsWidgets);
    expect(textField, findsWidgets);
  });
}
