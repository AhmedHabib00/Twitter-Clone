// ignore_for_file: file_names, avoid_print, unused_import, non_constant_identifier_names, unnecessary_new, unused_local_variable, avoid_init_to_null

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:whisper/layout/SignUp/setPassword.dart';
import 'package:whisper/models/TextFieldValidation.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class VerifyEmail extends StatefulWidget {
  final String email;
  const VerifyEmail({Key? key, required this.email}) : super(key: key);
  @override
  _VerifyEmail createState() => _VerifyEmail();
}

class _VerifyEmail extends State<VerifyEmail> {
  final formKey = GlobalKey<FormState>();
  bool _isObscure = true;
  TextEditingController VerifyEmailController = new TextEditingController();
  late final String token = '';
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
                        " Email Verification",
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
                            controller: VerifyEmailController,
                            obscureText: _isObscure,
                            obscuringCharacter: "*",
                            keyboardType: TextInputType.number,
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
                              labelText: "Verification Code",
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(15),
                                  borderSide: const BorderSide(
                                      width: 0, style: BorderStyle.none)),
                            ),
                            validator: (value) =>
                                VerifyEmailFieldValidator.validate(value!),
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
                            VerifyEmailcode(VerifyEmailController.text,
                                widget.email, token);
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

  VerifyEmailcode(
    String code,
    String email,
    String token,
  ) async {
    Map data = {
      'code': code,
      'email': email,
    };
    var jsonData = null;
    Map mapResponse;
    Map dataResponse;
    var response = await http.patch(
      Uri.parse(
          //"http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/signUp/verifyEmail"
          "http://localhost:10.0.2.2/signUp/verifyEmail"),
      body: data,
    );
    if (response.statusCode == 200) {
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse;
      //    Token /////////
      token = dataResponse["x-auth-token"];
      //    Token ////////
      setState(() {
        mapResponse = json.decode(response.body);
        dataResponse = mapResponse;
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(
                builder: (BuildContext context) => setPassword(
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
                      dataResponse["message"].toString(),
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
    }
  }
}
