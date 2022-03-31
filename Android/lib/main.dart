import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';
import 'package:whisper/layout/Timeline.dart';
import 'package:whisper/layout/home_page.dart';
import 'package:whisper/shared/bloc_observer.dart';

import 'layout/profile_layout.dart';

void main() {
  BlocOverrides.runZoned(
        () {
      // Use cubits...
    },
    blocObserver: MyBlocObserver(),
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      home: ProfilePage(),
    );
  }
}
