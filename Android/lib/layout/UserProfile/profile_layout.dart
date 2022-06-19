// ignore_for_file: non_constant_identifier_names, prefer_const_literals_to_create_immutables, unnecessary_const, avoid_print, unnecessary_brace_in_string_interps, unnecessary_string_interpolations

import 'package:flutter/material.dart';
import 'package:whisper/layout/Timeline/sidemenu.dart';
import 'package:whisper/modules/tweetBoxWidget_Profile.dart';
import 'package:http/http.dart' as http;
import 'package:whisper/models/tweet_model_Profile.dart';
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
  late Future<String> profilePictureFuture;

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
      print("user profile picture");
      print(profilePicture);
      coverPicture = items['cover Picture'];
      profileDisplayName = items['displayName'];
      profileUsername = items['username'];
    }
    return profilePicture;
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

  final List<TweetModel> Tweets = [
    // TweetModel(
    //   username: "Kareem",
    //   tweet: "Lorem ipsum dolor sit amet",
    //   time: "7h",
    //   twitterHandle: "@Kareem1",
    // ),
    // TweetModel(
    //     username: "Ahmed",
    //     tweet: "Lorem ipsum dolor sit amet",
    //     time: "3m",
    //     twitterHandle: "@Ahmed28"),
    // TweetModel(
    //   username: "Kareem",
    //   tweet: "Lorem ipsum dolor sit amet",
    //   time: "7h",
    //   twitterHandle: "@Kareem1",
    // ),
    // TweetModel(
    //     username: "Ahmed",
    //     tweet: "Lorem ipsum dolor sit amet",
    //     time: "3m",
    //     twitterHandle: "@Ahmed28"),
    // TweetModel(
    //     username: "Hassan",
    //     tweet: "Lorem ipsum dolor sit amet",
    //     time: "3m",
    //     twitterHandle: "@Hassan212"),
  ];

  final List<TweetModel> TweetsAndReplies = [
    TweetModel(
      username: "Mario",
      tweet: "Lorem ipsum dolor sit amet",
      time: "7h",
      twitterHandle: "@Mario12",
    ),
    TweetModel(
        username: "Ahmed",
        tweet: "Lorem ipsum dolor sit amet",
        time: "3m",
        twitterHandle: "@Ahmed28"),
    TweetModel(
      username: "Kareem",
      tweet: "Lorem ipsum dolor sit amet",
      time: "7h",
      twitterHandle: "@Kareem1",
    ),
    TweetModel(
        username: "Mazen",
        tweet: "Lorem ipsum dolor sit amet",
        time: "3m",
        twitterHandle: "@Mazen13"),
    TweetModel(
        username: "Hassan",
        tweet: "Lorem ipsum dolor sit amet",
        time: "3m",
        twitterHandle: "@Hassan212"),
  ];

  final List<TweetModel> Media = [
    TweetModel(
      username: "Kareem",
      tweet: "Lorem ipsum dolor sit amet",
      time: "7h",
      twitterHandle: "@Kareem1",
    ),
    TweetModel(
        username: "Ahmed",
        tweet: "Lorem ipsum dolor sit amet",
        time: "3m",
        twitterHandle: "@Ahmed28"),
    TweetModel(
      username: "Kareem",
      tweet: "Lorem ipsum dolor sit amet",
      time: "7h",
      twitterHandle: "@Kareem1",
    ),
    TweetModel(
        username: "Ahmed",
        tweet: "Lorem ipsum dolor sit amet",
        time: "3m",
        twitterHandle: "@Ahmed28"),
    TweetModel(
        username: "Hassan",
        tweet: "Lorem ipsum dolor sit amet",
        time: "3m",
        twitterHandle: "@Hassan212"),
  ];

  final List<TweetModel> Likes = [
    TweetModel(
      username: "Mario",
      tweet: "Lorem ipsum dolor sit amet",
      time: "7h",
      twitterHandle: "@Mario12",
    ),
    TweetModel(
        username: "Ahmed",
        tweet: "Lorem ipsum dolor sit amet",
        time: "3m",
        twitterHandle: "@Ahmed28"),
    TweetModel(
      username: "Kareem",
      tweet: "Lorem ipsum dolor sit amet",
      time: "7h",
      twitterHandle: "@Kareem1",
    ),
    TweetModel(
        username: "Mazen",
        tweet: "Lorem ipsum dolor sit amet",
        time: "3m",
        twitterHandle: "@Mazen13"),
    TweetModel(
        username: "Hassan",
        tweet: "Lorem ipsum dolor sit amet",
        time: "3m",
        twitterHandle: "@Hassan212"),
  ];

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
    profilePictureFuture = getProfileInfo(widget.token);
  }

  @override
  Widget build(BuildContext context) {
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
                  isTitlePassed ? 'Username' : '',
                  style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
                leading: const Icon(Icons.arrow_back_rounded),
                actions: [
                  const Icon(
                    Icons.search_rounded,
                    size: 30,
                  ),
                  const Icon(
                    Icons.more_vert_rounded,
                    size: 30,
                  ),
                ],
                pinned: true,
                expandedHeight: 140,
                // flexibleSpace: FlexibleSpaceBar(
                //   background:
                //   Image.network(
                //     coverPicture.toString(),
                //     fit: BoxFit.cover,
                //   ),
                // ),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          SizedBox(
                            width: 70,
                            height: 70,
                            child: FutureBuilder<String>(
                                future: profilePictureFuture,
                                builder: ((context, snapshot) {
                                  print('lol');
                                  print(widget.token);
                                  print(profilePictureFuture);
                                  print(profilePicture);
                                  if (snapshot.hasData) {
                                    profilePicture = snapshot.data!;
                                    print('here is future');
                                    print(profilePicture);

                                    return Padding(
                                      padding: const EdgeInsets.all(9.0),
                                      child: CircleAvatar(
                                        backgroundImage: NetworkImage(
                                          profilePicture.toString(),
                                        ),
                                      ),
                                    );
                                  } else {
                                    print('didnt work');
                                    return const Center(
                                        child: CircularProgressIndicator(
                                      color: Colors.black,
                                      value: 0,
                                    ));
                                  }
                                })),
                          ),
                          ElevatedButton(
                              onPressed: () {},
                              style: ButtonStyle(
                                  shape: MaterialStateProperty.all<
                                          RoundedRectangleBorder>(
                                      RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(18.0),
                                          side: const BorderSide(
                                              color: Colors.black,
                                              width: 0.25))),
                                  backgroundColor:
                                      MaterialStateProperty.all(Colors.white),
                                  overlayColor:
                                      MaterialStateProperty.all(Colors.grey),
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
                      Text(
                        profileDisplayName,
                        style: const TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            color: Color.fromARGB(255, 0, 0, 0)),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 4),
                        child: Text(
                          '${profileUsername}',
                          style: const TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w400,
                            color: Color.fromARGB(255, 0, 0, 0),
                          ),
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.only(top: 10),
                        child: const Text(
                          'Bio inserted here!',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 10),
                        child: Row(children: [
                          const Expanded(
                              child: const Text.rich(
                            TextSpan(children: <InlineSpan>[
                              WidgetSpan(
                                  child: Icon(
                                Icons.location_on_outlined,
                                size: 20,
                              )),
                              TextSpan(text: ' Location')
                            ]),
                            style:
                                TextStyle(fontSize: 15, color: Colors.black45),
                          )),
                          const Expanded(
                              child: const Text.rich(
                            TextSpan(children: <InlineSpan>[
                              WidgetSpan(
                                  child: Icon(
                                Icons.circle_outlined,
                                size: 20,
                              )),
                              TextSpan(text: ' Birthday')
                            ]),
                            style:
                                TextStyle(fontSize: 15, color: Colors.black45),
                          )),
                        ]),
                      ),
                      const Padding(
                        padding: EdgeInsets.only(top: 10),
                        child: Text.rich(
                          const TextSpan(children: <InlineSpan>[
                            WidgetSpan(
                                child: Icon(
                              Icons.calendar_month_outlined,
                              size: 20,
                            )),
                            TextSpan(text: ' Join Date')
                          ]),
                          style: TextStyle(fontSize: 15, color: Colors.black45),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 16.0),
                        child: Row(
                          children: [
                            const Text(
                              '999',
                              style: TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.w700),
                            ),
                            InkWell(
                              onTap: () {},
                              child: const Text(
                                ' Following',
                                style: const TextStyle(
                                    fontSize: 16, color: Colors.black45),
                              ),
                              highlightColor: Colors.black26,
                            ),
                            const SizedBox(
                              width: 10,
                            ),
                            const Text(
                              '999',
                              style: TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.w700),
                            ),
                            InkWell(
                              onTap: () {},
                              child: const Text(
                                ' Followers',
                                style: const TextStyle(
                                    fontSize: 16, color: Colors.black45),
                              ),
                              highlightColor: Colors.black26,
                            ),
                          ],
                        ),
                      )
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
                    const Tab(text: 'Media'),
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
                    Visibility(
                      child: Padding(
                          child: tweetBoxWidget(Tweets, isLiked, like),
                          padding: const EdgeInsets.all(12)),
                      maintainState: true,
                      visible: selectedIndex == 0,
                    ),
                    Visibility(
                      child: Padding(
                          child:
                              tweetBoxWidget(TweetsAndReplies, isLiked, like),
                          padding: const EdgeInsets.all(12)),
                      maintainState: true,
                      visible: selectedIndex == 1,
                    ),
                    Visibility(
                      child: Padding(
                          child: tweetBoxWidget(Media, isLiked, like),
                          padding: const EdgeInsets.all(12)),
                      maintainState: true,
                      visible: selectedIndex == 2,
                    ),
                    Visibility(
                      child: Padding(
                          child: tweetBoxWidget(Likes, isLiked, like),
                          padding: const EdgeInsets.all(12)),
                      maintainState: true,
                      visible: selectedIndex == 3,
                    ),
                  ],
                  index: selectedIndex,
                ),
              ),
            ],
          ),
        ),
        drawer: SideMenu(token: widget.token, userId: widget.userId),
      ),
    );
  }
}
