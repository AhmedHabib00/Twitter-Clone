// ignore_for_file: file_names, avoid_unnecessary_containers, unnecessary_new

import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;

class GraphPie extends StatefulWidget {
  const GraphPie({Key? key}) : super(key: key);
  @override
  _GraphPie createState() => _GraphPie();
}

class _GraphPie extends State<GraphPie> {
// ignore: unused_field

  late List<charts.Series<TaskPie, String>> _seriesPieData;
  _generateData() {
    var pieData = [
      TaskPie('10-15', 10, Colors.purple),
      TaskPie('15-20', 18, Colors.green),
      TaskPie('20-30', 37, Colors.blue),
      TaskPie('30-40', 25, Colors.red),
      TaskPie('40-50', 15, const Color.fromARGB(255, 255, 0, 221)),
    ];
    _seriesPieData.add(
      charts.Series(
          data: pieData,
          domainFn: (TaskPie task, _) => task.task,
          measureFn: (TaskPie task, _) => task.taskvalue,
          colorFn: (TaskPie task, _) =>
              charts.ColorUtil.fromDartColor(task.colorval),
          id: 'Daily TaskPie',
          labelAccessorFn: (TaskPie row, _) => '${row.taskvalue}'),
    );
  }

  @override
  void initState() {
    super.initState();
    _seriesPieData = <charts.Series<TaskPie, String>>[];
    _generateData();
  }

  @override
  Widget build(BuildContext context) => charts.PieChart<String>(
        _seriesPieData,
        animate: true,
        animationDuration: const Duration(seconds: 3),
        behaviors: [
          charts.DatumLegend(
            outsideJustification: charts.OutsideJustification.endDrawArea,
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
          arcWidth: 100,
          arcRendererDecorators: [
            new charts.ArcLabelDecorator(
                labelPosition: charts.ArcLabelPosition.inside),
          ],
        ),
      );
}

class TaskPie {
  String task;
  double taskvalue;
  Color colorval;
  //Color colorval;

  TaskPie(this.task, this.taskvalue, this.colorval);
}
