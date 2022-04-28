// ignore_for_file: file_names, unused_import

import 'package:flutter/material.dart';
import 'package:whisper/layout/Login/login.dart';

//Email: !RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w]{2,4}').hasMatch(value))
class NameFieldValidator {
  NameFieldValidator(String? value);

  static String? validate(String value) {
    if (value.isEmpty || !RegExp(r'^[a-z A-Z 0-9]').hasMatch(value)) {
      return "Enter correct Name";
    } else {
      return null;
    }
  }
}

class EmailFieldValidator {
  EmailFieldValidator(String? value);

  static String? validate(String value) {
    if (value.isEmpty || !RegExp(r'^[a-z A-Z 0-9 . @ ]+$').hasMatch(value)) {
      return "Enter correct Email or Username";
    } else {
      return null;
    }
  }
}

class PassFieldValidator {
  PassFieldValidator(String? value);

  static String? validate(String value) {
    if (value.isEmpty || !RegExp(r'^[a-z A-Z 0-9 $]+$').hasMatch(value)) {
      return "Enter correct Password";
    } else {
      return null;
    }
  }
}

class ForgetPassFieldValidator {
  ForgetPassFieldValidator(String? value);

  static String? validate(String value) {
    if (value.isEmpty || !RegExp(r'^[a-z A-Z 0-9 - _ . @]+$').hasMatch(value)) {
      return "Enter correct email or Username";
    } else {
      return null;
    }
  }
}

class ForgetPassVerifyFieldValidator {
  ForgetPassVerifyFieldValidator(String? value);

  static String? validate(String value) {
    if (value.isEmpty || !RegExp(r'^[a-z A-Z]+$').hasMatch(value)) {
      return "Enter correct code";
    } else {
      return null;
    }
  }
}

class DateOfBirthFieldValidator {
  DateOfBirthFieldValidator(String? value);
  static String? validate(String value) {
    if (value.isEmpty) {
      return 'Enter correct date of birth';
    } else {
      return null;
    }
  }
}

class VerifyEmailFieldValidator {
  VerifyEmailFieldValidator(String? value);

  static String? validate(String value) {
    if (value.isEmpty || !RegExp(r'^[0-9]+$').hasMatch(value)) {
      return "Enter correct code";
    } else {
      return null;
    }
  }
}

class SetPassFieldValidator {
  SetPassFieldValidator(String? value);

  static String? validate(String value) {
    if (value.isEmpty || !RegExp(r'^[a-z A-Z 0-9 $]+$').hasMatch(value)) {
      return "Enter correct Password";
    } else {
      return null;
    }
  }
}

class SetUsernameFieldValidator {
  SetUsernameFieldValidator(String? value);
  static String? validate(String value) {
    if (value.isEmpty || !RegExp(r'^[a-z A-Z 0-9]').hasMatch(value)) {
      return "Enter correct Username";
    } else {
      return null;
    }
  }
}
