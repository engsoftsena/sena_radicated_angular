import { AfterViewInit, Component } from '@angular/core';
// Importacion de Funciones Generales
import {
  expFormCollect,
  expModalClass,
  expModalClose,
  expModalMapData,
  expModalReset
} from 'src/app/functions/modal-form';

declare var Highcharts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    /*Highcharts.chart('container_basic_bar', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region',
        align: 'left'
      },
      subtitle: {
        text: 'Source: <a ' +
          'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
          'target="_blank">Wikipedia.org</a>',
        align: 'left'
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe'],
        title: {
          text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        },
        gridLineWidth: 0
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          borderRadius: '50%',
          dataLabels: {
            enabled: true
          },
          groupPadding: 0.1
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Year 1990',
        data: [631, 727, 3202, 721]
      }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726]
      }, {
        name: 'Year 2018',
        data: [1276, 1007, 4561, 746]
      }]
    });

    // Data retrieved from https://netmarketshare.com
    Highcharts.chart('container_pie_chart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in May, 2020',
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 70.67,
          sliced: true,
          selected: true
        }, {
          name: 'Edge',
          y: 14.77
        }, {
          name: 'Firefox',
          y: 4.86
        }, {
          name: 'Safari',
          y: 2.63
        }, {
          name: 'Internet Explorer',
          y: 1.53
        }, {
          name: 'Opera',
          y: 1.40
        }, {
          name: 'Sogou Explorer',
          y: 0.84
        }, {
          name: 'QQ',
          y: 0.51
        }, {
          name: 'Other',
          y: 2.6
        }]
      }]
    });*/
  }

  modalClass() { expModalClass(); }

}
