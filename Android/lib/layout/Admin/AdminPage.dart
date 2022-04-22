// ignore_for_file: file_names, avoid_unnecessary_containers, non_constant_identifier_names, unnecessary_new

import 'package:flutter/material.dart';
import 'package:whisper/layout/Admin/GraphBar.dart';
import 'package:whisper/layout/Admin/GraphPie.dart';
import 'package:whisper/modules/AdminTweetBoxWidget.dart';
import 'package:whisper/models/tweet_model.dart';

class AdminPage extends StatefulWidget {
  const AdminPage({Key? key}) : super(key: key);
  @override
  _AdminPage createState() => _AdminPage();
}

class Task {
  String task;
  double taskvalue;
  Color colorval;
  //Color colorval;

  Task(this.task, this.taskvalue, this.colorval);
}

final List<AdminTweetModel> Tweets = [
  AdminTweetModel(
    username: " Kareem",
    //tweet: "Lorem ipsum dolor sit amet",
    //time: "7h",
    twitterHandle: "@Kareem1",
  ),
  AdminTweetModel(
      username: "Ahmed",
      //tweet: "Lorem ipsum dolor sit amet",
      //time: "3m",
      twitterHandle: "@Ahmed28"),
  AdminTweetModel(
    username: " Kareem",
    //tweet: "Lorem ipsum dolor sit amet",
    //time: "7h",
    twitterHandle: "@Kareem1",
  ),
  AdminTweetModel(
      username: "Ahmed",
      //tweet: "Lorem ipsum dolor sit amet",
      //time: "3m",
      twitterHandle: "@Ahmed28"),
  AdminTweetModel(
      username: "Hassan",
      //tweet: "Lorem ipsum dolor sit amet",
      //time: "3m",
      twitterHandle: "@Hassan212"),
];

class _AdminPage extends State<AdminPage> {
  //late List<charts.Series<Task, String>> _seriesPieData;
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          bottom: const TabBar(
            tabs: [
              Text(
                "Dashboard",
                style: TextStyle(
                  color: Color.fromARGB(255, 255, 255, 255),
                  fontSize: 16,
                ),
              ),
              Text(
                "Users",
                style: TextStyle(
                  color: Color.fromARGB(255, 255, 255, 255),
                  fontSize: 16,
                ),
              ),
              Text(
                "Blocked Users",
                style: TextStyle(
                  color: Color.fromARGB(255, 255, 255, 255),
                  fontSize: 16,
                ),
              ),
            ],
          ),
          title: const Text(
            "Admin Home",
            style: TextStyle(
              fontSize: 25,
            ),
          ),
          centerTitle: true,
        ),
        body: TabBarView(
          children: [
            Container(
              child: GridView.count(
                crossAxisSpacing: 0,
                mainAxisSpacing: 0,
                crossAxisCount: 1,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(
                        left: 50, right: 50, top: 0, bottom: 50),
                    child: _AdminCard(
                      context: context,
                      count: 20,
                      icon: Icons.person,
                      name: " User Count",
                      text2: "",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(
                        left: 50, right: 50, top: 0, bottom: 50),
                    child: _AdminCard(
                      context: context,
                      count: 5,
                      icon: Icons.block,
                      name: " Users Blocked",
                      text2: "",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(
                        left: 50, right: 50, top: 0, bottom: 50),
                    child: _AdminCard(
                      context: context,
                      count: 100,
                      text2: "%",
                      icon: Icons.percent_sharp,
                      name: " Tweets Increase\n Decreased ratio",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(
                        left: 50, right: 50, top: 0, bottom: 50),
                    child: Container(
                        child: Column(
                      children: <Widget>[
                        Text(
                          "Twitter accounts age range",
                          style: TextStyle(
                            fontSize: 25,
                            color: Colors.grey[700],
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 25),
                        const Expanded(child: GraphPie())
                      ],
                    )),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(
                        left: 50, right: 50, bottom: 100, top: 0),
                    child: Container(
                        child: Column(
                      children: <Widget>[
                        Text(
                          "Most followed",
                          style: TextStyle(
                            fontSize: 25,
                            color: Colors.grey[700],
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 25),
                        const Expanded(child: GraphBar())
                      ],
                    )),
                  ),
                ],
              ),
            ),
            SingleChildScrollView(
              child: Container(
                // child: const Center(
                //   child: Text("Users "),
                // ),
                child: AdminTweetBoxWidget(Tweets, false, () {}),
              ),
            ),
            SingleChildScrollView(
              child: Container(
                // child: const Center(
                //   child: Text("Users "),
                // ),
                child: AdminTweetBoxWidget(Tweets, false, () {}),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _AdminCard(
      {required IconData icon,
      required int count,
      required String text2,
      required String name,
      required BuildContext context}) {
    return Card(
      child: Container(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(
                  left: 12, right: 12, top: 25, bottom: 25),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    icon,
                    size: 50,
                    color: Colors.blue,
                  ),
                  Text(
                    name,
                    style: const TextStyle(
                        fontSize: 25,
                        color: Colors.black,
                        fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            Container(
              child: Padding(
                padding: const EdgeInsets.only(
                    left: 50, right: 0, top: 50, bottom: 25),
                child: Row(
                  children: [
                    Text(
                      count.toString(),
                      style: const TextStyle(
                          fontSize: 100, fontWeight: FontWeight.bold),
                    ),
                    Text(text2, style: const TextStyle(fontSize: 35)),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
