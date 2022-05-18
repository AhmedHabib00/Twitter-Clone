// ignore_for_file: prefer_const_constructors, file_names, prefer_const_literals_to_create_immutables, non_constant_identifier_names, unnecessary_string_interpolations, must_be_immutable, avoid_print, unused_element, prefer_typing_uninitialized_variables

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:whisper/layout/Timeline/sidemenu.dart';
//import 'package:whisper/modules/tweetBoxWidget.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:whisper/modules/tweetBoxWidget.dart';

const TextStyle _textStyle = TextStyle(
  fontSize: 40,
  fontWeight: FontWeight.bold,
  letterSpacing: 2,
  fontStyle: FontStyle.italic,
);

class TimelinePage extends StatefulWidget {
  final String token;
  const TimelinePage({Key? key, required this.token}) : super(key: key);

  @override
  State<TimelinePage> createState() => _TimelinePageState();
}

class _TimelinePageState extends State<TimelinePage> {
  final scrollController = ScrollController();

  var scaffoldkey = GlobalKey<ScaffoldState>();
  List listOfTweets = [];
  List URLss = [];
  var URLs;
  late Future<String> countFuture;
  late var count = '';
  var token = '';
  bool scaffoldKey = false;

  Future getTweet(token) async {
    var response = await http.get(
      Uri.parse(
        ('http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/TimelineTweets/?size=20&page=1&search='),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    if (response.statusCode == 200) {
      var items = json.decode(response.body);
      List info = items;
      setState(() {
        listOfTweets = info;
      });
    } else {
      setState(() {
        listOfTweets = [];
      });
    }
  }

  Future<String> getTweetcount(token) async {
    var response = await http.get(
      Uri.parse(
        ('http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/TimelineTweets/?size=20&page=1&search='),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    if (response.statusCode == 200) {
      var items = json.decode(response.body);
      count = items[0]['id'];
    }
    return count;
  }

  @override
  void initState() {
    super.initState();
    countFuture = getTweetcount(widget.token);
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 75,
          elevation: 1,
          backgroundColor: Theme.of(context).appBarTheme.backgroundColor,
          leading: InkWell(
            child: Padding(
              padding: const EdgeInsets.all(10.0),
              child: CircleAvatar(
                backgroundImage: NetworkImage(
                    'https://previews.123rf.com/images/koblizeek/koblizeek2001/koblizeek200100050/138262629-usuario-miembro-de-perfil-de-icono-de-hombre-vector-de-s%C3%ADmbolo-perconal-sobre-fondo-blanco-aislado-.jpg'),
                radius: 16,
              ),
            ),
            onTap: () {
              scaffoldkey.currentState?.openDrawer();
            },
          ),
          title:
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            SizedBox(),
            IconButton(
              onPressed: () {
                scrollUp();
              },
              icon: Image.asset(
                "lib/shared/Assets/twitterlogoB.png",
                scale: 20,
              ),
              iconSize: 55.0,
            ),
            IconButton(
              onPressed: () {},
              icon: FaIcon(
                FontAwesomeIcons.star,
              ),
              iconSize: 20.0,
            ),
          ]),
        ),
        key: scaffoldkey,
        body: FutureBuilder<String>(
            future: countFuture,
            builder: ((context, snapshot) {
              if (snapshot.hasData) {
                count = snapshot.data!;
                getTweet(widget.token);
                //return SingleChildScrollView(child: TweetBoxWidgety());
                return getTweetBody();
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            })),
        drawer: SideMenu(token: token),
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.blue,
          onPressed: () {
            openAddTweetDialog();
          },
          child: const Icon(Icons.add),
        ),
        bottomNavigationBar: BottomNavigationBar(
          showSelectedLabels: false,
          showUnselectedLabels: false,
          items: [
            BottomNavigationBarItem(
                icon: FaIcon(FontAwesomeIcons.home),
                label: 'News Feed',
                backgroundColor: Colors.black),
            BottomNavigationBarItem(
                icon: FaIcon(FontAwesomeIcons.search),
                label: 'Search',
                backgroundColor: Colors.black),
            BottomNavigationBarItem(
                icon: FaIcon(FontAwesomeIcons.microphone),
                label: 'Spaces',
                backgroundColor: Colors.black),
            BottomNavigationBarItem(
                icon: FaIcon(FontAwesomeIcons.bell),
                label: 'Notifications',
                backgroundColor: Colors.black),
            BottomNavigationBarItem(
                icon: FaIcon(FontAwesomeIcons.envelope),
                label: 'Inbox',
                backgroundColor: Color.fromARGB(255, 0, 0, 0)),
          ],
        ),
      ),
    );
  }

  void scrollUp() {
    const double start = 0;
    scrollController.animateTo(start,
        duration: Duration(seconds: 1), curve: Curves.easeIn);
  }

  Future openAddTweetDialog() => showDialog(
        builder: (context) => AlertDialog(
          title: Text(
            'Your comment',
          ),
          content: TextField(
            decoration: InputDecoration(
              hintText: "Enter your comment",
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {},
              child: Text('submit'),
            ),
          ],
        ),
        context: context,
      );

  Widget getTweetBody() {
    return ListView.builder(
        itemCount: listOfTweets.length,
        itemBuilder: (context, index) {
          return getTweetCard(listOfTweets[index]); //Text('index $index');
        });
  }

  Widget getTweetCard(item) {
    var name = item['displayName'];
    var userName = item['userName'];
    var profilePic = item['url'];
    var content = item['content'];
    List URLss = item['URLs'];
    if (URLss.isEmpty) {
      URLs = URLss;
    } else {
      URLs = URLss[0];
    }
    return Padding(
      padding: const EdgeInsets.all(3.0),
      child: Card(
        child: ListTile(
          title: Row(
            children: <Widget>[
              Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 0, 81, 255),
                  borderRadius: BorderRadius.circular(60 / 2),
                  image: DecorationImage(
                    fit: BoxFit.cover,
                    image: NetworkImage(
                      profilePic.toString(),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 20),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    children: [
                      Text(
                        name.toString().length > 20
                            ? name.toString().substring(0, 20) + '' // + '...'
                            : name.toString(),
                        style: const TextStyle(
                          color: Colors.black,
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Text(
                        userName.toString().length > 8
                            ? '@' + userName.toString().substring(0, 8) + '...'
                            : '@' + userName.toString(),
                        style: const TextStyle(color: Colors.grey),
                      ),
                    ],
                  ),
                  const SizedBox(height: 5),
                  Text(
                    content.toString(),
                    style: const TextStyle(
                        fontSize: 17, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 5),
                  Container(
                    width: 275,
                    height: 200,

                    decoration: BoxDecoration(
                      color: Color.fromARGB(255, 255, 255, 255),
                      image: DecorationImage(
                        fit: BoxFit.contain,
                        image: NetworkImage(
                          URLs.toString(),
                        ),
                      ),
                    ),

                    // child: Image.network(
                    //   URLs.toString(),
                    //   fit: BoxFit.contain,
                    // ),
                  ),
                  const SizedBox(height: 5),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
