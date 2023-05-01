import { Component, HostBinding, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostBinding('class')
  get themeMode() {
    return AppComponent.isDark ? 'theme-dark' : 'theme-light'
  }

  switchMode(isDarkMode: boolean) {
    AppComponent.isDark = isDarkMode;
  }

}
