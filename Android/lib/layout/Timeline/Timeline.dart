// ignore_for_file: prefer_const_constructors, file_names, prefer_const_literals_to_create_immutables, non_constant_identifier_names, unnecessary_string_interpolations, must_be_immutable, avoid_print, unused_element

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:whisper/layout/Timeline/sidemenu.dart';
import 'package:whisper/modules/tweetBoxWidget.dart';

const TextStyle _textStyle = TextStyle(
  fontSize: 40,
  fontWeight: FontWeight.bold,
  letterSpacing: 2,
  fontStyle: FontStyle.italic,
);

class TimelinePage extends StatefulWidget {
  final String token;
  const TimelinePage({Key? key, required this.token}) : super(key: key);

  @override
  State<TimelinePage> createState() => _TimelinePageState();
}

class _TimelinePageState extends State<TimelinePage> {
  final scrollController = ScrollController();

  var scaffoldkey = GlobalKey<ScaffoldState>();

  bool scaffoldKey = false;

  @override
  Widget build(BuildContext context) {
    print('token is here');
    print(widget.token);
    var token = '';
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 75,
          elevation: 1,
          backgroundColor: Theme.of(context).appBarTheme.backgroundColor,
          // scaffoldkey.currentState?.openDrawer();
          leading: InkWell(
            child: Padding(
              padding: const EdgeInsets.all(10.0),
              child: CircleAvatar(
                backgroundImage: NetworkImage(
                    'https://previews.123rf.com/images/koblizeek/koblizeek2001/koblizeek200100050/138262629-usuario-miembro-de-perfil-de-icono-de-hombre-vector-de-s%C3%ADmbolo-perconal-sobre-fondo-blanco-aislado-.jpg'),
                radius: 16,
              ),
            ),
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
              iconSize: 55.0,
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
        body: SingleChildScrollView(
          controller: scrollController,
          child: TweetBoxWidgety(),
          //  Column(
          //       children:  Tweets.map((tweetaya) {
          //       return tweetBoxWidget(Tweets, true, () {}, 30);
          //     }).toList(),

          //           [

          //       ]),
        ),

        drawer: SideMenu(token: token),
        // bottomNavigationBar: MaterialYou(),
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.blue,
          onPressed: () {
            openAddTweetDialog();
          },
          child: const Icon(Icons.add),
        ),
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
      ),
    );
  }

  void scrollUp() {
    const double start = 0;
    scrollController.animateTo(start,
        duration: Duration(seconds: 1), curve: Curves.easeIn);
  }

  Future openAddTweetDialog() => showDialog(
        //context: context,
        builder: (context) => AlertDialog(
          title: Text(
            'Your comment',
          ),
          content: TextField(
            decoration: InputDecoration(
              hintText: "Enter your comment",
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {},
              child: Text('submit'),
            ),
          ],
        ),
        context: context,
      );
}
