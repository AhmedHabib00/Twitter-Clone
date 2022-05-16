// ignore_for_file: file_names, avoid_unnecessary_containers, non_constant_identifier_names, unnecessary_new, avoid_print, avoid_init_to_null, unused_local_variable, duplicate_import, prefer_typing_uninitialized_variables, camel_case_types, unused_element, unnecessary_brace_in_string_interps, prefer_is_empty, must_be_immutable

// import 'dart:io';

import 'package:flutter/material.dart';
import 'package:whisper/layout/Admin/GraphBar.dart';
import 'package:whisper/layout/Admin/GraphPie.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:whisper/layout/Login/login.dart';
import 'package:whisper/layout/WelcomePage/WelcomePage.dart';

class AdminPage extends StatefulWidget {
  final String token;
  final String adminToken;
  const AdminPage({Key? key, required this.token, required this.adminToken})
      : super(key: key);
  @override
  _AdminPage createState() => _AdminPage();
}

class _AdminPage extends State<AdminPage> {
  List users = [];
  List usersBanned = [];
  late var NoUser = 5;
  late var NoBan = 5;
  late var ratioTweet = '5';
  late var count = 5;
  late var countBanned = 7;
  late Future<int> noUserFuture;
  late Future<int> noBanFuture;
  late Future<String> ratioTweetFuture;
  late Future<int> getUserCountFuture;
  late Future<int> getUserBannedCountFuture;

