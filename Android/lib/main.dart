// ignore_for_file: unused_import

import 'package:flutter/material.dart';
import 'package:whisper/layout/Admin/GraphPie.dart';
import 'package:whisper/layout/WelcomePage/WelcomePage.dart';
import 'package:whisper/layout/UserProfile/profile_layout.dart';
import 'package:whisper/layout/Admin/AdminPage.dart';
import 'package:whisper/models/date_time_format.dart';
import 'layout/Timeline/Timeline.dart';
import 'package:dcdg/dcdg.dart';

void main() async {
  runApp(
    const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: WelcomePage(),
    ),
  );
}
