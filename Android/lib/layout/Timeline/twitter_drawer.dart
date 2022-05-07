// ignore_for_file: unnecessary_import, sized_box_for_whitespace, unnecessary_const

import 'dart:ui';

import 'package:flutter/material.dart';

class TwitterDrawer extends StatelessWidget {
  const TwitterDrawer({
    Key? key,
    required this.onTap,
  }) : super(key: key);

  final Function onTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.8,
      child: Drawer(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DrawerHeader(
                // decoration: BoxDecoration(color: Colors.green),
                child: Padding(
                  padding: const EdgeInsets.all(0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Container(
                        width: 70,
                        height: 70,
                        child: const CircleAvatar(
                          backgroundImage: NetworkImage(
                              'https://previews.123rf.com/images/koblizeek/koblizeek2001/koblizeek200100050/138262629-usuario-miembro-de-perfil-de-icono-de-hombre-vector-de-s%C3%ADmbolo-perconal-sobre-fondo-blanco-aislado-.jpg'),
                        ),
                      ),
                      const SizedBox(
                        height: 0,
                      ),
                      const Text(
                        'Mr.Ahmed hassan',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(
                        height: 1,
                      ),
                      const Text(
                        '@ammarhunter0',
                        style: TextStyle(
                          color: Colors.grey,
                          fontSize: 15,
                        ),
                      ),
                      const SizedBox(
                        height: 7,
                      ),
                      Row(
                        children: const [
                          Text(
                            '31 ',
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                          Text(
                            'Following',
                            style: TextStyle(color: Colors.grey),
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          Text(
                            '2 ',
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                          Text(
                            'Followers',
                            style: TextStyle(color: Colors.grey),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              ListTile(
                leading: const Icon(Icons.home),
                title: const Text('Home'),
                onTap: () => onTap(context, 0),
              ),
              ListTile(
                leading: const Icon(Icons.person),
                title: const Text('Profile'),
                onTap: () => onTap(context, 0),
              ),
              ListTile(
                leading: const Icon(Icons.list_alt),
                title: const Text('Lists'),
                onTap: () => onTap(context, 0),
              ),
              ListTile(
                leading: const Icon(Icons.message),
                title: const Text('Topics'),
                onTap: () => onTap(context, 0),
              ),
              ListTile(
                leading: const Icon(Icons.bookmark_border),
                title: const Text('Bookmarks'),
                onTap: () => onTap(context, 0),
              ),
              ListTile(
                leading: const Icon(Icons.bolt),
                title: const Text('Moments'),
                onTap: () => onTap(context, 0),
              ),
              ListTile(
                leading: const Icon(Icons.money_outlined),
                title: const Text('Monetization'),
                onTap: () => onTap(context, 0),
              ),
              const Divider(
                height: 2,
              ),
              ListTile(
                leading: const Icon(Icons.rocket_launch_outlined),
                title: const Text('Twitter for Professionals'),
                onTap: () => onTap(context, 0),
              ),
              const Divider(
                height: 2,
              ),
              ListTile(
                leading: const Icon(Icons.settings),
                title: const Text('Settings and Pirvacy'),
                onTap: () => onTap(context, 0),
              ),
              ListTile(
                leading: const Icon(Icons.help_outline_outlined),
                title: const Text('Help Center'),
                onTap: () => onTap(context, 0),
              ),
              const Divider(
                height: 2,
              ),
              ListTile(
                leading: const Icon(Icons.exit_to_app),
                title: const Text('Logout'),
                onTap: () => onTap(context, 0),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
