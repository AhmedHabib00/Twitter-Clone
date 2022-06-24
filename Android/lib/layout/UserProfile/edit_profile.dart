// ignore_for_file: camel_case_types, file_names, unused_local_variable, avoid_print, unnecessary_new, unused_element, must_be_immutable

import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:path/path.dart' as Path;
import 'package:async/async.dart';
import 'package:whisper/layout/Timeline/sidemenu.dart';
import 'package:whisper/models/TextFieldValidation.dart';

class editProfile extends StatefulWidget {
  String token;
  String userId;
  editProfile({Key? key, required this.token, required this.userId})
      : super(key: key);
  @override
  _editProfile createState() => _editProfile();
}

class _editProfile extends State<editProfile> {
  File? imageProfile;
  File? cameraProfile;
  late String imagesProfile = '';
  File? imageCover;
  File? cameraCover;
  late String imagesCover = '';
  final format = DateFormat('yyyy-MM-dd');
  TextEditingController bioController = new TextEditingController();
  TextEditingController locationController = new TextEditingController();
  TextEditingController dateinput = TextEditingController();

  Future pickProfileImage() async {
    final imageProfile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (imageProfile == null) return;
    setState(() {
      final imageTemporary = File(imageProfile.path);
      this.imageProfile = imageTemporary;
    });
  }

  Future pickProfileCamera() async {
    final cameraProfile =
        await ImagePicker().pickImage(source: ImageSource.camera);
    if (cameraProfile == null) return;
    setState(() {
      final cameraTemporary = File(cameraProfile.path);
      this.cameraProfile = cameraTemporary;
    });
  }

  Future pickCoverImage() async {
    final imageCover =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (imageCover == null) return;
    setState(() {
      final imageTemporary = File(imageCover.path);
      this.imageCover = imageTemporary;
    });
  }

  Future pickCoverCamera() async {
    final cameraCover =
        await ImagePicker().pickImage(source: ImageSource.camera);
    if (cameraCover == null) return;
    setState(() {
      final cameraTemporary = File(cameraCover.path);
      this.cameraCover = cameraTemporary;
    });
  }

