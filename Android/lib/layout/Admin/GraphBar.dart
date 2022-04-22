// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;

class GraphBar extends StatefulWidget {
  const GraphBar({Key? key}) : super(key: key);
  @override
  _GraphBar createState() => _GraphBar();
}

class _GraphBar extends State<GraphBar> {
  late List<charts.Series<TaskBar, String>> _seriesPieData;
  _generateData() {
    var pieData = [
      TaskBar('User 1', 40, Colors.purple),
      TaskBar('User 2', 25, Colors.green),
      TaskBar('User 3', 15.2, Colors.blue),
      TaskBar('User 4', 15, Colors.red),
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

  @override
  void initState() {
    super.initState();
    _seriesPieData = <charts.Series<TaskBar, String>>[];
    _generateData();
  }

  @override
  Widget build(BuildContext context) => charts.BarChart(
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
}

class TaskBar {
  String task;
  double taskvalue;
  Color colorval;
  //Color colorval;

  TaskBar(this.task, this.taskvalue, this.colorval);
}
