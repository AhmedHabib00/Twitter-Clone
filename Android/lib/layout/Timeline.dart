// ignore_for_file: prefer_const_constructors, file_names, prefer_const_literals_to_create_immutables, non_constant_identifier_names, unnecessary_string_interpolations, must_be_immutable

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'API/Tweet.dart';


class Home extends StatelessWidget {
   Home({Key? key}) : super(key: key);


  final List<Tweet> Tweeets = [
    Tweet(" Kareem", "Lorem ipsum dolor sit amet", "7h", "@Kareem1"),
    Tweet(" Ahmed", "Lorem ipsum dolor sit amet", "3m", "@Ahmed28"),
    Tweet(" Kareem", "Lorem ipsum dolor sit amet", "8m", "@Kareem1"),
    Tweet(" Hassan", "Lorem ipsum dolor sit amet", "1h", "@Hassan3"),
    Tweet(" Ahmed", "Lorem ipsum dolor sit amet", "3m", "@Ahmed28"),


  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false ,
      home: Scaffold(
        body: Column(
          children:
           [
             
          Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            CircleAvatar(backgroundImage: NetworkImage('https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'), radius: 26,),
            IconButton(
              onPressed: (){}, 
              icon: FaIcon(FontAwesomeIcons.twitter),
              iconSize: 30.0,
              color: Colors.blue,
              ),
            IconButton(onPressed: (){}, icon: FaIcon(FontAwesomeIcons.star),iconSize: 30.0,),

        ]),

          Container(
            padding: EdgeInsets.all(0),
            color: Colors.white,
            child: Column(children: [
              ...Tweeets.map((val){
                return Container(
                  //decoration: BoxDecoration(border: Border.all(color: Color.fromARGB(255, 0, 0, 0),width: 0)),
                  padding: EdgeInsets.all(7),
                  child: Column(
                    children: [
                      Container(
                        padding: EdgeInsets.only(bottom: 7),
                        child: Row(
                          mainAxisAlignment : MainAxisAlignment.start,
                          children: [
                          CircleAvatar(backgroundImage: NetworkImage('https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'), radius: 23,),
                          Text("${val.username} ", style: TextStyle(fontWeight: FontWeight.bold,fontSize: 20),),
                          Text("${val.twitterHandle} . ", style: TextStyle(fontSize: 20),),
                          Text("${val.time}", style: TextStyle(fontSize: 18),),
                        ],),
                      ),
                      Row(
                        mainAxisAlignment : MainAxisAlignment.start, 
                        children: [
                          Text(val.tweet, style: TextStyle(fontSize: 18),),
                        ],
                      ),
                      Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [ 
                           Container(margin: EdgeInsets.all(8),child: Text.rich(TextSpan(children:[WidgetSpan(child:FaIcon(FontAwesomeIcons.comment,size: 17,) ),TextSpan(text: "  55")]))),
                           Container(child: Text.rich(TextSpan(children: [WidgetSpan(child:FaIcon(FontAwesomeIcons.retweet,size: 17,) ),TextSpan(text: "  20",)]))),
                          Container(child: Text.rich(TextSpan(children: [WidgetSpan(child:FaIcon(FontAwesomeIcons.heart,size: 17,)),TextSpan(text: "  724")])))
        ])     
                    ],
                  ),
                );
              }).toList(),
            ]),
          ),
        ]),
        
        
        
        bottomNavigationBar: BottomNavigationBar(
          showSelectedLabels: false,
          showUnselectedLabels: false,
    items: [
      BottomNavigationBarItem(
        icon: FaIcon(FontAwesomeIcons.home),
        label:'News Feed',
        backgroundColor: Colors.black

      ),
      BottomNavigationBarItem(
        icon: FaIcon(FontAwesomeIcons.search),
        label:'Search',
        backgroundColor: Colors.black
      ),
      BottomNavigationBarItem(
        icon: FaIcon(FontAwesomeIcons.microphone),
        label: 'Spaces',
        backgroundColor: Colors.black
      ),
      BottomNavigationBarItem(
        icon: FaIcon(FontAwesomeIcons.bell),
        label: 'Notifications',
        backgroundColor: Colors.black
      ),    
      BottomNavigationBarItem(
        icon: FaIcon(FontAwesomeIcons.envelope),
        label: 'Inbox',
        backgroundColor: Colors.black
      ),       
    ],
      ),
    floatingActionButton: FloatingActionButton(
      onPressed: () {},
      child: const Icon(Icons.add),
    )
      
    ));
  } 
}
