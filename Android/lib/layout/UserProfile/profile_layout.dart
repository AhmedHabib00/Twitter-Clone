// ignore_for_file: non_constant_identifier_names, prefer_const_literals_to_create_immutables, unnecessary_const, avoid_print, unnecessary_brace_in_string_interps, unnecessary_string_interpolations, avoid_unnecessary_containers

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:whisper/layout/Timeline/sidemenu.dart';
import 'package:whisper/layout/UserProfile/edit_profile.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ProfilePage extends StatefulWidget {
  final String token;
  final String userId;
  const ProfilePage({Key? key, required this.token, required this.userId})
      : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage>
    with SingleTickerProviderStateMixin {
  bool isTitlePassed = false;
  bool isLiked = false;
  late var profilePicture = '';
  late var profileDisplayName = '';
  late var profileUsername = '';
  late var coverPicture = '';
  late var location = '';
  late var description = '';
  late var createdAt = '';
  late var Birthdate = '';
  late var content = '';
  late var postedBy = '';
  late var likes = '';
  late var retweets = '';
  late var count = '';
  List listOfTweets = [];
  late Future<String> profilePictureFuture;
  late Future<String> coverPictureFuture;
  late Future<String> userTweetsFuture;
  late Future<String> countFuture;

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
      profilePicture = items['Profile Picture'];
      profileDisplayName = items['displayName'];
      profileUsername = items['username'];
      coverPicture = items['Cover Photo'];
      location = items['location'];
      description = items['description'];
      createdAt = items['createdAt'];
      Birthdate = items['Birthdate'];
    }
    return profilePicture;
  }

  Future<String> getProfileCover(token) async {
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
      coverPicture = items['Cover Photo'];
    }
    return coverPicture;
  }

  Future<String> getUserTweetsCount(token) async {
    var response = await http.get(
      Uri.parse(
        (
            //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/TimelineTweets/?size=1&page=1&search='),
            'http://10.0.2.2:8080/user/${widget.userId}'),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    if (response.statusCode == 200) {
      var items = json.decode(response.body);
      count = items['filteredTweets'][0]['tweet ID'];
      print(count);
    }
    return count;
  }

  Future getUserTweets(token) async {
    var response = await http.get(
      Uri.parse(
        (
            //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/tweets/TimelineTweets/?size=300&page=1&search='),
            'http://10.0.2.2:8080/user/${widget.userId}'),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    if (response.statusCode == 200) {
      var items = json.decode(response.body);
      List info = items['filteredTweets'];
      listOfTweets = info;
      setState(() {
        listOfTweets = info;
      });
    } else {
      setState(() {
        listOfTweets = [];
      });
    }
  }

  void like() {
    if (isLiked == true) {
      setState(() {
        isLiked = false;
      });
    } else {
      setState(() {
        isLiked = true;
      });
    }
  }

  var selectedIndex = 0;

  void _onUpdateScroll(ScrollMetrics metrics) {
    if (metrics.pixels.round() > 100) {
      setState(() {
        isTitlePassed = true;
      });
    } else {
      setState(() {
        isTitlePassed = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    countFuture = getUserTweetsCount(widget.token);
    profilePictureFuture = getProfileInfo(widget.token);
    coverPictureFuture = getProfileCover(widget.token);
  }

  @override
  Widget build(BuildContext context) {
    getUserTweets(widget.token);
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          toolbarHeight: 0,
        ),
        body: NotificationListener<ScrollNotification>(
          onNotification: (scrollNotification) {
            if (scrollNotification is ScrollUpdateNotification) {
              _onUpdateScroll(scrollNotification.metrics);
            }
            return false;
          },
          child: CustomScrollView(
            shrinkWrap: true,
            slivers: <Widget>[
              SliverAppBar(
                title: Text(
                  isTitlePassed ? '$profileUsername' : '',
                  style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
                leading: const Icon(
                  Icons.arrow_back_rounded,
                  color: Color.fromARGB(255, 255, 255, 255),
                ),
                actions: [
                  const Icon(
                    Icons.search_rounded,
                    color: Color.fromARGB(255, 255, 255, 255),
                    size: 30,
                  ),
                  const Icon(
                    Icons.more_vert_rounded,
                    color: Color.fromARGB(255, 255, 255, 255),
                    size: 30,
                  ),
                ],
                pinned: true,
                expandedHeight: 140,
                flexibleSpace: FutureBuilder<String>(
                    future: coverPictureFuture,
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        coverPicture = snapshot.data!;
                        return FlexibleSpaceBar(
                          background: Image.network(
                            coverPicture.toString(),
                            fit: BoxFit.cover,
                          ),
                        );
                      } else {
                        return const Center(
                            child: CircularProgressIndicator(
                          color: Colors.red,
                        ));
                      }
                    }),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          FutureBuilder<dynamic>(
                              future: profilePictureFuture,
                              builder: ((context, snapshot) {
                                if (snapshot.hasData) {
                                  return Column(
                                    children: [
                                      Row(
                                        children: [
                                          SizedBox(
                                            height: 70,
                                            width: 70,
                                            child: CircleAvatar(
                                              backgroundImage: NetworkImage(
                                                profilePicture.toString(),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          Padding(
                                            padding:
                                                const EdgeInsets.only(top: 10),
                                            child: Text(
                                              '${profileDisplayName}',
                                              style: const TextStyle(
                                                fontSize: 16,
                                                fontWeight: FontWeight.w800,
                                                color: Colors.black,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          Padding(
                                            padding:
                                                const EdgeInsets.only(top: 5),
                                            child: Text(
                                              '$profileUsername',
                                              style: const TextStyle(
                                                color: Colors.grey,
                                                fontSize: 16,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  );
                                } else {
                                  return const Center(
                                      child: CircularProgressIndicator());
                                }
                              })),
                          ElevatedButton(
                              onPressed: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (context) {
                                      return editProfile(
                                          token: widget.token,
                                          userId: widget.userId);
                                    },
                                  ),
                                );
                              },
                              style: ButtonStyle(
                                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(25.0),
                                      side: const BorderSide(
                                          color: Color.fromARGB(255, 0, 0, 0),
                                          width: 150))),
                                  backgroundColor: MaterialStateProperty.all(
                                      const Color.fromARGB(255, 255, 255, 255)),
                                  overlayColor: MaterialStateProperty.all(
                                      const Color.fromARGB(255, 0, 195, 255)),
                                  fixedSize: MaterialStateProperty.all(
                                      const Size(120, 30))),
                              child: const Text('Edit Profile',
                                  style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black)))
                        ],
                        mainAxisSize: MainAxisSize.max,
                      ),
                      FutureBuilder<dynamic>(
                        future: profilePictureFuture,
                        builder: ((context, snapshot) {
                          if (snapshot.hasData) {
                            return Column(
                              children: [
                                description.isEmpty
                                    ? const SizedBox.shrink()
                                    : Row(
                                        children: [
                                          Padding(
                                            padding:
                                                const EdgeInsets.only(top: 10),
                                            child: Text(
                                              '$description',
                                              style: const TextStyle(
                                                fontSize: 15,
                                                fontWeight: FontWeight.w400,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                location.isEmpty
                                    ? const SizedBox.shrink()
                                    : Row(
                                        children: [
                                          Padding(
                                              padding: const EdgeInsets.only(
                                                  top: 10),
                                              child: Text.rich(
                                                TextSpan(children: <InlineSpan>[
                                                  const WidgetSpan(
                                                      child: Icon(
                                                    Icons.location_on_outlined,
                                                    size: 20,
                                                  )),
                                                  TextSpan(text: '$location')
                                                ]),
                                                style: const TextStyle(
                                                    fontSize: 15,
                                                    color: Colors.black45),
                                              )),
                                        ],
                                      ),
                                Birthdate.isEmpty
                                    ? const SizedBox.shrink()
                                    : Column(
                                        children: [
                                          Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    top: 10),
                                                child: Text.rich(
                                                  TextSpan(
                                                      children: <InlineSpan>[
                                                        const WidgetSpan(
                                                            child: Icon(
                                                          Icons.circle_outlined,
                                                          size: 20,
                                                        )),
                                                        TextSpan(
                                                          text: Birthdate.toString()
                                                                      .length >
                                                                  10
                                                              ? Birthdate.toString()
                                                                      .substring(
                                                                          0,
                                                                          10) +
                                                                  ''
                                                              : Birthdate
                                                                  .toString(),
                                                        )
                                                      ]),
                                                  style: const TextStyle(
                                                      fontSize: 15,
                                                      color: Colors.black45),
                                                ),
                                              ),
                                              createdAt.isEmpty
                                                  ? const SizedBox.shrink()
                                                  : Padding(
                                                      padding:
                                                          const EdgeInsets.only(
                                                              top: 10,
                                                              left: 50),
                                                      child: Text.rich(
                                                        TextSpan(children: <
                                                            InlineSpan>[
                                                          const WidgetSpan(
                                                              child: Icon(
                                                            Icons
                                                                .calendar_month_outlined,
                                                            size: 20,
                                                          )),
                                                          TextSpan(
                                                              text:
                                                                  'Joined $createdAt')
                                                        ]),
                                                        style: const TextStyle(
                                                            fontSize: 15,
                                                            color:
                                                                Colors.black45),
                                                      ),
                                                    ),
                                            ],
                                          ),
                                        ],
                                      ),
                              ],
                            );
                          } else {
                            return const Center(
                              child: CircularProgressIndicator(),
                            );
                          }
                        }),
                      ),
                    ],
                    crossAxisAlignment: CrossAxisAlignment.start,
                  ),
                ),
              ),
              SliverAppBar(
                toolbarHeight: 0,
                backgroundColor: Colors.white,
                bottom: TabBar(
                  indicatorColor: Colors.lightBlue,
                  labelColor: Colors.black,
                  isScrollable: true,
                  tabs: [
                    const Tab(
                      text: 'Tweets',
                    ),
                    const Tab(
                      text: 'Tweets & Replies',
                    ),
                    const Tab(
                      text: 'Media',
                    ),
                    const Tab(
                      text: 'Likes',
                    ),
                  ],
                  onTap: (index) {
                    setState(() {
                      selectedIndex = index;
                    });
                  },
                ),
              ),
              SliverToBoxAdapter(
                child: IndexedStack(
                  children: <Widget>[
                    Container(
                      child: const Text(
                        'Tweets',
                      ),
                    ),
                    Container(
                      child: const Text(
                        'Tweets & Replies',
                      ),
                    ),
                    Container(
                      child: const Text(
                        'Media',
                      ),
                    ),
                    Container(
                      child: const Text(
                        'Likes',
                      ),
                    ),
                  ],
                  index: selectedIndex,
                ),
              )
              // SliverToBoxAdapter(
              //   child: IndexedStack(
              //     children: <Widget>[
              //       FutureBuilder<String>(
              //           future: countFuture,
              //           builder: ((context, snapshot) {
              //             print(getUserTweetsCount(widget.token));
              //             if (snapshot.hasData) {
              //               count = snapshot.data!;
              //               getUserTweets(widget.token);
              //               return getTweetBody();
              //             } else {
              //               return const Center(
              //                   child: CircularProgressIndicator());
              //             }
              //           })),

              // FutureBuilder<dynamic>(
              //     future: getUserTweets(widget.token),
              //     builder: ((context, snapshot) {
              //       //if (snapshot.hasData) {
              //       //listOfTweets = snapshot.data!;
              //       getUserTweets(widget.token);
              //       return getTweetBody();

              //       // }
              //       //  else {
              //       //   return const Center(
              //       //       child: CircularProgressIndicator());
              //       // }
              //     })),
              //],
              //index: selectedIndex,
              // ),
              //),
            ],
          ),
        ),
        drawer: SideMenu(token: widget.token, userId: widget.userId),
      ),
    );
  }

  Widget getTweetBody() {
    return ListView.builder(
        itemCount: listOfTweets.length,
        itemBuilder: (context, index) {
          return getTweetCard(listOfTweets[index]);
        });
  }

  Widget getTweetCard(item) {
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
          padding: const EdgeInsets.all(12.0),
          child: ClipRRect(
            borderRadius: BorderRadius.all(Radius.circular(200)),
            child: Image.network(
              profilePic.toString(),
              width: 60,
              height: 60,
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
                          //Navigator.push(
                          // context,
                          // MaterialPageRoute(
                          // builder: (context) {
                          // return replyPage(
                          //   token: widget.token,
                          //   tweetId: tweetId,
                          // );
                          // Navigator.of(context).pushAndRemoveUntil(
                          //     MaterialPageRoute(
                          //       builder: (BuildContext context) =>
                          //           replyTimeline(
                          //               token: widget.token,
                          //               userId: widget.userId,
                          //               tweetId: tweetId),
                          //     ),
                          //     (Route<dynamic> route) => false);
                          //return
                          // replyTimeline(
                          // token: widget.token,
                          //userId: widget.userId,
                          //tweetId: tweetId);
                          // },
                          //),
                          //);
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
                          // retweet(widget.token, tweetId);
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
                          // putLike(
                          //   widget.token,
                          //   tweetId,
                          // );
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
