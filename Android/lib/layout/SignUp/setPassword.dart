// ignore_for_file: file_names, avoid_print, non_constant_identifier_names, avoid_init_to_null, unused_local_variable, unnecessary_new, unused_import

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:whisper/layout/SignUp/VerifyEmail.dart';
import 'package:whisper/layout/SignUp/setUsername.dart';
import 'package:whisper/models/TextFieldValidation.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// ignore: camel_case_types
class setPassword extends StatefulWidget {
  final String email;
  final String token;
  const setPassword({
    Key? key,
    required this.email,
    required this.token,
  }) : super(key: key);
  @override
  _setPassword createState() => _setPassword();
}

// ignore: camel_case_types
class _setPassword extends State<setPassword> {
  final formKey = GlobalKey<FormState>();
  TextEditingController SetPassController = new TextEditingController();
  bool _isObscure = true;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(
            Icons.arrow_back_ios,
            size: 20,
            color: Colors.black,
          ),
        ),
      ),
      body: SizedBox(
        height: MediaQuery.of(context).size.height,
        width: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Column(
                    children: const <Widget>[
                      Text(
                        " Enter a password",
                        style: TextStyle(
                            fontSize: 30, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 40),
                    child: Form(
                      key: formKey,
                      child: Column(
                        children: <Widget>[
                          const SizedBox(height: 5),
                          TextFormField(
                              obscureText: _isObscure,
                              obscuringCharacter: "*",
                              controller: SetPassController,
                              decoration: InputDecoration(
                                prefixIcon: const Icon(
                                  Icons.password,
                                  color: Color.fromARGB(179, 255, 0, 0),
                                ),
                                suffixIcon: IconButton(
                                  icon: Icon(_isObscure
                                      ? Icons.visibility_off
                                      : Icons.visibility),
                                  onPressed: () {
                                    setState(() {
                                      _isObscure = !_isObscure;
                                    });
                                  },
                                ),
                                filled: true,
                                floatingLabelBehavior:
                                    FloatingLabelBehavior.never,
                                fillColor:
                                    const Color.fromARGB(255, 179, 177, 177)
                                        .withOpacity(0.3),
                                labelText: "Set Password",
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(15),
                                    borderSide: const BorderSide(
                                        width: 0, style: BorderStyle.none)),
                              ),
                              validator: (value) =>
                                  SetPassFieldValidator.validate(value!)),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 70),
                    child: Container(
                      padding: const EdgeInsets.only(top: 0, left: 0),
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(50),
                          border: const Border(
                            bottom: BorderSide(color: Colors.black),
                            top: BorderSide(color: Colors.black),
                            left: BorderSide(color: Colors.black),
                            right: BorderSide(color: Colors.black),
                          )),
                      child: MaterialButton(
                        minWidth: double.infinity,
                        height: 60,
                        onPressed: () {
                          if (formKey.currentState!.validate()) {
                            SetPass(SetPassController.text, widget.email,
                                widget.token);
                          }
                        },
                        color: const Color(0xff0095FF),
                        elevation: 5,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50),
                        ),
                        child: const Text(
                          "Next",
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 18,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  SetPass(
    String password,
    String email,
    String token,
  ) async {
    Map data = {'password': password, 'email': email, 'x-auth-token': token};
    var jsonData = null;
    Map mapResponse;
    Map dataResponse;
    var response = await http.patch(
      Uri.parse(
          //"http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/signUp/setPassword"
          "http://localhost:10.0.2.2/signUp/setPassword"),
      body: data,
      headers: {"x-auth-token": token},
    );
    if (response.statusCode == 200) {
      setState(() {
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(
                builder: (BuildContext context) =>
                    setUsername(email: email, token: token)),
            (Route<dynamic> route) => false);
        showModalBottomSheet<void>(
          context: context,
          builder: (BuildContext context) {
            return Container(
              height: 200,
              color: const Color.fromARGB(0, 255, 255, 255),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Text(
                      response.body,
                      style: const TextStyle(
                        color: Color(0xff0095FF),
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      });
    } else if (response.statusCode == 400) {
      setState(() {
        showModalBottomSheet<void>(
          context: context,
          builder: (BuildContext context) {
            return Container(
              height: 200,
              color: const Color.fromARGB(0, 255, 255, 255),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: const <Widget>[
                    Text(
                      //response.body,
                      "Invalid password- criteria: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1",
                      //dataResponse["msg"].toString(),
                      style: TextStyle(
                        color: Color(0xff0095FF),
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      });
    } else if (response.statusCode == 403) {
      setState(() {
        showModalBottomSheet<void>(
          context: context,
          builder: (BuildContext context) {
            return Container(
              height: 200,
              color: const Color.fromARGB(0, 255, 255, 255),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Text(
                      response.body,
                      style: const TextStyle(
                        color: Color(0xff0095FF),
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      });
    }
  }
}
