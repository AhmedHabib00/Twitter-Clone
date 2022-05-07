// ignore_for_file: unused_field, unnecessary_new, non_constant_identifier_names, avoid_init_to_null, avoid_print, duplicate_ignore, unused_local_variable, prefer_typing_uninitialized_variables, unnecessary_null_comparison, unrelated_type_equality_checks, camel_case_types

import 'dart:convert';
//import 'dart:html';

import 'package:flutter/material.dart';
import 'package:whisper/layout/Timeline/Timeline.dart';
import 'package:http/http.dart' as http;

class testPage extends StatefulWidget {
  final String token;
  final int page = 1;
  final int size = 1;
  const testPage({Key? key, required this.token}) : super(key: key);
  @override
  _testPage createState() => _testPage();
}

class _testPage extends State<testPage> {
  IconData? get icon => null;
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
                          setState(() {});
                          // SignIn(
                          //       , token);
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
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  SignIn(String email, String password, String token) async {
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
      setState(() {
        dataResponse = mapResponse["data"];
        if (dataResponse["role"].toString() == 'Admin') {
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
                      TimelinePage(token: token)),
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

  // Future<> GGsignIn() async {
  //   // Trigger the authentication flow
  //   final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
  //   print('test 1');

  //   // Obtain the auth details from the request
  //   final GoogleSignInAuthentication? googleAuth =
  //       await googleUser?.authentication;
  //   print('test 2');

  //   // Create a new credential
  //   var GoogleAuthProvider;
  //   final credential = GoogleAuthProvider(
  //     print('test 3'),
  //     accessToken: googleAuth?.accessToken,
  //     idToken: googleAuth?.idToken,
  //   );
  //   //print('test 4');
  //   // Once signed in, return the UserCredential
  //   //return await FirebaseAuth.instance.signInWithCredential(credential);
  //   return credential;
  // }

  // // Future FBsignIn() async {
  //   await GoogleSignInAccount.login();
  // }
}
