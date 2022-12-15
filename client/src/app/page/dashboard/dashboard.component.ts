import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor() {}

  ngOnInit(): void {
    this.loadScripts();
  }

  loadScripts() {
    const dynamicScripts = [
      'assets/js/modernizr.js',
      'assets/js/jquery-3.6.1.min.js',
      'assets/js/common_scripts.min.js',
      'assets/js/velocity.min.js',
      'assets/js/functions.js',
      'assets/js/survey_func.js',
    ];
    const dynamicCss = [
      'assets/css/css-bootstrap.min.css',
      'assets/css/css-menu.css',
      'assets/css/css-style.css',
      'assets/css/css-vendors.css',
      'assets/css/css-custom.css',
    ];
    for (let i = 0; i < dynamicCss.length; i++) {
      const node = document.createElement('link');
      node.href = dynamicCss[i];
      node.type = 'text/css';
      node.rel = 'stylesheet';
      document.getElementsByTagName('body')[0].appendChild(node);
    }
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('body')[0].appendChild(node);
    }
  }
}
