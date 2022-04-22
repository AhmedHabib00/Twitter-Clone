// ignore_for_file: sized_box_for_whitespace, avoid_print, duplicate_ignore

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:whisper/layout/Login/login.dart';
import 'package:whisper/layout//API/google_signIn_api.dart';
import 'package:sign_button/sign_button.dart';
import 'package:whisper/layout/SignUp/VerifyEmail.dart';
import 'package:whisper/models/Validation.dart';
//import 'package:whisper/models/TextField.dart';
//import 'package:firebase_auth/firebase_auth.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({Key? key}) : super(key: key);
  @override
  _SignUpPage createState() => _SignUpPage();
}

class _SignUpPage extends State<SignUpPage> {
  final formKey = GlobalKey<FormState>();
  final format = DateFormat('yyyy-MM-dd');
  TextEditingController dateinput = TextEditingController();
  bool _isObscure = true;
  IconData? get icon => null;

  @override
  void initState() {
    dateinput.text = ""; //set the initial value of text field
    super.initState();
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
                      const SizedBox(height: 15),
                      TextFormField(
                        obscureText: _isObscure,
                        obscuringCharacter: "*",
                        decoration: InputDecoration(
                          prefixIcon: const Icon(
                            Icons.password,
                            color: Color.fromARGB(179, 255, 0, 0),
                          ),
                          suffixIcon: IconButton(
                            icon: Icon(_isObscure
                                ? Icons.visibility
                                : Icons.visibility_off),
                            onPressed: () {
                              setState(() {
                                _isObscure = !_isObscure;
                              });
                            },
                          ),
                          filled: true,
                          floatingLabelBehavior: FloatingLabelBehavior.never,
                          fillColor: const Color.fromARGB(255, 179, 177, 177)
                              .withOpacity(0.3),
                          labelText: "Password",
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(15),
                              borderSide: const BorderSide(
                                  width: 0, style: BorderStyle.none)),
                        ),
                        validator: (value) =>
                            PassFieldValidator.validate(value!),
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
                                    2000), //DateTime.now() - not to allow to choose before today.
                                lastDate: DateTime(2101));

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
                      // ignore: avoid_print
                      if (formKey.currentState!.validate()) {
                        // ignore: avoid_print
                        print("Logged In");
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const VerifyEmail()));
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
                          onPressed: signIn2 //() => null,
                          ),
                    ),
                    Expanded(
                      child: SignInButton.mini(
                          buttonType: ButtonType.google,
                          buttonSize: ButtonSize.small,
                          onPressed: signIn //() {},
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

  Future signIn() async {
    await GoogleSignInApi.login();
  }

  Future signIn2() async {
    await GoogleSignInApi.login();
  }
}
