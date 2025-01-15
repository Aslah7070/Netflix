




import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChartUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: props.chartData ? props.chartData.series : [44, 55, 41, 17, 15],
            options: {
                chart: {
                    width: 380,
                    type: 'donut',
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 2000,
                        animateGradually: {
                            enabled: true,
                            delay: 500,
                        },
                    },
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 270,

                    },
                },
                labels: props.chartData ? props.chartData.labels : [],
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    type: 'gradient',
                },
                legend: {
                    formatter: function (val, opts) {
                        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
                    },
                },
                title: {
                    text: 'Users Chart',
                    align: 'center',
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold', 
                        color: '#333',
                    },
                    offsetY: 140,
                    className: 'custom-chart-title',
                },
                responsive: [
                    {
                        breakpoint: 1700,
                        options: {
                            chart: {
                                width: 370,
                            },
                            legend: {

                                position: 'bottom',
                            },
                        },
                    },
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {

                                position: 'bottom',
                            },
                        },
                    },
                    {
                        breakpoint: 480, 
                        options: {
                          title: {
                            offsetY: 10,
                          },
                        },
                      },
                      {
                        breakpoint: 1147, 
                        options: {
                          title: {
                            offsetY: 140,
                          },
                        },
                      },
                ],
            },
        };
    }


    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextProps.chartData) {
            return {
                series: nextProps.chartData.series,
                options: {
                    ...nextState.options,
                    labels: nextProps.chartData.labels || [],
                },
            };
        }
        return null;
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="donut"
                        width={380}
                    />
                </div>
            </div>
        );
    }
}

export default ApexChartUsers;
