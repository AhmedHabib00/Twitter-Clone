// ignore_for_file: file_names, non_constant_identifier_names
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:whisper/layout/Login/login.dart';

void main() {
  testWidgets("Login Page", (WidgetTester tester) async {
    //find all widgets needed
    final textField = find.byType(TextFormField);
    final LoginButton = find.byKey(const ValueKey("LoginButton"));

    //execute the actual test
    await tester.pumpWidget(
      const MaterialApp(
        home: LoginPage(),
      ),
    );
    await tester.tap(LoginButton);
    await tester.pump(); //rebuilds your widgets

    //check outputs
    expect(textField, findsWidgets);
    expect(LoginButton, findsOneWidget);
  });
}
