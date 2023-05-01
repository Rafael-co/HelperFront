import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public isDark: boolean = false;

  @Output()
  readonly darkModeSwitched: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
  
  ngOnInit(): void {
    this.isDark = AppComponent.isDark
  }
  
  onDarkModeSwitched({checked}: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked);
  }

  public logout(): void {
    // LOGOUT
  }
}
