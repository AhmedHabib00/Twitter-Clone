// ignore_for_file: file_names, avoid_print, non_constant_identifier_names, unnecessary_new, unused_local_variable, avoid_init_to_null

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:whisper/models/TextFieldValidation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:whisper/layout/Login/ForgetPassCodeVerifiy.dart';

class ForgotPassPage extends StatefulWidget {
  const ForgotPassPage({Key? key}) : super(key: key);
  @override
  _ForgotPassPage createState() => _ForgotPassPage();
}

class _ForgotPassPage extends State<ForgotPassPage> {
  TextEditingController EmailOrUserController = new TextEditingController();

  final formKey = GlobalKey<FormState>();
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
                        "Verify by Email",
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
                            decoration: InputDecoration(
                              prefixIcon: const Icon(
                                Icons.person,
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
                                ForgetPassFieldValidator.validate(value!),
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
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) {
                                  return const ForgotPassCodeVerify();
                                },
                              ),
                            );
                          }

                          //SignInF(EmailOrUserController.text);
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

  // SignInF(String EmailOrUsername) async {
  //   Map data = {'emailOrUsername': EmailOrUsername};
  //   var jsonData = null;
  //   //Map mapResponse;
  //   //Map dataResponse;
  //   SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  //   //SharedPreferences.setMockInitialValues({});
  //   var response = await http.post(
  //       Uri.parse(
  //           "http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/forgotPassword"),
  //       body: data);
  //   print('test 1');
  //   if (response.statusCode == 200) {
  //     print('test 2');
  //     Navigator.of(context).pushAndRemoveUntil(
  //         MaterialPageRoute(
  //             builder: (BuildContext context) => const ForgotPassCodeVerify()),
  //         (Route<dynamic> route) => false);
  //     print(response.body);
  //     print('test 3');
  //     setState(() {
  //       //mapResponse = json.decode(response.body);
  //       //dataResponse = mapResponse;

  //       //sharedPreferences.setString("token", jsonData['token']);
  //       jsonData = json.decode(response.body);
  //       showModalBottomSheet<void>(
  //         context: context,
  //         builder: (BuildContext context) {
  //           return Container(
  //             height: 200,
  //             color: const Color.fromARGB(0, 255, 255, 255),
  //             child: Center(
  //               child: Column(
  //                 mainAxisAlignment: MainAxisAlignment.center,
  //                 mainAxisSize: MainAxisSize.min,
  //                 children: <Widget>[
  //                   Text(
  //                     response.body,
  //                     //dataResponse["message"].toString(),

  //                     style: const TextStyle(
  //                       color: Color(0xff0095FF),
  //                       fontWeight: FontWeight.bold,
  //                       fontSize: 20,
  //                     ),
  //                   ),
  //                 ],
  //               ),
  //             ),
  //           );
  //         },
  //       );
  //     });
  //   } else if (response.statusCode == 404) {
  //     setState(() {
  //       print('test 4');
  //       showModalBottomSheet<void>(
  //         context: context,
  //         builder: (BuildContext context) {
  //           return Container(
  //             height: 200,
  //             color: const Color.fromARGB(0, 255, 255, 255),
  //             child: Center(
  //               child: Column(
  //                 mainAxisAlignment: MainAxisAlignment.center,
  //                 mainAxisSize: MainAxisSize.min,
  //                 children: <Widget>[
  //                   Text(
  //                     response.body,
  //                     style: const TextStyle(
  //                       color: Color(0xff0095FF),
  //                       fontWeight: FontWeight.bold,
  //                       fontSize: 20,
  //                     ),
  //                   ),
  //                 ],
  //               ),
  //             ),
  //           );
  //         },
  //       );
  //     });
  //   }
  // }
}
