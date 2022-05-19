// ignore_for_file: prefer_const_constructors, file_names, prefer_const_literals_to_create_immutables, non_constant_identifier_names, unnecessary_string_interpolations, must_be_immutable, avoid_print, unused_element, prefer_typing_uninitialized_variables

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:whisper/layout/Timeline/sidemenu.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

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
  late List URLss = [];
  var URLs;
  var URLsEmpty;
  late Future<String> countFuture;
  late var count = '';
  var token = '';
  bool scaffoldKey = false;
  bool isRetweeted = false;
  bool iscommented = false;
  bool isLiked = false;

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
          toolbarHeight: 50,
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
              iconSize: 40.0,
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
          backgroundColor: Color.fromARGB(255, 0, 0, 0),
          showSelectedLabels: false,
          showUnselectedLabels: false,
          items: [
            BottomNavigationBarItem(
                icon: FaIcon(FontAwesomeIcons.home),
                label: 'News Feed',
                backgroundColor: Color.fromARGB(255, 2, 0, 0)),
            BottomNavigationBarItem(
                icon: FaIcon(FontAwesomeIcons.search),
                label: 'Search',
                backgroundColor: Color.fromARGB(255, 0, 0, 0)),
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
    var noOfLike = item['noOfLike'];
    var noOfReplies = item['noOfReplies'];
    var noOfRetweets = item['noOfRetweets'];
    //var isLiked = item['isLiked'];
    //print(isLiked);
    // bool isRetweeted = false;
    // bool iscommented = false;
    List URLss = item['URLs'];

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: ClipRRect(
            borderRadius: BorderRadius.all(Radius.circular(200)),
            child: Image.network(
              profilePic.toString(),
              width: 60,
            ),
          ),
        ),
        Expanded(
            child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                      name.toString().length > 15
                          ? name.toString().substring(0, 15) + ''
                          : name.toString(),
                      style: TextStyle(fontWeight: FontWeight.bold)),
                  Padding(
                    padding: const EdgeInsets.only(left: 8.0),
                    child: Text(
                        "@${userName.toString().length > 11 ? userName.toString().substring(0, 11) + '..' : userName.toString()}"),
                  ),
                ],
              ),
              Padding(
                padding: const EdgeInsets.only(top: 8.0, right: 8.0),
                child: Text(content.toString()),
              ),
              URLss.isEmpty
                  ? SizedBox.shrink()
                  : Column(
                      children: [
                        SizedBox(height: 15),
                        Padding(
                          padding: const EdgeInsets.only(top: 8.0),
                          child: ClipRRect(
                            borderRadius: BorderRadius.all(Radius.circular(16)),
                            child: Image.network(
                              URLss[0].toString(),
                              height: 200,
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ],
                    ),
              Padding(
                padding: const EdgeInsets.only(top: 8.0),
                child: Row(
                  children: [
                    Expanded(
                      child: InkWell(
                        child: Container(
                          margin: EdgeInsets.all(8),
                          child: Text.rich(
                            TextSpan(
                              children: [
                                WidgetSpan(
                                    child: iscommented
                                        ? FaIcon(
                                            FontAwesomeIcons.comment,
                                            size: 17,
                                            color:
                                                Color.fromARGB(255, 0, 60, 255),
                                          )
                                        : FaIcon(
                                            FontAwesomeIcons.comment,
                                            size: 17,
                                            //color: Colors.green,
                                          )),
                                TextSpan(text: "  $noOfReplies"),
                              ],
                            ),
                          ),
                        ),
                        onTap: () {
                          setState(() {
                            if (iscommented == true) {
                              iscommented = false;
                              noOfReplies += 1;
                            } else {
                              iscommented = true;
                              noOfReplies -= 1;
                            }
                          });
                        },
                      ),
                    ),
                    Expanded(
                      child: InkWell(
                        child: Text.rich(
                          TextSpan(
                            children: [
                              WidgetSpan(
                                  child: isRetweeted
                                      ? FaIcon(
                                          FontAwesomeIcons.retweet,
                                          size: 17,
                                          color: Colors.green,
                                        )
                                      : FaIcon(
                                          FontAwesomeIcons.retweet,
                                          size: 17,
                                          //color: Colors.green,
                                        )),
                              TextSpan(
                                text: '  ${noOfRetweets.toString()}',
                              ),
                            ],
                          ),
                        ),
                        onTap: () {
                          setState(() {
                            if (isRetweeted == false) {
                              isRetweeted = true;
                              noOfRetweets += 1;
                            } else {
                              isRetweeted = false;
                              noOfRetweets -= 1;
                            }
                          });
                        },
                      ),
                    ),
                    Expanded(
                      child: InkWell(
                        child: Text.rich(
                          TextSpan(
                            children: [
                              WidgetSpan(
                                child: isLiked
                                    ? FaIcon(
                                        FontAwesomeIcons.solidHeart,
                                        size: 17,
                                        color: Colors.redAccent,
                                      )
                                    : FaIcon(
                                        FontAwesomeIcons.heart,
                                        size: 17,
                                      ),
                              ),
                              TextSpan(text: '  ${noOfLike.toString()}')
                            ],
                          ),
                        ),
                        onTap: () {
                          setState(() {
                            if (isLiked == false) {
                              isLiked = true;
                              noOfLike += 1;
                            } else {
                              isLiked = false;
                              noOfLike -= 1;
                            }
                          });
                        },
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 10,
              )
            ],
          ),
        ))
      ],
    );
  }
}
