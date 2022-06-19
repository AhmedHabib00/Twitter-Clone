// ignore_for_file: file_names, avoid_print, unused_import, duplicate_ignore, must_be_immutable, unnecessary_new, unused_local_variable, avoid_init_to_null

import 'package:flutter/material.dart';
// ignore: unused_import
import 'package:intl/intl.dart';
import 'package:whisper/layout/Login/ForgotPassSetPass.dart';
import 'package:whisper/layout/Login/login.dart';
import 'package:whisper/models/TextFieldValidation.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ForgotPassCodeVerify extends StatefulWidget {
  String emailOrUsername;
  ForgotPassCodeVerify({Key? key, required this.emailOrUsername})
      : super(key: key);
  @override
  _ForgotPassCodeVerify createState() => _ForgotPassCodeVerify();
}

class _ForgotPassCodeVerify extends State<ForgotPassCodeVerify> {
  final formKey = GlobalKey<FormState>();
  TextEditingController forgotPassCodeController = new TextEditingController();
  late final String token = '';

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
                        "Forgot Password verification",
                        style: TextStyle(
                            fontSize: 25, fontWeight: FontWeight.bold),
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
                            controller: forgotPassCodeController,
                            keyboardType: TextInputType.text,
                            obscureText: _isObscure,
                            obscuringCharacter: "*",
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
                              labelText: "Enter Verification code",
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(15),
                                  borderSide: const BorderSide(
                                      width: 0, style: BorderStyle.none)),
                            ),
                            validator: (value) =>
                                ForgetPassVerifyFieldValidator.validate(value!),
                          ),
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
                            forgotPassCode(widget.emailOrUsername,
                                forgotPassCodeController.text, token);
                          }
                        },
                        color: const Color(0xff0095FF),
                        elevation: 5,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50),
                        ),
                        child: const Text(
                          "Confirm",
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

  forgotPassCode(
    String email,
    String code,
    String token,
  ) async {
    Map data = {
      'emailOrUsername': email,
      'code': code,
    };
    var jsonData = null;
    Map mapResponse;
    Map dataResponse;
    var response = await http.post(
      Uri.parse(
          //"http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/forgotPassword/codeVerification"),
          "http://10.0.2.2:8080/forgotPassword/codeVerification"),
      body: data,
    );
    if (response.statusCode == 200) {
      print(response.body);
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse;
      //    Token /////////
      token = dataResponse["x-auth-token"];
      //    Token ////////
      setState(() {
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(
                builder: (BuildContext context) => ForgotPassSetPass(
                      email: email,
                      token: token,
                    )),
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
                      dataResponse["massege"].toString(),
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
    } else if (response.statusCode == 404) {
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
