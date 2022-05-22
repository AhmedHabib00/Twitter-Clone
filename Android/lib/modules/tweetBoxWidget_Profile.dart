// ignore_for_file: prefer_const_constructors, non_constant_identifier_names, avoid_unnecessary_containers, prefer_const_literals_to_create_immutables, file_names

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

Widget tweetBoxWidget(Tweets, isLiked, function) => Container(
    padding: EdgeInsets.all(0),
    color: Colors.white,
    child: Column(children: [
      ...Tweets.map((val) {
        return Container(
//decoration: BoxDecoration(border: Border.all(color: Color.fromARGB(255, 0, 0, 0),width: 0)),
          padding: EdgeInsets.all(7),
          child: Column(
            children: [
              Container(
                padding: EdgeInsets.only(bottom: 7),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    CircleAvatar(
                      backgroundImage: NetworkImage(
                          'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'),
                      radius: 20,
                    ),
                    SizedBox(
                      width: 5,
                    ),
                    Text(
                      "${val.username} ",
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                    ),
                    Text(
                      "${val.twitterHandle} . ",
                      style: TextStyle(fontSize: 18),
                    ),
                    Text(
                      "${val.time}",
                      style: TextStyle(fontSize: 17),
                    ),
                  ],
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    val.tweet,
                    style: TextStyle(fontSize: 18),
                  ),
                ],
              ),
              Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
                Container(
                    margin: EdgeInsets.all(8),
                    child: Text.rich(TextSpan(children: [
                      WidgetSpan(
                          child: FaIcon(
                        FontAwesomeIcons.comment,
                        size: 17,
                      )),
                      TextSpan(text: "  55")
                    ]))),
                Container(
                    child: Text.rich(TextSpan(children: [
                  WidgetSpan(
                      child: FaIcon(
                    FontAwesomeIcons.retweet,
                    size: 17,
                  )),
                  TextSpan(
                    text: "  20",
                  )
                ]))),
                InkWell(
                  child: Text.rich(TextSpan(children: [
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
                              )),
                    TextSpan(text: "  724")
                  ])),
                  onTap: function,
                )
              ])
            ],
          ),
        );
      }).toList(),
    ]));
