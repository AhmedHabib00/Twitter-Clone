// ignore_for_file: camel_case_types, file_names, unused_local_variable, avoid_print, unnecessary_new, unused_element

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'package:path/path.dart';
import 'package:async/async.dart';
import 'package:giphy_picker/giphy_picker.dart';

class addTweetPage extends StatefulWidget {
  String token;
  addTweetPage({Key? key, required this.token}) : super(key: key);
  @override
  _addTweetPage createState() => _addTweetPage();
}

class _addTweetPage extends State<addTweetPage> {
  File? image;
  File? camera;
  GiphyGif? gifs;
  late String gifsUrl = '';
  late String gifss = '';
  late String images = '';
  late String content = 'Android first post';
  late String replyId = '';
  late List users = [];
  late Future<String> gifsUrlFuture;
  TextEditingController tweetController = new TextEditingController();

  Future pickImage() async {
    final image = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (image == null) return;
    setState(() {
      final imageTemporary = File(image.path);
      this.image = imageTemporary;
    });
  }

  Future pickCamera() async {
    final camera = await ImagePicker().pickImage(source: ImageSource.camera);
    if (camera == null) return;
    setState(() {
      final cameraTemporary = File(camera.path);
      this.camera = cameraTemporary;
    });
  }

  Future<String> pickGifs(context) async {
    final gifs = await GiphyPicker.pickGif(
        context: context, apiKey: '0unzEqRBdp5iYffp4P4QMeCWx9HQrLyf');
    setState(() {
      gifsUrl = gifs!.images.original!.url!;
    });
    return gifsUrl;
  }

  @override
  void initState() {
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
                        "Post a tweet!",
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
                          controller: tweetController,
                          decoration: InputDecoration(
                            prefixIcon: const Icon(
                              Icons.textsms_outlined,
                              color: Color.fromARGB(255, 0, 119, 255),
                            ),
                            filled: true,
                            floatingLabelBehavior: FloatingLabelBehavior.never,
                            fillColor: const Color.fromARGB(255, 179, 177, 177)
                                .withOpacity(0.3),
                            labelText: "What's happening?",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(15),
                                borderSide: const BorderSide(
                                    width: 0, style: BorderStyle.none)),
                          ),
                        ),
                        const SizedBox(height: 30),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            TextButton(
                              onPressed: () => pickCamera(),
                              child: const Icon(
                                Icons.camera_alt_outlined,
                                color: Color.fromARGB(255, 0, 119, 255),
                                size: 50,
                              ),
                            ),
                            TextButton(
                              onPressed: () => pickImage(),
                              child: const Icon(
                                Icons.image,
                                color: Color.fromARGB(255, 0, 119, 255),
                                size: 50,
                              ),
                            ),
                            TextButton(
                              onPressed: () //=> pickGifs(context),
                                  {
                                pickGifs(context);
                              },
                              child: const Icon(
                                Icons.gif_box_outlined,
                                color: Color.fromARGB(255, 0, 119, 255),
                                size: 50,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 100),
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
                        minWidth: 100,
                        height: 65,
                        onPressed: () async {
                          var request = http.MultipartRequest(
                            'POST',
                            Uri.parse(
                                'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/'),
                          );
                          //Header....
                          request.headers['x-auth-token'] = widget.token;
                          print(widget.token);
                          image != null ? Image.file(image!) : image;
                          print('gifs url inside api');
                          print(gifsUrl);
                          request.fields['content'] = tweetController.text;
                          request.fields['replyId'] = replyId.toString();
                          request.fields['users'] = users.toString();
                          if (gifsUrl != '') {
                            request.fields['gifs'] = gifsUrl.toString();
                          } else {
                            request.fields['gifs'] = gifss.toString();
                          }
                          if (image != null) {
                            var stream = new http.ByteStream(
                                DelegatingStream(image!.openRead())); //.typed
                            var length = await image!.length();
                            var multipartFile = new http.MultipartFile(
                                'images', stream, length,
                                filename: basename(image!.path));
                            request.files.add(multipartFile);
                          } else {
                            request.fields['images'] = images.toString();
                          }
                          if (camera != null) {
                            var stream = new http.ByteStream(
                                DelegatingStream(camera!.openRead())); //.typed
                            var length = await camera!.length();
                            var multipartFile = new http.MultipartFile(
                                'images', stream, length,
                                filename: basename(camera!.path));
                            request.files.add(multipartFile);
                          } else {
                            request.fields['images'] = images.toString();
                          }

                          var response = await request.send();
                          print(response.stream);
                          print(response.statusCode);
                          final res = await http.Response.fromStream(response);
                          print(res.body);
                          Navigator.pop(context);
                        },
                        color: const Color.fromARGB(255, 0, 119, 255),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50),
                        ),
                        child: const Text(
                          "Tweet",
                          style: TextStyle(
                            fontSize: 18,
                            color: Color.fromARGB(255, 255, 255, 255),
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
}
