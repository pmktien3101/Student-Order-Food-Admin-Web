import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef<HTMLCanvasElement>;

  pieChart: any;
  barChart: any;
  lineChart: any;
  doughnutChart: any;

  ngAfterViewInit() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Shop Owner', 'Student'],
        datasets: [{
          data: [11, 35],
          backgroundColor: ['#ff6b3d', '#e0e0e0']
        }]
      }
    });

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Pending Shops',
          data: [2, 3, 1, 4, 3],
          backgroundColor: ['#e0e0e0', '#e0e0e0', '#e0e0e0', '#e0e0e0', '#e0e0e0']
        }]
      }
    });

    // Line Chart: Yêu cầu rút tiền theo ngày
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Withdraw Requests',
          data: [1, 2, 0, 3, 2, 1, 4],
          fill: true,
          borderColor: '#ff6b3d',
          backgroundColor: 'rgba(255,107,61,0.15)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });

    this.createDoughnutChart();
  }

  createDoughnutChart() {
    // Doughnut Chart: Trạng thái đơn hàng
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending', 'Cancelled'],
        datasets: [{
          data: [18, 3, 2],
          backgroundColor: ['#ff6b3d', '#ffb347', '#e0e0e0']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }
}