  Future<int> NoUsers(token) async {
    Map mapResponse;
    Map dataResponse;
    var response = await http.get(
      Uri.parse(
        ('http://10.0.2.2:8080/admins/statistics/noUsers'),
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
    return NoUser;
  }

  Future<int> NoBanned(token) async {
    Map mapResponse;
    Map dataResponse;
    var response = await http.get(
      Uri.parse(
        'http://10.0.2.2:8080/admins/statistics/noBanned',
      ),
      headers: {'x-auth-token': token},
    );
    setState(() {
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse['noBanned'];
      NoBan = dataResponse['count'];
    });
    return NoBan;
  }

  Future<String> ratioTweets(token) async {
    Map mapResponse;
    Map dataResponse;
    var response = await http.get(
      Uri.parse(
        'http://10.0.2.2:8080/admins/statistics/ratioTweets',
      ),
      headers: {'x-auth-token': token},
    );
    setState(() {
      mapResponse = json.decode(response.body);
      dataResponse = mapResponse['ratioTweets'];
      ratioTweet = dataResponse['count'];
    });
    return ratioTweet;
  }

  Future blockUser(token, adminToken, user_id) async {
    Map data = {'end_date': '2023-05-28'};
    var response = await http.post(
      Uri.parse(
        'http://10.0.2.2:8080/admins/${adminToken}/banning/${user_id}/',
      ),
      body: data,
      headers: {
        'x-auth-token': token,
      },
    );
    setState(() {
      if (response.statusCode == 200) {
        print('block was clicked');
      } else {
        print('block not working');
      }
    });
  }

  Future unblockUser(token, adminToken, user_id) async {
    var response = await http.delete(
      Uri.parse(
        'http://10.0.2.2:8080/admins/${adminToken}/banning/${user_id}/',
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    setState(() {
      if (response.statusCode == 200) {
        print('block was clicked');
      } else {
        print('block not working');
      }
    });
  }

  Future<int> getUserNo(token) async {
    var response = await http.get(
      Uri.parse(
        ('http://10.0.2.2:8080/admins/users/?size=1&page=1&search=&state='),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    setState(() {
      count = json.decode(response.body)['count'];
    });
    return count;
  }

  Future getUser(token) async {
    //await Future.delayed(const Duration(seconds: 2));
    var response = await http.get(
      Uri.parse(
        ('http://10.0.2.2:8080/admins/users/?size=$count&page=1&search=&state='),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    if (response.statusCode == 200) {
      var items = json.decode(response.body)['Info'];
      List info = items[0]['data'];
      setState(() {
        users = info;
      });
    } else {
      setState(() {
        users = [];
      });
    }
  }

  Future<int> getUserBannedNo(token) async {
    var response = await http.get(
      Uri.parse(
        ('http://10.0.2.2:8080/admins/users/?size=1&page=1&search=&state=Banned'),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    setState(() {
      countBanned = json.decode(response.body)['count'];
    });
    return countBanned;
  }

  Future getUserBanned(token) async {
    //await Future.delayed(const Duration(seconds: 2));
    var response = await http.get(
      Uri.parse(
        ('http://10.0.2.2:8080/admins/users/?size=$countBanned&page=1&search=&state=Banned'),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    if (response.statusCode == 200) {
      var itemsBanned = json.decode(response.body)['Info'];
      List infoBanned = itemsBanned[0]['data'];
      setState(() {
        usersBanned = infoBanned;
      });
    } else {
      setState(() {
        usersBanned = [''];
      });
    }
  }

  @override
  void initState() {
    super.initState();
    getUserNo(widget.token);
    getUserBannedNo(widget.token);
    noUserFuture = NoUsers(widget.token);
    noBanFuture = NoBanned(widget.token);
    ratioTweetFuture = ratioTweets(widget.token);
    getUserCountFuture = getUserNo(widget.token);
    getUserBannedCountFuture = getUserBannedNo(widget.token);
  }

  @override
  Widget build(BuildContext context) {
    //print(widget.token);
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
            title: Row(
              children: [
                IconButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                          builder: (BuildContext context) =>
                              const WelcomePage()), // testpage
                    );
                  },
                  icon: Image.asset(
                    "lib/shared/Assets/twitterlogoB.png",
                    scale: 10,
                  ),
                  iconSize: 20.0,
                ),
                const Padding(
                  padding: EdgeInsets.only(left: 75),
                  child: Text(
                    "Admin Home",
                    style: TextStyle(
                      fontSize: 25,
                    ),
                  ),
                ),
              ],
            ),
            // title: const Text(
            //   "Admin Home",
            //   style: TextStyle(
            //     fontSize: 25,
            //   ),
            // ),
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
                    Container(
                      child: Padding(
                        padding: const EdgeInsets.only(
                            left: 50, right: 50, top: 0, bottom: 50),
                        child: FutureBuilder<int?>(
                          future: noUserFuture,
                          builder: (context, snapshot) {
                            if (snapshot.hasData) {
                              NoUser = snapshot.data!;
                              return _AdminCard(
                                context: context,
                                count: NoUser,
                                icon: Icons.person,
                                name: " No. of Users",
                              );
                            } else {
                              return const Center(
                                  child: CircularProgressIndicator());
                            }
                          },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 50, right: 50, top: 0, bottom: 50),
                      child: FutureBuilder<int?>(
                        future: noBanFuture,
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            NoBan = snapshot.data!;
                            return _AdminCard(
                              context: context,
                              count: NoBan,
                              icon: Icons.block,
                              name: " No. of banned\n Users",
                            );
                          } else {
                            return const Center(
                                child: CircularProgressIndicator());
                          }
                        },
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 50, right: 50, top: 0, bottom: 50),
                      child: FutureBuilder<String?>(
                        future: ratioTweetFuture,
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            ratioTweet = snapshot.data!;
                            return _AdminCard(
                              context: context,
                              count: ratioTweet,
                              icon: Icons.percent_sharp,
                              name: " Tweets Increased\n by",
                            );
                          } else {
                            return const Center(
                                child: CircularProgressIndicator());
                          }
                        },
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
                          Expanded(child: GraphPie(token: widget.token))
                        ],
                      )),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 50, right: 50, bottom: 0, top: 0),
                      child: Container(
                          child: Column(
                        children: <Widget>[
                          Text(
                            "Most Followed Users",
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
              Container(
                child: FutureBuilder<int>(
                  future: getUserCountFuture,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      count = snapshot.data!;
                      getUser(widget.token);
                      return getBody();
                    } else {
                      return const Center(child: CircularProgressIndicator());
                    }
                  },
                ),
              ),
              Container(
                child: FutureBuilder<int>(
                  future: getUserBannedCountFuture,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      countBanned = snapshot.data!;
                      getUserBanned(widget.token);
                      return getBodyBanned();
                    } else {
                      return const Center(child: CircularProgressIndicator());
                    }
                  },
                ),
              )
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

  Widget getBody() {
    return ListView.builder(
        itemCount: users.length,
        itemBuilder: (context, index) {
          return getCard(users[index]); //Text('index $index');
        });
  }

  Widget getCard(item) {
    var name = item['name'];
    var userName = item['username'];
    var profilePic = item['profilePic'];
    var user_id = item['id'];
    return Card(
      child: ListTile(
        title: Row(
          children: <Widget>[
            Container(
              width: 65,
              height: 65,
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 0, 81, 255),
                borderRadius: BorderRadius.circular(60 / 2),
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: NetworkImage(
                    profilePic.toString(),
                    //"https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                  ),
                ),
              ),
            ),
            const SizedBox(width: 20),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  name.toString(),
                  style: const TextStyle(
                      fontSize: 17, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 10),
                Text(
                  userName.toString(),
                  style: const TextStyle(color: Colors.grey),
                ),
                //const SizedBox(height: 10),
                // Text(
                //   user_id.toString(),
                //   style: const TextStyle(
                //       fontSize: 17, fontWeight: FontWeight.bold),
                // ),
                //const SizedBox(height: 5),
                Padding(
                  padding: const EdgeInsets.only(left: 200, bottom: 0, top: 0),
                  child: MaterialButton(
                    minWidth: double.minPositive,
                    height: 35,
                    onPressed: () {
                      // blockUser(widget.token, widget.adminToken, user_id);
                    },
                    color: const Color.fromARGB(255, 255, 0, 0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Text(
                      "Ban",
                      style: TextStyle(
                        fontSize: 18,
                        color: Color.fromARGB(255, 255, 255, 255),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget getBodyBanned() {
    return ListView.builder(
        itemCount: usersBanned.length,
        itemBuilder: (context, index) {
          return getCardBanned(usersBanned[index]); //Text('index $index');
        });
  }

  Widget getCardBanned(itemBanned) {
    var nameBanned = itemBanned['name'];
    var userNameBanned = itemBanned['username'];
    var profilePicBanned = itemBanned['profilePic'];
    var user_idBanned = itemBanned['id'];
    return Card(
      child: ListTile(
        title: Row(
          children: <Widget>[
            Container(
              width: 65,
              height: 65,
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 0, 81, 255),
                borderRadius: BorderRadius.circular(60 / 2),
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: NetworkImage(
                    profilePicBanned.toString(),
                    //"https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                  ),
                ),
              ),
            ),
            const SizedBox(width: 20),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  nameBanned.toString(),
                  style: const TextStyle(
                      fontSize: 17, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 10),
                Text(
                  userNameBanned.toString(),
                  style: const TextStyle(color: Colors.grey),
                ),
                //const SizedBox(height: 10),
                // Text(
                //   user_idBanned.toString(),
                //   style: const TextStyle(
                //       fontSize: 17, fontWeight: FontWeight.bold),
                // ),
                //const SizedBox(height: 5),
                Padding(
                  padding: const EdgeInsets.only(left: 200, bottom: 0, top: 0),
                  child: MaterialButton(
                    minWidth: double.minPositive,
                    height: 35,
                    onPressed: () {
                      unblockUser(
                          widget.token, widget.adminToken, user_idBanned);
                    },
                    color: const Color.fromARGB(255, 255, 0, 0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Text(
                      "unBan",
                      style: TextStyle(
                        fontSize: 18,
                        color: Color.fromARGB(255, 255, 255, 255),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
