import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'helpr-front';

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    titleService: Title
  ) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).pipe(map(() => activatedRoute)).pipe(
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
    ).pipe(switchMap((route) => route.data)).subscribe((event) => titleService.setTitle(event['titulo']));
  }

  public static isDark: boolean = false;
}
