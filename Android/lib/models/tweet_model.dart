// ignore: unused_import
import 'package:flutter/material.dart';

class TweetModel {
  bool isLiked = false;
  late String tweet;
  late String username;
  late String time;
  late String twitterHandle;

  TweetModel(
      {required this.username,
      required this.tweet,
      required this.time,
      required this.twitterHandle});

  void setLike(val) {
    isLiked = val;
  }

  bool getLike(val) {
    return isLiked;
  }
}
