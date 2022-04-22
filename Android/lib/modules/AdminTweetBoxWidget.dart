// ignore_for_file: prefer_const_constructors, non_constant_identifier_names, avoid_unnecessary_containers, prefer_const_literals_to_create_immutables, file_names

import 'package:flutter/material.dart';

Widget AdminTweetBoxWidget(Tweets, isLiked, function) => Container(
    padding: EdgeInsets.all(0),
    color: Colors.white,
    child: Column(children: [
      ...Tweets.map((val) {
        return Container(
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
                      "${val.twitterHandle}  ",
                      /* . ? */
                      style: TextStyle(fontSize: 18),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }).toList(),
    ]));