  @override
  void initState() {
    dateinput.text = ""; //set the initial value of text field
    super.initState();
  }

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
                        "Edit User Profile",
                        style: TextStyle(
                            fontSize: 30, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 40),
                    child: Column(
                      children: <Widget>[
                        const SizedBox(height: 5),
                        TextFormField(
                          controller: bioController,
                          decoration: InputDecoration(
                            prefixIcon: const Icon(
                              Icons.text_fields,
                              color: Color.fromARGB(255, 0, 119, 255),
                            ),
                            filled: true,
                            floatingLabelBehavior: FloatingLabelBehavior.never,
                            fillColor: const Color.fromARGB(255, 179, 177, 177)
                                .withOpacity(0.3),
                            labelText: "Tell us about your Bio",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(15),
                                borderSide: const BorderSide(
                                    width: 0, style: BorderStyle.none)),
                          ),
                        ),
                        const SizedBox(height: 20),
                        TextFormField(
                          controller: locationController,
                          decoration: InputDecoration(
                            prefixIcon: const Icon(
                              Icons.date_range,
                              color: Color.fromARGB(255, 213, 2, 255),
                            ),
                            filled: true,
                            floatingLabelBehavior: FloatingLabelBehavior.never,
                            fillColor: const Color.fromARGB(255, 179, 177, 177)
                                .withOpacity(0.3),
                            labelText: "Location",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(15),
                                borderSide: const BorderSide(
                                    width: 0, style: BorderStyle.none)),
                          ),
                        ),
                        const SizedBox(height: 20),
                        TextFormField(
                            controller:
                                dateinput, //editing controller of this TextField

                            decoration: InputDecoration(
                              prefixIcon: const Icon(
                                Icons.edit_calendar,
                                color: Color.fromARGB(179, 1, 1, 3),
                              ),
                              filled: true,
                              floatingLabelBehavior:
                                  FloatingLabelBehavior.never,
                              fillColor:
                                  const Color.fromARGB(255, 179, 177, 177)
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
                                    DateFormat('yyyy/MM/dd').format(pickedDate);
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
                              print(dateinput.text);
                            }),
                        const SizedBox(height: 35),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 100),
                          child: Container(
                            padding: const EdgeInsets.only(top: 0, left: 0),
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(90),
                                border: const Border(
                                  bottom: BorderSide(color: Colors.black),
                                  top: BorderSide(color: Colors.black),
                                  left: BorderSide(color: Colors.black),
                                  right: BorderSide(color: Colors.black),
                                )),
                            child: MaterialButton(
                              minWidth: 30,
                              height: 50,
                              onPressed: () {
                                editProfileInfo(
                                    bioController.text,
                                    locationController.text,
                                    dateinput.text,
                                    widget.token,
                                    widget.userId);
                              },
                              color: const Color.fromARGB(255, 255, 255, 255),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50),
                              ),
                              child: const Text(
                                "Submit",
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Color.fromARGB(255, 0, 0, 0),
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 30),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            const Text('Profile Photo',
                                style: TextStyle(
                                    fontWeight: FontWeight.w300,
                                    fontSize: 20,
                                    color: Color.fromARGB(255, 0, 81, 255))),
                            TextButton(
                              onPressed: () => pickProfileCamera(),
                              child: const Icon(
                                Icons.camera_alt_outlined,
                                color: Color.fromARGB(255, 0, 119, 255),
                                size: 35,
                              ),
                            ),
                            TextButton(
                              onPressed: () => pickProfileImage(),
                              child: const Icon(
                                Icons.image,
                                color: Color.fromARGB(255, 0, 119, 255),
                                size: 35,
                              ),
                            ),
                            MaterialButton(
                              minWidth: 5.5,
                              height: 25,
                              onPressed: () async {
                                var request = http.MultipartRequest(
                                  'PATCH',
                                  Uri.parse(
                                      //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/'),
                                      'http://10.0.2.2:8080/user/${widget.userId}/profilePicture'),
                                );
                                //Header....
                                request.headers['x-auth-token'] = widget.token;
                                imageProfile != null
                                    ? Image.file(imageProfile!)
                                    : imageProfile;
                                if (imageProfile != null) {
                                  var stream = new http.ByteStream(
                                      DelegatingStream(
                                          imageProfile!.openRead())); //.typed
                                  var length = await imageProfile!.length();
                                  var multipartFile = new http.MultipartFile(
                                      'imagesProfile', stream, length,
                                      filename:
                                          Path.basename(imageProfile!.path));
                                  //print('this is multipart');
                                  //print(stream);
                                  request.files.add(multipartFile);
                                } else {
                                  request.fields['Picture'] =
                                      imagesProfile.toString();
                                }
                                if (cameraProfile != null) {
                                  var stream = new http.ByteStream(
                                      DelegatingStream(
                                          cameraProfile!.openRead())); //.typed
                                  var length = await cameraProfile!.length();
                                  var multipartFile = new http.MultipartFile(
                                      'imagesCamera', stream, length,
                                      filename:
                                          Path.basename(cameraProfile!.path));
                                  request.files.add(multipartFile);
                                } else {
                                  request.fields['Picture'] =
                                      imagesProfile.toString();
                                }

                                var response = await request.send();
                                print(response.stream);
                                print(response.statusCode);
                                final res =
                                    await http.Response.fromStream(response);
                                print(res.body);
                              },
                              color: const Color.fromARGB(255, 255, 255, 255),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50),
                              ),
                              child: const Text(
                                "Save",
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Color.fromARGB(255, 0, 110, 255),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            const Text('Cover Photo',
                                style: TextStyle(
                                    fontWeight: FontWeight.w300, fontSize: 20)),
                            TextButton(
                              onPressed: () => pickCoverCamera(),
                              child: const Icon(
                                Icons.camera_alt_outlined,
                                color: Color.fromARGB(255, 0, 0, 0),
                                size: 35,
                              ),
                            ),
                            TextButton(
                              onPressed: () => pickCoverImage(),
                              child: const Icon(
                                Icons.image,
                                color: Color.fromARGB(255, 0, 0, 0),
                                size: 35,
                              ),
                            ),
                            MaterialButton(
                              minWidth: 5.5,
                              height: 25,
                              onPressed: () async {
                                var request = http.MultipartRequest(
                                  'PATCH',
                                  Uri.parse(
                                      //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/'),
                                      'http://10.0.2.2:8080/user/${widget.userId}/coverPhoto'),
                                );
                                //Header....
                                request.headers['x-auth-token'] = widget.token;
                                print(widget.token);
                                imageCover != null
                                    ? Image.file(imageCover!)
                                    : imageCover;
                                if (imageCover != null) {
                                  var stream = new http.ByteStream(
                                      DelegatingStream(
                                          imageCover!.openRead())); //.typed
                                  var length = await imageCover!.length();
                                  var multipartFile = new http.MultipartFile(
                                      'imagesCover', stream, length,
                                      filename:
                                          Path.basename(imageCover!.path));
                                  //print('this is multipart');
                                  //print(stream);
                                  request.files.add(multipartFile);
                                } else {
                                  request.fields['Picture'] =
                                      imagesCover.toString();
                                }
                                if (cameraCover != null) {
                                  var stream = new http.ByteStream(
                                      DelegatingStream(
                                          cameraCover!.openRead())); //.typed
                                  var length = await cameraCover!.length();
                                  var multipartFile = new http.MultipartFile(
                                      'imagesCamera', stream, length,
                                      filename:
                                          Path.basename(cameraCover!.path));
                                  request.files.add(multipartFile);
                                } else {
                                  request.fields['Picture'] =
                                      cameraCover.toString();
                                }

                                var response = await request.send();
                                print(response.stream);
                                print(response.statusCode);
                                final res =
                                    await http.Response.fromStream(response);
                                print(res.body);
                              },
                              color: const Color.fromARGB(255, 255, 255, 255),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50),
                              ),
                              child: const Text(
                                "Save",
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Color.fromARGB(255, 0, 0, 0),
                                ),
                              ),
                            ),
                          ],
                        )
                      ],
                    ),
                  ),
                  //lol
                ],
              ),
            ),
          ],
        ),
      ),
      drawer: SideMenu(token: widget.token, userId: widget.userId),
    );
  }

  editProfileInfo(String bio, String location, String dateinput, String token,
      String userId) async {
    Map data = {
      'description': bio,
      'location': location,
      'birthdate': dateinput
    };
    Map mapResponse;
    Map dataResponse;
    var response = await http.patch(Uri.parse(
            //"http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/login"),
            "http://10.0.2.2:8080/user/${widget.userId}/profile_settings"),
        body: data, headers: {"x-auth-token": token});
    if (response.statusCode == 200) {
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
                      (response.body),
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
                      "Empty data, please Update your info",
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
    } else {
      print(response.statusCode);
      print(response.body);
    }
  }
}
