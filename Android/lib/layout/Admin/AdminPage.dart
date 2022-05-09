// ignore_for_file: file_names, avoid_unnecessary_containers, non_constant_identifier_names, unnecessary_new, avoid_print, avoid_init_to_null, unused_local_variable, duplicate_import, prefer_typing_uninitialized_variables, camel_case_types

// import 'dart:io';

import 'package:flutter/material.dart';
import 'package:whisper/layout/Admin/GraphBar.dart';
import 'package:whisper/layout/Admin/GraphPie.dart';
import 'package:whisper/modules/AdminTweetBoxWidget.dart';
import 'package:whisper/models/tweet_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AdminPage extends StatefulWidget {
  final String token;
  const AdminPage({Key? key, required this.token}) : super(key: key);
  @override
  _AdminPage createState() => _AdminPage();
}

class _AdminPage extends State<AdminPage> {
  @override
  initState() {
    getUserData(widget.token);
    super.initState();
  }

  late var NoUser = 5;
  late var NoBan = 5;
  late var ratioTweet = '';
  Future NoUsers(token) async {
    var jsonData = null;
    Map mapResponse;
    Map dataResponse;
    var response = await http.get(
      Uri.parse(
        ('http://10.0.2.2:8080/admins/statistics/noUsers'),
        //   //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/admins/statistics/noUsers'),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    setState(() {
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse['noUsers'];
      NoUser = dataResponse['count'];
    });
  }

  Future NoBanned(token) async {
    Map mapResponse;
    Map dataResponse;
    var response = await http.get(
      Uri.parse(
        'http://10.0.2.2:8080/admins/statistics/noBanned',
        //'https://www.thegrowingdeveloper.org/apiview?id=1',
        //   //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/admins/statistics/noUsers'),
      ),
      headers: {'x-auth-token': token},
    );
    setState(() {
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse['noBanned'];
      NoBan = dataResponse['count'];
    });
  }

  Future ratioTweets(token) async {
    Map mapResponse;
    Map dataResponse;
    var response = await http.get(
      Uri.parse(
        'http://10.0.2.2:8080/admins/statistics/ratioTweets',
        //'https://www.thegrowingdeveloper.org/apiview?id=1',
        //   //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/admins/statistics/noUsers'),
      ),
      headers: {'x-auth-token': token},
    );
    setState(() {
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse['ratioTweets'];
      ratioTweet = dataResponse['count'];
    });
  }

  Future getUserData(token) async {
    Map mapResponse;
    Map dataResponse;
    //Map info;
    //Map dataResponse;
    var response = await http.get(
      Uri.parse(
        'http://10.0.2.2:8080/admins/users/?size=1&page=4&search=&state=',
      ),
      headers: {'x-auth-token': token},
    );
    setState(() {
      var jsonData = json.decode(response.body);
      // mapResponse = json.decode(response.body);
      List dataResponse = jsonData['Info'];
      List info = dataResponse[0]['data'];
      Map infoName = info[0];
      String infoname = infoName['name'];

      // print('@@@@@@@@@@@@ dataResponse Start');
      // print(dataResponse);
      // print('@@@@@@@ dataResponse ends');

      // print('@@@@@@@@@@@@ info Start');
      // print(infoname);
      // print('@@@@@@@ info ends');
    });
  }

