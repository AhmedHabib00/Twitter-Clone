// ignore_for_file: prefer_const_constructors, file_names, prefer_const_literals_to_create_immutables, non_constant_identifier_names, unnecessary_string_interpolations, must_be_immutable

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:whisper/models/tweet_model.dart';
import 'package:whisper/modules/tweetBoxWidget.dart';

class TimelinePage extends StatelessWidget {
  TimelinePage({Key? key}) : super(key: key);

  final List<TweetModel> Tweets = [
    TweetModel(
      username: " Kareem",
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
      username: " Kareem",
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

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
            appBar: AppBar(
              toolbarHeight: 0,
            ),
            body: Column(children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: CircleAvatar(
                    backgroundImage: NetworkImage(
                        'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'),
                    radius: 16,
                  ),
                ),
                IconButton(
                  onPressed: () {},
                  icon: FaIcon(FontAwesomeIcons.twitter),
                  iconSize: 20.0,
                  color: Colors.blue,
                ),
                IconButton(
                  onPressed: () {},
                  icon: FaIcon(FontAwesomeIcons.star),
                  iconSize: 20.0,
                ),
              ]),
              tweetBoxWidget(Tweets, false, () {})
            ]),
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
                    backgroundColor: Colors.black),
              ],
            ),
            floatingActionButton: FloatingActionButton(
              onPressed: () {},
              child: const Icon(Icons.add),
            )));
  }
}
