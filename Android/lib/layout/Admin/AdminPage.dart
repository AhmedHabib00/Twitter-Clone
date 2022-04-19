// ignore_for_file: file_names, avoid_unnecessary_containers, non_constant_identifier_names, unnecessary_new

//import 'package:whisper/layout/DataBase/task.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter/material.dart';
//import 'package:whisper/layout/Admin/GraphPie.dart';

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

class _AdminPage extends State<AdminPage> {
  late List<charts.Series<Task, String>> _seriesPieData;
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
              //padding: const EdgeInsets.all(2.0),
              //child: Row(
              //children: [
              //Padding(
              //padding: const EdgeInsets.symmetric(horizontal: 20),
              child: // Container(
                  GridView.count(
                crossAxisCount: 1,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 100, vertical: 100),
                    child: _AdminCard(
                      context: context,
                      count: 20,
                      icon: Icons.person,
                      name: "User Count",
                      text2: "",
                    ),
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
                    count: 100,
                    text2: "%",
                    icon: Icons.percent_sharp,
                    name: " Tweets Increase\n Decreased ratio",
                  ),
                  charts.PieChart<String>(
                    _seriesPieData,
                    animate: true,
                    animationDuration: const Duration(seconds: 3),
                    behaviors: [
                      charts.DatumLegend(
                        outsideJustification:
                            charts.OutsideJustification.endDrawArea,
                        horizontalFirst: false,
                        desiredMaxRows: 2,
                        cellPadding:
                            const EdgeInsets.only(right: 4.0, bottom: 4.0),
                        entryTextStyle: charts.TextStyleSpec(
                          color: charts.MaterialPalette.purple.shadeDefault,
                          fontFamily: 'Georgia',
                          fontSize: 11,
                        ),
                      ),
                    ],
                    defaultRenderer: new charts.ArcRendererConfig(
                      arcWidth: 100,
                      arcRendererDecorators: [
                        new charts.ArcLabelDecorator(
                            labelPosition: charts.ArcLabelPosition.inside),
                      ],
                    ),
                  ),
                  // ),
                ],
              ),
              // Expanded(
              //         child: charts.PieChart<String>(
              //           _seriesPieData,
              //           animate: true,
              //           animationDuration: const Duration(seconds: 3),
              //           behaviors: [
              //             charts.DatumLegend(
              //               outsideJustification:
              //                   charts.OutsideJustification.endDrawArea,
              //               horizontalFirst: false,
              //               desiredMaxRows: 2,
              //               cellPadding: const EdgeInsets.only(
              //                   right: 4.0, bottom: 4.0),
              //               entryTextStyle: charts.TextStyleSpec(
              //                 color: charts
              //                     .MaterialPalette.purple.shadeDefault,
              //                 fontFamily: 'Georgia',
              //                 fontSize: 11,
              //               ),
              //             ),
              //           ],
              //           defaultRenderer: new charts.ArcRendererConfig(
              //             arcWidth: 100,
              //             arcRendererDecorators: [
              //               new charts.ArcLabelDecorator(
              //                   labelPosition:
              //                       charts.ArcLabelPosition.inside),
              //             ],
              //           ),
              //         ),
              //       ),
              //),
              //),
              //],
              //),
            ),
            Container(
              child: const Center(
                child: Text("Users lool"),
              ),
            ),
            Container(
              child: const Center(
                child: Text("Blocked Users lool"),
              ),
            ),
          ],
          //),
        ),
        // body: Container(
        //   child: TabBarView(children: <Widget>[
        //     Container(
        //       child: Center(

        //         child: Container(
        //           child: Padding(
        //             padding: const EdgeInsets.all(100.0),
        //             child: charts.PieChart<String>(
        //               _seriesPieData,
        //               animate: true,
        //               animationDuration: const Duration(seconds: 3),
        //               behaviors: [
        //                 charts.DatumLegend(
        //                   outsideJustification:
        //                       charts.OutsideJustification.endDrawArea,
        //                   horizontalFirst: false,
        //                   desiredMaxRows: 2,
        //                   cellPadding:
        //                       const EdgeInsets.only(right: 4.0, bottom: 4.0),
        //                   entryTextStyle: charts.TextStyleSpec(
        //                     color: charts.MaterialPalette.purple.shadeDefault,
        //                     fontFamily: 'Georgia',
        //                     fontSize: 11,
        //                   ),
        //                 ),
        //               ],
        //               defaultRenderer: new charts.ArcRendererConfig(
        //                 arcWidth: 100,
        //                 arcRendererDecorators: [
        //                   new charts.ArcLabelDecorator(
        //                       labelPosition: charts.ArcLabelPosition.inside),
        //                 ],
        //               ),
        //             ),
        //           ),
        //         ),
        //       ),
        //     ),
        // Container(
        //   child: const Center(
        //     child: Text("Users"),
        //   ),
        // ),
        // Container(
        //   child: const Center(
        //     child: Text("Blocked Users"),
        //   ),
        // )
        //]),
        //),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    _seriesPieData = <charts.Series<Task, String>>[];
    _generateData();
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
              padding: const EdgeInsets.all(5),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    icon,
                    size: 20,
                  ),
                  Text(
                    name,
                    style: const TextStyle(
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.only(top: 20, left: 20),
              child: Row(
                children: [
                  Text(
                    count.toString(),
                    style: const TextStyle(
                        fontSize: 40, fontWeight: FontWeight.bold),
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

  _generateData() {
    var pieData = [
      Task('work', 35.8, Colors.purple),
      Task('play', 35, Colors.green),
      Task('Tv', 15.2, Colors.blue),
      Task('sing', 15, Colors.red),
    ];
    _seriesPieData.add(
      charts.Series(
          data: pieData,
          domainFn: (Task task, _) => task.task,
          measureFn: (Task task, _) => task.taskvalue,
          colorFn: (Task task, _) =>
              charts.ColorUtil.fromDartColor(task.colorval),
          id: 'Daily Task',
          labelAccessorFn: (Task row, _) => '${row.taskvalue}'),
    );
  }
}
