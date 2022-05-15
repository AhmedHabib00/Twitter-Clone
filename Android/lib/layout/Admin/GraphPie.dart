// ignore_for_file: file_names, avoid_unnecessary_containers, unnecessary_new, prefer_typing_uninitialized_variables, non_constant_identifier_names, unused_element

import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:http/http.dart' as http;
import 'dart:convert';

class GraphPie extends StatefulWidget {
  final String token;
  const GraphPie({Key? key, required this.token}) : super(key: key);
  @override
  _GraphPie createState() => _GraphPie();
}

class _GraphPie extends State<GraphPie> {
  late List<charts.Series<TaskPie, String>> _seriesPieData;
  late Future<int> GraphPieFuture;
  late int count1 = 5;
  late String name1 = '';
  late int count2 = 10;
  late String name2 = '';
  late int count3 = 1;
  late String name3 = '';
  late int count4 = 15;
  late String name4 = '';
  late int count5 = 12;
  late String name5 = '';
  late int count6 = 12;
  late String name6 = '';
  late int count7 = 12;
  late String name7 = '';

  Future<int> GraphPieApi(token) async {
    http.Response response;
    response = await http.get(
      Uri.parse('http://10.0.2.2:8080/admins/statistics/noAgeUsers'
          //   //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/admins/statistics/noUsers'),
          ),
      headers: {'x-auth-token': token},
    );
    setState(() {
      var mapResponse = json.decode(response.body)['noAgeUsers'];
      count1 = mapResponse['stats'][0]['count'];
      name1 = mapResponse['stats'][0]['name'];
      count2 = mapResponse['stats'][1]['count'];
      name2 = mapResponse['stats'][1]['name'];
      count3 = mapResponse['stats'][2]['count'];
      name3 = mapResponse['stats'][2]['name'];
      count4 = mapResponse['stats'][3]['count'];
      name4 = mapResponse['stats'][3]['name'];
      count5 = mapResponse['stats'][4]['count'];
      name5 = mapResponse['stats'][4]['name'];
      count6 = mapResponse['stats'][5]['count'];
      name6 = mapResponse['stats'][5]['name'];
      count7 = mapResponse['stats'][6]['count'];
      name7 = mapResponse['stats'][6]['name'];
    });
    return count1;
  }

  @override
  void initState() {
    super.initState();
    _seriesPieData = <charts.Series<TaskPie, String>>[];
    GraphPieFuture = GraphPieApi(widget.token);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<int?>(
          future: GraphPieFuture,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              count1 = snapshot.data!;
              _generateData();
              return charts.PieChart<String>(
                _seriesPieData,
                animate: true,
                animationDuration: const Duration(seconds: 3),
                behaviors: [
                  charts.DatumLegend(
                    outsideJustification:
                        charts.OutsideJustification.endDrawArea,
                    horizontalFirst: false,
                    desiredMaxRows: 2,
                    desiredMaxColumns: 4,
                    cellPadding: const EdgeInsets.only(right: 4.0, bottom: 4.0),
                    entryTextStyle: charts.TextStyleSpec(
                      color: charts.MaterialPalette.purple.shadeDefault,
                      fontFamily: 'Georgia',
                      fontSize: 11,
                    ),
                  ),
                ],
                defaultRenderer: new charts.ArcRendererConfig(
                  // customRendererId: 'novoId',
                  arcWidth: 100,
                  arcRendererDecorators: [
                    new charts.ArcLabelDecorator(
                        labelPosition: charts.ArcLabelPosition.inside),
                  ],
                ),
              );
            } else {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
          }),
    );
  }

  _generateData() {
    var pieData = [
      TaskPie(name1, count1, Colors.purple),
      TaskPie(name2, count2, Colors.green),
      TaskPie(name3, count3, Colors.blue),
      TaskPie(name4, count4, Colors.red),
      TaskPie(name5, count5, Colors.orange),
      TaskPie(name6, count6, Colors.cyan),
      TaskPie(name7, count7, Colors.amber),
    ];
    _seriesPieData = [];

    _seriesPieData.add(
      charts.Series(
          data: pieData,
          domainFn: (TaskPie task, _) => task.task,
          measureFn: (TaskPie task, _) => task.taskvalue,
          colorFn: (TaskPie task, _) =>
              charts.ColorUtil.fromDartColor(task.colorval),
          id: 'Number Age Users',
          labelAccessorFn: (TaskPie row, _) => '${row.taskvalue}'),
    );
  }
}

class TaskPie {
  var task;
  var taskvalue;
  Color colorval;
  TaskPie(this.task, this.taskvalue, this.colorval);
}