  @override
  Widget build(BuildContext context) {
    NoUsers(widget.token);
    NoBanned(widget.token);
    ratioTweets(widget.token);
    getUserData(widget.token);
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      body: DefaultTabController(
        length: 3,
        child: Scaffold(
          appBar: AppBar(
            bottom: const TabBar(
              tabs: [
                Text(
                  "Dashboard",
                  style: TextStyle(
                    color: Color.fromARGB(255, 255, 255, 255),
                    fontSize: 16,
                  ),
                ),
                Text(
                  "Users",
                  style: TextStyle(
                    color: Color.fromARGB(255, 255, 255, 255),
                    fontSize: 16,
                  ),
                ),
                Text(
                  "Blocked Users",
                  style: TextStyle(
                    color: Color.fromARGB(255, 255, 255, 255),
                    fontSize: 16,
                  ),
                ),
              ],
            ),
            title: const Text(
              "Admin Home",
              style: TextStyle(
                fontSize: 25,
              ),
            ),
            centerTitle: true,
          ),
          body: TabBarView(
            children: [
              Container(
                child: GridView.count(
                  crossAxisSpacing: 0,
                  mainAxisSpacing: 0,
                  crossAxisCount: 1,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 50, right: 50, top: 0, bottom: 50),
                      child: _AdminCard(
                        context: context,
                        count: NoUser,
                        icon: Icons.person,
                        name: " No. of Users",
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 50, right: 50, top: 0, bottom: 50),
                      child: _AdminCard(
                        context: context,
                        count: NoBan,
                        icon: Icons.block,
                        name: " No. of banned Users",
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 25, right: 50, top: 0, bottom: 50),
                      child: _AdminCard(
                        context: context,
                        count: ratioTweet,
                        icon: Icons.percent_sharp,
                        name: " Tweets Increased by",
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 50, right: 50, top: 0, bottom: 50),
                      child: Container(
                          child: Column(
                        children: <Widget>[
                          Text(
                            "Users's Age Ranges",
                            style: TextStyle(
                              fontSize: 25,
                              color: Colors.grey[700],
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 25),
                          const Expanded(child: GraphPie())
                        ],
                      )),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 50, right: 50, bottom: 100, top: 0),
                      child: Container(
                          child: Column(
                        children: <Widget>[
                          Text(
                            "Most Followed",
                            style: TextStyle(
                              fontSize: 25,
                              color: Colors.grey[700],
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 25),
                          Expanded(child: GraphBar(token: widget.token))
                        ],
                      )),
                    ),
                  ],
                ),
              ),
              // Container(
              //   child: Card(
              //     child: FutureBuilder<List>(
              //         future: datafuture,
              //         //getUserData(),
              //         builder: (context, snapshot) {
              //           if (snapshot.hasData) {
              //             users = snapshot.data!;
              //             //return Container(
              //             // child: const Center(
              //             //   child: Text('loading...'),
              //             // ),
              //             return ListView.builder(
              //               itemCount: snapshot.data?.length,
              //               itemBuilder: (context, i) {
              //                 return ListTile(
              //                   title: Text(snapshot.data?[i].name),
              //                   subtitle: Text(snapshot.data?[i].userName),
              //                   trailing: Text(snapshot.data?[i].email),
              //                 );
              //               },
              //             );
              //             // );
              //           } else {
              //             //var data = (snapshot.data as List<User>).toList();
              //             return const Center(
              //                 child: CircularProgressIndicator());
              //           }
              //         }),
              //   ),
              // ),

              // start here
              //SingleChildScrollView(
              //child:
              Container(
                child: getBody(), //AdminTweetBoxWidget(Tweets, false, () {}),
              ),
              //),
              // delete before

              SingleChildScrollView(
                child: Container(
                  child: AdminTweetBoxWidget(Tweets, false, () {}),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget getBody() {
    // return const Center(
    //   child: Text('hello world'),
    // );
    List items = [
      '1',
      '2',
    ];
    return ListView.builder(
        itemCount: items.length,
        itemBuilder: (context, index) {
          return getCard(); //Text('index $index');
        });
  }

  Widget getCard() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: ListTile(
          title: Row(
            children: <Widget>[
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 0, 81, 255),
                  borderRadius: BorderRadius.circular(60 / 2),
                  image: const DecorationImage(
                    fit: BoxFit.cover,
                    image: NetworkImage(
                        "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
                  ),
                ),
              ),
              const SizedBox(width: 20),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const <Widget>[
                  Text('Christina ',
                      style:
                          TextStyle(fontSize: 17, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  Text('@Christy20', style: TextStyle(color: Colors.grey)),
                ],
              ),
              // Padding(
              //   padding: const EdgeInsets.only(left: 100),
              //   child: MaterialButton(
              //     onPressed: () {},
              //     color: Colors.red,
              //   ),
              // ),

              Padding(
                padding: const EdgeInsets.only(left: 100),
                child: MaterialButton(
                  minWidth: double.minPositive,
                  height: 30,
                  onPressed: () {},
                  color: const Color.fromARGB(255, 255, 0, 0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Text(
                    "Block",
                    style: TextStyle(
                      fontSize: 18,
                      color: Color.fromARGB(255, 255, 255, 255),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _AdminCard(
      {required IconData icon,
      required var count,
      required String name,
      required BuildContext context}) {
    return Card(
      child: Container(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(
                  left: 12, right: 12, top: 25, bottom: 25),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    icon,
                    size: 35,
                    color: Colors.blue,
                  ),
                  Text(
                    name,
                    style: const TextStyle(
                        fontSize: 25,
                        color: Colors.black,
                        fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            Container(
              child: Padding(
                padding: const EdgeInsets.only(
                    left: 100, right: 0, top: 50, bottom: 25),
                child: Row(
                  children: [
                    Text(
                      count.toString(),
                      style: const TextStyle(
                          fontSize: 100, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

final List<AdminTweetModel> Tweets = [
  AdminTweetModel(
    username: " Kareem",
    //tweet: "Lorem ipsum dolor sit amet",
    //time: "7h",
    twitterHandle: "@Kareem1",
  ),
  AdminTweetModel(
      username: "Ahmed",
      //tweet: "Lorem ipsum dolor sit amet",
      //time: "3m",
      twitterHandle: "@Ahmed28"),
  AdminTweetModel(
    username: " Kareem",
    //tweet: "Lorem ipsum dolor sit amet",
    //time: "7h",
    twitterHandle: "@Kareem1",
  ),
  AdminTweetModel(
      username: "Ahmed",
      //tweet: "Lorem ipsum dolor sit amet",
      //time: "3m",
      twitterHandle: "@Ahmed28"),
  AdminTweetModel(
      username: "Hassan",
      //tweet: "Lorem ipsum dolor sit amet",
      //time: "3m",
      twitterHandle: "@Hassan212"),
];

class User {
  final String name;
  final String userName;
  final String profilePic;
  User({required this.name, required this.userName, required this.profilePic});
  static User fromJson(json) => User(
        name: json['name'],
        userName: json['username'],
        profilePic: json['profilePic'],
      );
}
