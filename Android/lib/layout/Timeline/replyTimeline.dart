// ignore_for_file: prefer_const_constructors, file_names, prefer_const_literals_to_create_immutables, non_constant_identifier_names, unnecessary_string_interpolations, must_be_immutable, avoid_print, unused_element, prefer_typing_uninitialized_variables, unnecessary_new, unused_local_variable, deprecated_member_use, camel_case_types

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:whisper/layout/Timeline/replyTweetPage.dart';
import 'package:whisper/layout/Timeline/sidemenu.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// const TextStyle _textStyle = TextStyle(
//   fontSize: 40,
//   fontWeight: FontWeight.bold,
//   letterSpacing: 2,
//   fontStyle: FontStyle.italic,
// );

class replyTimeline extends StatefulWidget {
  final String token;
  final String tweetId;
  final String userId;
  const replyTimeline(
      {Key? key,
      required this.token,
      required this.userId,
      required this.tweetId})
      : super(key: key);

  @override
  State<replyTimeline> createState() => _replyTimeline();
}

class _replyTimeline extends State<replyTimeline> {
  final scrollController = ScrollController();
  TextEditingController tweetController = new TextEditingController();

  var scaffoldkey = GlobalKey<ScaffoldState>();
  List replylistOfTweets = [];
  late List URLss = [];
  late String images = '';
  late String content = 'Android first post';
  late String gifs = '';
  late String replyId = '';
  late List users = [];
  var URLs;
  late Future<String> replycountFuture;
  late Future<String> replyprofilePictureFuture;
  late var count = '';
  var token = '';
  bool scaffoldKey = false;
  late var profilePicture = '';
  late String tweedId = '';
  // bool isRetweeted = false;
  // bool iscommented = false;
  // bool isLiked = false;

  Future putLike(token, tweetId) async {
    var response = await http.put(
      Uri.parse(
          //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/$tweetId/like'),
          'http://10.0.2.2:8080/tweets/$tweetId/like'),
      headers: {'x-auth-token': token},
    );
    print('this is token');
    print(token);
    print('tweet id inside api');
    print(tweetId);
    if (response.statusCode == 200) {
      print(response.body);
    } else {
      print(response.statusCode);
      print(response.body);
    }
  }

  Future retweet(token, tweetId) async {
    var response = await http.post(
      Uri.parse(
          //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/$tweetId/retweet'),
          'http://10.0.2.2:8080/tweets/$tweetId/retweet'),
      headers: {'x-auth-token': token},
    );
    if (response.statusCode == 200) {
      print(response.body);
    } else {
      print(response.statusCode);
      print(response.body);
    }
  }

  Future getreplyTweet(token) async {
    var response = await http.get(
      Uri.parse(
        (
            //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/${widget.tweetId}/repliesArray/?page=1&size=300'),
            'http://10.0.2.2:8080/tweets/${widget.tweetId}/repliesArray/?page=1&size=300'),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    if (response.statusCode == 200) {
      var itemsReply = json.decode(response.body);
      List infoReply = itemsReply;
      setState(() {
        replylistOfTweets = infoReply;
      });
    } else {
      //setState(() {
      replylistOfTweets = [];
      // });
    }
  }

  Future<String> getreplyTweetcount(token) async {
    var response = await http.get(
      Uri.parse(
        (
            //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/${widget.tweetId}/repliesArray/?page=1&size=10'),
            'http://10.0.2.2:8080/tweets/${widget.tweetId}/repliesArray/?page=1&size=10'),
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
        (
            //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/user/${widget.userId}/profile_settings'),
            'http://10.0.2.2:8080/user/${widget.userId}/profile_settings'),
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

  @override
  void initState() {
    super.initState();
    replycountFuture = getreplyTweetcount(widget.token);
    replyprofilePictureFuture = getProfileInfo(widget.token);
    print('token');
    print(widget.token);
    print('user id');
    print(widget.userId);
    print('tweet id');
    print(widget.tweetId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      appBar: AppBar(
        toolbarHeight: 50,
        elevation: 1,
        backgroundColor: Theme.of(context).appBarTheme.backgroundColor,
        leading: InkWell(
          child: FutureBuilder<String>(
              future: replyprofilePictureFuture,
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
          future: replycountFuture,
          builder: ((context, snapshot) {
            if (snapshot.hasData) {
              count = snapshot.data!;
              getreplyTweet(widget.token);
              return getreplyTweetBody();
            } else {
              return const Center(child: CircularProgressIndicator());
            }
          })),
      drawer: SideMenu(token: widget.token, userId: widget.userId),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return replyTweetPage(
                  token: widget.token,
                  tweetId: widget.tweetId,
                );
              },
            ),
          );
        },
        child: const Icon(Icons.local_fire_department_sharp),
      ),
    );
  }

  void scrollUp() {
    const double start = 0;
    scrollController.animateTo(start,
        duration: Duration(seconds: 1), curve: Curves.easeIn);
  }

  Widget getreplyTweetBody() {
    return ListView.builder(
        itemCount: replylistOfTweets.length,
        itemBuilder: (context, index) {
          return getreplyTweetCard(replylistOfTweets[index]);
        });
  }

  Widget getreplyTweetCard(item) {
    var tweetId = item['id'];
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
                          // Navigator.push(
                          //   context,
                          //   MaterialPageRoute(
                          //     builder: (context) {
                          //       return replyPage(
                          //         token: widget.token,
                          //         tweetId: tweetId,
                          //       );
                          //     },
                          //   ),
                          // );
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
                          retweet(widget.token, tweetId);
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
                          putLike(
                            widget.token,
                            tweetId,
                          );
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
