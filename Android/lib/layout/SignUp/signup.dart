// ignore_for_file: sized_box_for_whitespace, avoid_print, duplicate_ignore, non_constant_identifier_names, unnecessary_new, unused_local_variable, avoid_init_to_null, unused_field

import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:intl/intl.dart';
import 'package:whisper/layout/Login/login.dart';
import 'package:sign_button/sign_button.dart';
import 'package:whisper/layout/SignUp/VerifyEmail.dart';
import 'package:whisper/layout/Timeline/Timeline.dart';
import 'package:whisper/models/TextFieldValidation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

GoogleSignIn _googleSignIn = GoogleSignIn(
  clientId:
      '508981250586-5vrqquhhgimntmj4rosvpfq0npcbmdrb.apps.googleusercontent.com', //web
);

class SignUpPage extends StatefulWidget {
  const SignUpPage({Key? key}) : super(key: key);
  @override
  _SignUpPage createState() => _SignUpPage();
}

class _SignUpPage extends State<SignUpPage> {
  final formKey = GlobalKey<FormState>();
  final format = DateFormat('yyyy-MM-dd');
  TextEditingController NameController = new TextEditingController();
  TextEditingController EmailController = new TextEditingController();
  TextEditingController dateinput = TextEditingController();
  IconData? get icon => null;
  GoogleSignInAccount? _currentUser;
  final String _contactText = '';
  late String? GoogleTokenId = '';
  late final String token = '';
  late final String adminToken = '';
  late final String userId = '';
  @override
  void initState() {
    dateinput.text = ""; //set the initial value of text field
    _googleSignIn.onCurrentUserChanged.listen((GoogleSignInAccount? account) {
      _currentUser = account;
    });
    _googleSignIn.signInSilently();
    super.initState();
    _handleSignOut();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 5,
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
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height - 50,
          width: double.infinity,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 40),
                child: Column(
                  children: <Widget>[
                    const Text(
                      "Sign Up",
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Text(
                      "Create an Account",
                      style: TextStyle(fontSize: 15, color: Colors.grey[700]),
                    )
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 40),
                child: Form(
                  key: formKey,
                  child: Column(
                    children: <Widget>[
                      const SizedBox(height: 5),
                      TextFormField(
                        controller: NameController,
                        decoration: InputDecoration(
                          prefixIcon: const Icon(
                            Icons.person,
                            color: Color.fromARGB(179, 0, 110, 255),
                          ),
                          filled: true,
                          floatingLabelBehavior: FloatingLabelBehavior.never,
                          fillColor: const Color.fromARGB(255, 179, 177, 177)
                              .withOpacity(0.3),
                          labelText: "Name",
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(15),
                              borderSide: const BorderSide(
                                  width: 0, style: BorderStyle.none)),
                        ),
                        validator: (value) =>
                            NameFieldValidator.validate(value!),
                      ),
                      const SizedBox(height: 15),
                      TextFormField(
                        controller: EmailController,
                        decoration: InputDecoration(
                          prefixIcon: const Icon(
                            Icons.email,
                            color: Color.fromARGB(179, 0, 110, 255),
                          ),
                          filled: true,
                          floatingLabelBehavior: FloatingLabelBehavior.never,
                          fillColor: const Color.fromARGB(255, 179, 177, 177)
                              .withOpacity(0.3),
                          labelText: "Email",
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(15),
                              borderSide: const BorderSide(
                                  width: 0, style: BorderStyle.none)),
                        ),
                        validator: (value) =>
                            EmailFieldValidator.validate(value!),
                      ),
                      const SizedBox(height: 10),
                      TextFormField(
                          controller:
                              dateinput, //editing controller of this TextField

                          decoration: InputDecoration(
                            prefixIcon: const Icon(
                              Icons.edit_calendar,
                              color: Color.fromARGB(179, 1, 1, 3),
                            ),
                            filled: true,
                            floatingLabelBehavior: FloatingLabelBehavior.never,
                            fillColor: const Color.fromARGB(255, 179, 177, 177)
                                .withOpacity(0.3),
                            labelText: "Date of Birth",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(15),
                                borderSide: const BorderSide(
                                    width: 0, style: BorderStyle.none)),
                          ),
                          validator: (value) =>
                              DateOfBirthFieldValidator.validate(value!),
                          readOnly:
                              true, //set it true, so that user will not able to edit text
                          onTap: () async {
                            DateTime? pickedDate = await showDatePicker(
                                context: context,
                                initialDate: DateTime.now(),
                                firstDate: DateTime(
                                    1900), //DateTime.now() - not to allow to choose before today.
                                lastDate: DateTime(2100));

                            if (pickedDate != null) {
                              //     pickedDate); //pickedDate output format => 2021-03-10 00:00:00.000
                              String formattedDate =
                                  DateFormat('yyyy-MM-dd').format(pickedDate);
                              print(
                                  formattedDate); //formatted date output using intl package =>  2021-03-16
                              //you can implement different kind of Date Format here according to your requirement

                              setState(() {
                                dateinput.text =
                                    formattedDate; //set output date to TextField value.
                              });
                            } else {
                              print("Date is not selected");
                            }
                          })
                    ],
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 40),
                child: Container(
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
                        SignUpp(NameController.text, EmailController.text,
                            dateinput.text);
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
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('Already have an account? '),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) {
                            return const LoginPage();
                          },
                        ),
                      );
                    },
                    child: const Text(
                      'Login',
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
                      ),
                    ),
                    Expanded(
                      child: SignInButton.mini(
                        buttonType: ButtonType.google,
                        buttonSize: ButtonSize.small,
                        onPressed: _handleSignIn,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  SignUpp(
    String name,
    String email,
    String birthdate,
  ) async {
    Map data = {'name': name, 'email': email, 'birthdate': birthdate};
    var jsonData = null;
    Map mapResponse;
    Map dataResponse;
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    var response = await http.post(
        Uri.parse(
            "http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/signUp"),
        body: data);
    if (response.statusCode == 201) {
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
              builder: (BuildContext context) =>
                  VerifyEmail(email: EmailController.text)),
          (Route<dynamic> route) => false);
      setState(() {
        mapResponse = json.decode(response.body);
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
    GSignIn(token, userId, GoogleTokenId!);
  }

  Future GSignIn(String token, String userId, String GoogleTokenId) async {
    Map data = {'tokenId': GoogleTokenId};
    Map mapResponse;
    Map dataResponse;
    var response = await http.post(
        Uri.parse(
            "http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/auth/google"),
        body: data);
    print(response.body);
    print(response.statusCode);
    if (response.statusCode == 201) {
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse;
      token = dataResponse["x-auth-token"];
      userId = dataResponse['data']['userId'];
      //adminToken = dataResponse['data']['userId'];
      print('admin token');
      //print(adminToken);
      print(response.body);
      setState(() {
        dataResponse = mapResponse["data"];
        {
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(
                  builder: (BuildContext context) =>
                      TimelinePage(token: token, userId: userId)), // testpage
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
