// ignore_for_file: unused_element, unnecessary_string_interpolations, unnecessary_brace_in_string_interps
import 'package:flutter/material.dart';
import 'package:whisper/layout/Timeline/Timeline.dart';
import 'package:whisper/layout/UserProfile/profile_layout.dart';
import 'package:whisper/layout/WelcomePage/WelcomePage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SideMenu extends StatefulWidget {
  final String token;
  final String userId;
  const SideMenu({Key? key, required this.token, required this.userId})
      : super(key: key);

  @override
  State<SideMenu> createState() => _SideMenuState();
}

class _SideMenuState extends State<SideMenu> {
  late var profilePicture = '';
  late var profileDisplayName = '';
  late var profileUsername = '';
  late Future<String> profilePictureFuture;

  Future<String> getProfileInfo(token) async {
    var response = await http.get(
      Uri.parse(
        (
            //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/user/${widget.userId}/profile_settings'),
            'http://10.0.2.2:8080/user/${widget.userId}/profile_settings'),
      ),
      headers: {
        'x-auth-token': token,
      },
    );
    if (response.statusCode == 200) {
      var items = json.decode(response.body);
      profilePicture = items['Profile Picture'];
      profileDisplayName = items['displayName'];
      profileUsername = items['username'];
    }
    return profilePicture;
  }

  @override
  void initState() {
    super.initState();
    profilePictureFuture = getProfileInfo(widget.token);
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SizedBox(
        width: MediaQuery.of(context).size.width * 0.8,
        child: Drawer(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                DrawerHeader(
                  decoration: const BoxDecoration(
                      color: Color.fromARGB(255, 255, 255, 255)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      FutureBuilder<String>(
                          future: profilePictureFuture,
                          builder: ((context, snapshot) {
                            if (snapshot.hasData) {
                              profilePicture = snapshot.data!;
                              return Column(
                                children: <Widget>[
                                  Row(
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.only(
                                            left: 5, top: 0),
                                        child: SizedBox(
                                          width: 70,
                                          height: 60,
                                          child: CircleAvatar(
                                            backgroundImage: NetworkImage(
                                              profilePicture.toString(),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  Row(
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.only(
                                            left: 5, top: 5),
                                        child: Text(
                                          '${profileDisplayName}',
                                          style: const TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.w800,
                                            color: Colors.black,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  Row(
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.only(
                                            left: 5, top: 5),
                                        child: Text(
                                          '$profileUsername',
                                          style: const TextStyle(
                                            color: Colors.grey,
                                            fontSize: 15,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  Padding(
                                    padding:
                                        const EdgeInsets.only(left: 5, top: 10),
                                    child: Row(
                                      children: const [
                                        Text(
                                          '2 ',
                                          style: TextStyle(
                                              fontWeight: FontWeight.bold),
                                        ),
                                        Text(
                                          'Following',
                                          style: TextStyle(color: Colors.grey),
                                        ),
                                        SizedBox(
                                          width: 15,
                                        ),
                                        Text(
                                          '1 ',
                                          style: TextStyle(
                                              fontWeight: FontWeight.bold),
                                        ),
                                        Text(
                                          'Followers',
                                          style: TextStyle(color: Colors.grey),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              );
                            } else {
                              return const Center(
                                  child: CircularProgressIndicator(
                                color: Colors.white,
                              ));
                            }
                          })),
                      // Padding(
                      //   padding: const EdgeInsets.only(left: 5, top: 10),
                      //   child: Row(
                      //     children: const [
                      //       Text(
                      //         '2 ',
                      //         style: TextStyle(fontWeight: FontWeight.bold),
                      //       ),
                      //       Text(
                      //         'Following',
                      //         style: TextStyle(color: Colors.grey),
                      //       ),
                      //       SizedBox(
                      //         width: 15,
                      //       ),
                      //       Text(
                      //         '1 ',
                      //         style: TextStyle(fontWeight: FontWeight.bold),
                      //       ),
                      //       Text(
                      //         'Followers',
                      //         style: TextStyle(color: Colors.grey),
                      //       ),
                      //     ],
                      //   ),
                      // ),
                    ],
                  ),
                ),
                ListTile(
                    leading: const Icon(Icons.home),
                    title: const Text('Home'),
                    onTap: () {
                      Navigator.of(context).pushAndRemoveUntil(
                          MaterialPageRoute(
                              builder: (BuildContext context) => TimelinePage(
                                    token: widget.token,
                                    userId: widget.userId,
                                  )),
                          (Route<dynamic> route) => false);
                    }),
                ListTile(
                    leading: const Icon(Icons.person),
                    title: const Text('Profile'),
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => ProfilePage(
                                  token: widget.token, userId: widget.userId)));
                    }),
                // ListTile(
                //   leading: const Icon(Icons.list_alt),
                //   title: const Text('Lists'),
                //   onTap: () {},
                // ),
                // ListTile(
                //   leading: const Icon(Icons.message),
                //   title: const Text('Topics'),
                //   onTap: () {},
                // ),
                ListTile(
                  leading: const Icon(Icons.bookmark_border),
                  title: const Text('Bookmarks'),
                  onTap: () {},
                ),
                // ListTile(
                //   leading: const Icon(Icons.bolt),
                //   title: const Text('Moments'),
                //   onTap: () {},
                // ),
                // ListTile(
                //   leading: const Icon(Icons.money_outlined),
                //   title: const Text('Monetization'),
                //   onTap: () {},
                // ),
                // const Divider(
                //   height: 2,
                // ),
                // ListTile(
                //   leading: const Icon(Icons.rocket_launch_outlined),
                //   title: const Text('Twitter for Professionals'),
                //   onTap: () {},
                // ),
                // const Divider(
                //   height: 2,
                // ),
                const ListTile(
                  leading: Icon(Icons.settings),
                  title: Text('Settings'),
                  // onTap: () => Navigator.push(context,
                  //     MaterialPageRoute(builder: (context) => SettingsPage())),
                ),
                // ListTile(
                //   leading: const Icon(Icons.help_outline_outlined),
                //   title: const Text('Help Center'),
                //   onTap: () {},
                // ),
                // const Divider(
                //   height: 2,
                // ),
                ListTile(
                  leading: const Icon(Icons.exit_to_app),
                  title: const Text('Logout'),
                  onTap: () {
                    Navigator.of(context).pushAndRemoveUntil(
                        MaterialPageRoute(
                            builder: (BuildContext context) =>
                                const WelcomePage()),
                        (Route<dynamic> route) => false);
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
