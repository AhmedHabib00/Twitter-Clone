// ignore_for_file: file_names, avoid_unnecessary_containers, non_constant_identifier_names

import 'package:flutter/material.dart';

class AdminPage extends StatelessWidget {
  const AdminPage({Key? key}) : super(key: key);
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
              padding: const EdgeInsets.all(5.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    icon,
                  ),
                  Text(
                    name,
                  ),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.only(top: 50, left: 60),
              child: Row(
                children: [
                  Text(
                    count.toString(),
                    style: const TextStyle(
                        fontSize: 50, fontWeight: FontWeight.bold),
                  ),
                  Text(text2, style: const TextStyle(fontSize: 30)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

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
        body: Container(
          child: TabBarView(
            children: [
              Container(
                padding: const EdgeInsets.all(8.0),
                child: GridView.count(
                  crossAxisCount: 2,
                  children: [
                    _AdminCard(
                      context: context,
                      count: 20,
                      icon: Icons.person,
                      name: "User Count",
                      text2: "",
                    ),
                    _AdminCard(
                      context: context,
                      count: 5,
                      icon: Icons.block,
                      name: "Users Blocked",
                      text2: "",
                    ),
                    _AdminCard(
                      context: context,
                      count: 37,
                      text2: "%",
                      icon: Icons.percent_sharp,
                      name: "Tweets Increase\n Decrease ratio",
                    ),
                  ],
                ),
              ),
              Container(
                child: const Center(
                  child: Text("Users"),
                ),
              ),
              Container(
                child: const Center(
                  child: Text("Blocked users"),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
