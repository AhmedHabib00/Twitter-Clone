// ignore_for_file: file_names

import 'package:google_sign_in/google_sign_in.dart';

class GoogleSignInApi {
  static final GoogleSignIn _googleSignIn = GoogleSignIn(
    clientId:
        '508981250586-5vrqquhhgimntmj4rosvpfq0npcbmdrb.apps.googleusercontent.com',
    scopes: <String>[
      'email',
      //'https://www.googleapis.com/auth/contacts.readonly',
    ],
  );
  static Future<GoogleSignInAccount?> login() => _googleSignIn.signIn();
}

// to get Sh1 in terminal or cmd
// keytool -list -v -keystore c:/Users/ET/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
