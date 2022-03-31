import 'package:flutter/material.dart';

class TweetModel {
  late String tweet;
  late String username;
  late String time;
  late String twitterHandle;
  
  TweetModel({
    required this.username,
    required this.tweet,
    required this.time,
    required this.twitterHandle
    });
}