// ignore_for_file: file_names, non_constant_identifier_names, avoid_print, prefer_typing_uninitialized_variables, prefer_const_constructors_in_immutables, camel_case_types, unused_element, prefer_equal_for_default_values, use_function_type_syntax_for_parameters

import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:http/http.dart' as http;
import 'dart:convert';

class GraphBar extends StatefulWidget {
  final String token;
  GraphBar({Key? key, required this.token}) : super(key: key);
  @override
  _GraphBar createState() => _GraphBar();
}

class _GraphBar extends State<GraphBar> {
  late List<charts.Series<TaskBar, String>> _seriesPieData;
  late int cat2 = 5;
  late int cat3 = 10;
  late int cat4 = 7;
  late int cat = 20;
  late Future<int> datafuture;

  Future<int> GraphBarApi() async {
    Map mapResponse;
    //Map dataResponse;
    http.Response response;
    response = await http.get(
      Uri.parse(
          //'https://reqres.in/api/users/2',
          'https://www.thegrowingdeveloper.org/apiview?id=2'
          //   //'http://habibsw-env-1.eba-rktzmmab.us-east-1.elasticbeanstalk.com/api/admins/statistics/noUsers'),
          //   //headers: {'x-auth-token': token},
          ),
    );
    //await Future.delayed(const Duration(seconds: 1));
    setState(() {
      mapResponse = json.decode(response.body);
      cat = mapResponse['id'];
      // print(cat);
      // print('cat in api');
    });
    return cat;
  }

  @override
  void initState() {
    super.initState();
    _seriesPieData = <charts.Series<TaskBar, String>>[];
    datafuture = GraphBarApi();
    //_generateData();
  }

  @override
  Widget build(BuildContext context) {
    // print(cat);
    // print('cat in widget');
    return Scaffold(
      body: FutureBuilder<int?>(
        future: datafuture,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            cat = snapshot.data!;
            // print(cat);
            // print('inside future');
            _generateData();
            return charts.BarChart(
              _seriesPieData,
              animate: true,
              animationDuration: const Duration(seconds: 3),
              behaviors: [
                charts.DatumLegend(
                  outsideJustification: charts.OutsideJustification.endDrawArea,
                  horizontalFirst: false,
                  desiredMaxRows: 2,
                  cellPadding: const EdgeInsets.only(right: 4.0, bottom: 4.0),
                  entryTextStyle: charts.TextStyleSpec(
                    color: charts.MaterialPalette.purple.shadeDefault,
                    fontFamily: 'Georgia',
                    fontSize: 11,
                  ),
                ),
              ],
            );
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }

  _generateData() async {
    var pieData = [
      TaskBar('cat 1', cat, Colors.purple),
      TaskBar('cat 2', cat2, Colors.green),
      TaskBar('cat 3', cat3, Colors.blue),
      TaskBar('cat 4', cat4, Colors.red),
    ];
    _seriesPieData.add(
      charts.Series(
          data: pieData,
          domainFn: (TaskBar task, _) => task.task,
          measureFn: (TaskBar task, _) => task.taskvalue,
          colorFn: (TaskBar task, _) =>
              charts.ColorUtil.fromDartColor(task.colorval),
          id: 'Daily TaskBar',
          labelAccessorFn: (TaskBar row, _) => '${row.taskvalue}'),
    );
  }
}

class TaskBar {
  String task;
  var taskvalue;
  Color colorval;

  TaskBar(this.task, this.taskvalue, this.colorval);
}
