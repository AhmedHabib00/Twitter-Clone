// ignore_for_file: prefer_const_constructors, file_names, prefer_const_literals_to_create_immutables, non_constant_identifier_names, unnecessary_string_interpolations, must_be_immutable, avoid_print, unused_element, prefer_typing_uninitialized_variables, unnecessary_new, unused_local_variable, deprecated_member_use

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:whisper/layout/Timeline/sidemenu.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

const TextStyle _textStyle = TextStyle(
  fontSize: 40,
  fontWeight: FontWeight.bold,
  letterSpacing: 2,
  fontStyle: FontStyle.italic,
);

class TimelinePage extends StatefulWidget {
  final String token;
  final String userId;
  const TimelinePage({Key? key, required this.token, required this.userId})
      : super(key: key);

  @override
  State<TimelinePage> createState() => _TimelinePageState();
}

class _TimelinePageState extends State<TimelinePage> {
  final scrollController = ScrollController();
  TextEditingController tweetController = new TextEditingController();

  var scaffoldkey = GlobalKey<ScaffoldState>();
  List listOfTweets = [];
  late List URLss = [];
  late String images = '';
  late String content = 'Android first post';
  late String gifs = '';
  late String replyId = '';
  late List users = [];
  var URLs;
  late Future<String> countFuture;
  late Future<String> profilePictureFuture;
  late var count = '';
  var token = '';
  bool scaffoldKey = false;

  //late String images = '';
  // late String gifs = '';
  //late String replyId = '';
  //late List userss = [];

  // bool isRetweeted = false;
  // bool iscommented = false;
  // bool isLiked = false;
  late var profilePicture = '';

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
      print(count);
    }
    return count;
  }

  Future<String> getProfileInfo(token) async {
    var response = await http.get(
      Uri.parse(
        ('http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/user/${widget.userId}/profile_settings'),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    if (response.statusCode == 200) {
      var items = json.decode(response.body);
      print(response.statusCode);
      print(response.body);
      profilePicture = items['Profile Picture'];
      print(profilePicture);
    }
    return profilePicture;
  }

  // Future<List> tweetPost(
  //   //String images,
  //   List content,
  //   //String gifs,
  //   //String replyId,
  //   List users,
  //   String token,
  // ) async {
  //   var data = {
  //     content: ['$content'],
  //     //'images': '',
  //     //'gifs':
  //     // 'https://i0.wp.com/voonze.com/wp-content/uploads/2020/07/img_5f2162a15c4d1.gif?h=250&ssl=1',
  //     users: [],
  //     //'replyId': '',
  //   };
  //   // print(images);
  //   print(content);
  //   // print(gifs);
  //   //print(replyId);
  //   print(users);
  //   var response = await http.post(
  //       Uri.parse(
  //           'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/'),
  //       body: data,
  //       headers: {"x-auth-token": token});
  //   print(response.body);
  //   return users;
  // }

  @override
  void initState() {
    super.initState();
    countFuture = getTweetcount(widget.token);
    profilePictureFuture = getProfileInfo(widget.token);
  }

  @override
  Widget build(BuildContext context) {
    //print(userss);

    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 50,
          elevation: 1,
          backgroundColor: Theme.of(context).appBarTheme.backgroundColor,
          leading: InkWell(
            child: FutureBuilder<String>(
                future: profilePictureFuture,
                builder: ((context, snapshot) {
                  if (snapshot.hasData) {
                    profilePicture = snapshot.data!;
                    return Padding(
                      padding: const EdgeInsets.all(9.0),
                      child: CircleAvatar(
                        backgroundImage: NetworkImage(
                          profilePicture.toString(),
                        ),
                      ),
                    );
                  } else {
                    return const Center(child: CircularProgressIndicator());
                  }
                })),
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
                return getTweetBody();
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            })),
        drawer: SideMenu(token: token, userId: widget.userId),
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.blue,
          onPressed: () async {
            openAddTweetDialog();
          },
          child: const Icon(Icons.local_fire_department_sharp),
        ),
        bottomNavigationBar: Padding(
          padding: const EdgeInsets.all(8.0),
          child: BottomNavigationBar(
            backgroundColor: Color.fromARGB(255, 255, 255, 255),
            showSelectedLabels: false,
            showUnselectedLabels: true,
            items: [
              BottomNavigationBarItem(
                icon: FaIcon(
                  FontAwesomeIcons.home,
                  color: Color.fromARGB(255, 0, 0, 0),
                  size: 25,
                ),
                label: 'News Feed',
                backgroundColor: Color.fromARGB(255, 255, 255, 255),
              ),
              BottomNavigationBarItem(
                  icon: FaIcon(
                    FontAwesomeIcons.search,
                    color: Color.fromARGB(255, 0, 0, 0),
                    size: 25,
                  ),
                  label: 'Search',
                  backgroundColor: Color.fromARGB(255, 255, 255, 255)),
              BottomNavigationBarItem(
                  icon: FaIcon(
                    FontAwesomeIcons.bell,
                    color: Color.fromARGB(255, 0, 0, 0),
                    size: 25,
                  ),
                  label: 'Notifications',
                  backgroundColor: Color.fromARGB(255, 255, 255, 255)),
              BottomNavigationBarItem(
                  icon: FaIcon(
                    FontAwesomeIcons.envelope,
                    color: Color.fromARGB(255, 0, 0, 0),
                    size: 25,
                  ),
                  label: 'Inbox',
                  backgroundColor: Color.fromARGB(255, 255, 255, 255)),
            ],
          ),
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
        context: context,
        builder: (context) => AlertDialog(
          title: Text(
            'Add Tweet',
          ),
          content: TextField(
            controller: tweetController,
            decoration: InputDecoration(
              hintText: "What's happening?",
            ),
          ),
          actions: [
            TextButton(
              onPressed: () async {
                var request = http.MultipartRequest(
                  'POST',
                  Uri.parse(
                      'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/'),
                );
                //Header....
                request.headers['x-auth-token'] = widget.token;
                print(widget.token);

                request.fields['content'] = tweetController.text;
                request.fields['replyId'] = replyId.toString();
                request.fields['gifs'] = gifs.toString();
                request.fields['users'] = users.toString();
                // request.files.add(http.MultipartFile.fromBytes(
                //   'images',
                //   [],
                //   filename: 'some-file-name.jpg',
                //   contentType: MediaType("image", "jpg"),
                //));
                var response = await request.send();
                print(response.stream);
                print(response.statusCode);
                final res = await http.Response.fromStream(response);
                print(res.body);
              },
              child: Text('Tweet'),
            ),
          ],
        ),
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
    var isLiked = item['isLiked'];
    var isRetweeted = item['isRetweeted'];
    bool iscommented = false;
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

MediaType(String s, String basename) {}
