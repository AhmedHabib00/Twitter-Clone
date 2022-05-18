// ignore_for_file: unused_field, unnecessary_new, non_constant_identifier_names, avoid_init_to_null, avoid_print, duplicate_ignore, unused_local_variable, prefer_typing_uninitialized_variables, unnecessary_null_comparison, unrelated_type_equality_checks, use_function_type_syntax_for_parameters, empty_constructor_bodies

import 'dart:convert';
//import 'dart:html';

import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:sign_button/sign_button.dart';
import 'package:whisper/layout/Admin/AdminPage.dart';
//import 'package:whisper/layout/Admin/test.dart';
//import 'package:whisper/layout/API/google_signIn_api.dart';
import 'package:whisper/layout/SignUp/signup.dart';
import 'package:whisper/layout/Login/FogotPass.dart';
import 'package:whisper/layout/Timeline/Timeline.dart';
import 'package:whisper/models/TextFieldValidation.dart';
import 'package:http/http.dart' as http;

GoogleSignIn _googleSignIn = GoogleSignIn(
  clientId:
      '508981250586-5vrqquhhgimntmj4rosvpfq0npcbmdrb.apps.googleusercontent.com', //web
);

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);
  @override
  _LoginPage createState() => _LoginPage();
}

class _LoginPage extends State<LoginPage> {
  final formKey = GlobalKey<FormState>();
  TextEditingController EmailorUserController = new TextEditingController();
  TextEditingController PassController = new TextEditingController();
  bool _isObscure = true;
  IconData? get icon => null;
  late String _email;
  bool _isLoading = false;
  late final String token = '';
  late final String adminToken = '';
  GoogleSignInAccount? _currentUser;
  final String _contactText = '';
  late String? GoogleTokenId = '';

  @override
  void initState() {
    super.initState();
    _googleSignIn.onCurrentUserChanged.listen((GoogleSignInAccount? account) {
      _currentUser = account;
    });
    _googleSignIn.signInSilently();
  }

  @override
  Widget build(BuildContext context) {
    //print('Google token id in widget');
    //print(GoogleTokenId);
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
                    children: <Widget>[
                      const Text(
                        "Login",
                        style: TextStyle(
                            fontSize: 30, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(
                        height: 40,
                      ),
                      Text(
                        "Login to your account",
                        style: TextStyle(fontSize: 15, color: Colors.grey[700]),
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
                            controller: EmailorUserController,
                            decoration: InputDecoration(
                              prefixIcon: const Icon(
                                Icons.email,
                                color: Color.fromARGB(179, 0, 110, 255),
                              ),
                              filled: true,
                              floatingLabelBehavior:
                                  FloatingLabelBehavior.never,
                              fillColor:
                                  const Color.fromARGB(255, 179, 177, 177)
                                      .withOpacity(0.3),
                              labelText: "Email or Username",
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(15),
                                  borderSide: const BorderSide(
                                      width: 0, style: BorderStyle.none)),
                            ),
                            validator: (value) =>
                                EmailFieldValidator.validate(value!),
                            onSaved: (value) => _email = value!,
                          ),
                          const SizedBox(height: 15),
                          TextFormField(
                              controller: PassController,
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
                                labelText: "Password",
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(15),
                                    borderSide: const BorderSide(
                                        width: 0, style: BorderStyle.none)),
                              ),
                              validator: (value) =>
                                  PassFieldValidator.validate(value!)),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 40),
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
                          setState(() {
                            _isLoading = true;
                          });

                          if (formKey.currentState!.validate()) {
                            SignIn(EmailorUserController.text,
                                PassController.text, token, adminToken);
                          }
                        },
                        color: const Color(0xff0095FF),
                        elevation: 5,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50),
                        ),
                        child: const Text(
                          "Login",
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 18,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        'Don\'t have an account? ',
                        style: TextStyle(
                            fontSize: 16, fontWeight: FontWeight.normal),
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return const SignUpPage();
                              },
                            ),
                          );
                        },
                        child: const Text(
                          'Sign up',
                          style: TextStyle(
                            fontSize: 17,
                            color: Colors.blueAccent,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return const ForgotPassPage();
                              },
                            ),
                          );
                        },
                        child: const Text(
                          'Forgot Password?',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.blueAccent,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      children: <Widget>[
                        Expanded(
                          child: SignInButton.mini(
                            buttonType: ButtonType.facebook,
                            onPressed: _handleSignOut,
                            //GGsignIn //signInwithGoogle //() => null,
                          ),
                        ),
                        Expanded(
                          child: SignInButton.mini(
                            buttonType: ButtonType.google,
                            buttonSize: ButtonSize.small,
                            onPressed:
                                // login();
                                _handleSignIn,

                            //() {},
                          ),
                        )
                      ],
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

  SignIn(String email, String password, String token, String adminToken) async {
    Map data = {'emailOrUsername': email, 'password': password};
    //var jsonData = null;
    Map mapResponse;
    Map dataResponse;
    var response = await http.post(
        Uri.parse(
            "http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/login"),
        body: data);
    if (response.statusCode == 200) {
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse;
      token = dataResponse["x-auth-token"];
      adminToken = dataResponse['data']['userId'];
      print('admin token');
      print(adminToken);
      print(response.body);
      setState(() {
        dataResponse = mapResponse["data"];
        if (dataResponse["role"].toString() == 'Admin') {
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(
                  builder: (BuildContext context) =>
                      AdminPage(token: token, adminToken: adminToken)),
              (Route<dynamic> route) => false);
          dataResponse = mapResponse;
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
                        ('Admin login successful'),
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
        } else {
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(
                  builder: (BuildContext context) =>
                      TimelinePage(token: token)), // testpage
              (Route<dynamic> route) => false);
          dataResponse = mapResponse;
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
        }
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

  Future _handleSignIn() async {
    try {
      await _googleSignIn.signIn();
      var account = await _googleSignIn.signIn();
      var googleKey = await account?.authentication;
      GoogleTokenId = googleKey?.idToken;
    } catch (error) {
      print(error);
    }
    print('Google TokenId');
    print(GoogleTokenId);
    GSignIn(token, adminToken, GoogleTokenId!);
  }

  Future GSignIn(String token, String adminToken, String GoogleTokenId) async {
    Map data = {'tokenId': GoogleTokenId};
    Map mapResponse;
    Map dataResponse;
    var response = await http.post(
        Uri.parse(
            "http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/auth/google"),
        body: data);
    // print(response.body);
    //print(response.statusCode);
    if (response.statusCode == 201) {
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse;
      token = dataResponse["x-auth-token"];
      adminToken = dataResponse['data']['userId'];
      setState(() {
        dataResponse = mapResponse["data"];
        if (dataResponse["role"].toString() == 'Admin') {
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(
                  builder: (BuildContext context) =>
                      AdminPage(token: token, adminToken: adminToken)),
              (Route<dynamic> route) => false);
          dataResponse = mapResponse;
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
                        ('Admin login successful'),
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
        } else {
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(
                  builder: (BuildContext context) =>
                      TimelinePage(token: token)), // testpage
              (Route<dynamic> route) => false);
          dataResponse = mapResponse;
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
        }
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

Future<void> _handleSignOut() => _googleSignIn.disconnect();
