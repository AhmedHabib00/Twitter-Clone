// ignore_for_file: file_names

import 'package:test/test.dart';
import 'package:whisper/models/Validation.dart';

void main() {
  test('Email -Empty- return error string', () {
    var result = EmailFieldValidator.validate('');
    expect(result, 'Enter correct email');
  });

  test('Email -Non-Empty- return null', () {
    var result = EmailFieldValidator.validate('email@gmail.com');
    expect(result, null);
  });

  test('Password -Empty- return error string', () {
    var result = PassFieldValidator.validate('');
    expect(result, 'Enter correct Password');
  });

  test('Password -Non-Empty- return null', () {
    var result = PassFieldValidator.validate('testpass1234');
    expect(result, null);
  });

  test('ForgetpassEmail Empty return error string', () {
    var result = ForgetPassFieldValidator.validate('');
    expect(result, 'Enter correct email');
  });

  test('ForgetpassEmail -Non-Empty- return null', () {
    var result = ForgetPassFieldValidator.validate('email@gmail.com');
    expect(result, null);
  });

  test('Date -Empty- return error string', () {
    var result = DateOfBirthFieldValidator.validate('');
    expect(result, 'Enter correct date of birth');
  });
  test('Date -Non-Empty- return null', () {
    var result = DateOfBirthFieldValidator.validate('2022-04-05');
    expect(result, null);
  });

  test('VerifyEmail -Empty- return error string', () {
    var result = VerifyEmailFieldValidator.validate('');
    expect(result, 'Enter correct code');
  });
  test('VerifyEmail -Non-Empty- return null', () {
    var result = VerifyEmailFieldValidator.validate('12354');
    expect(result, null);
  });
  test('SetPass -Empty- return error string', () {
    var result = SetPassFieldValidator.validate('');
    expect(result, 'Enter correct Password');
  });
  test('SetPass -Non-Empty- return null', () {
    var result = SetPassFieldValidator.validate('android12345');
    expect(result, null);
  });
  test('SetUsername -Empty- return error string', () {
    var result = SetUsernameFieldValidator.validate('');
    expect(result, 'Enter correct Username');
  });
  test('SetUsername -Non-Empty- return null', () {
    var result = SetUsernameFieldValidator.validate('ET1254');
    expect(result, null);
  });
}
