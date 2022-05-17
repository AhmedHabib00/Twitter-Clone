import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

//import '../../screens/Settings/settingspage.dart';
//import '../../screens/home/Timeline.dart';
import 'package:whisper/layout/Timeline/Timeline.dart';
import 'package:whisper/layout/UserProfile/profile_layout.dart';
import 'package:whisper/layout/WelcomePage/WelcomePage.dart';

GoogleSignIn _googleSignIn = GoogleSignIn(
  clientId:
      '508981250586-5vrqquhhgimntmj4rosvpfq0npcbmdrb.apps.googleusercontent.com', //web
  //'http://508981250586-ba6eepc9h6b4kgbe26s61uql25ppdlf3.apps.googleusercontent.com/', //android
);

class SideMenu extends StatefulWidget {
  final String token;

  const SideMenu({Key? key, required this.token}) : super(key: key);

  @override
  State<SideMenu> createState() => _SideMenuState();
}

class _SideMenuState extends State<SideMenu> {
  GoogleSignInAccount? _currentUser;
  final String _contactText = '';
  late String? GoogleTokenId = '';

  @override
  void initState() {
    super.initState();
    _googleSignIn.onCurrentUserChanged.listen((GoogleSignInAccount? account) {
      setState(() {
        _currentUser = account;
      });
    });
    _googleSignIn.signInSilently();
  }

  @override
  Widget build(BuildContext context) {
    var token = '';
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
                  child: Padding(
                    padding: const EdgeInsets.all(0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        const SizedBox(
                          width: 70,
                          height: 70,
                          child: CircleAvatar(
                            backgroundImage: NetworkImage(
                                'https://previews.123rf.com/images/koblizeek/koblizeek2001/koblizeek200100050/138262629-usuario-miembro-de-perfil-de-icono-de-hombre-vector-de-s%C3%ADmbolo-perconal-sobre-fondo-blanco-aislado-.jpg'),
                          ),
                        ),
                        const SizedBox(
                          height: 0,
                        ),
                        const Text(
                          'Eizaldin Tarik',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w800,
                            color: Colors.black,
                          ),
                        ),
                        const SizedBox(
                          height: 1,
                        ),
                        const Text(
                          '@EizaldinT',
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
                  onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => TimelinePage(token: token))),
                ),
                ListTile(
                  leading: const Icon(Icons.person),
                  title: const Text('Profile'),
                  onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => ProfilePage(token: token))),
                ),
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
                    Future<void> _handleSignOut() => _googleSignIn.disconnect();

                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (BuildContext context) => const WelcomePage(),
                      ),
                    );
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
