import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherService } from 'src/app/core/weather.service';
import { Weather } from 'src/app/interfaces/weather.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  lat: any; // would be number - but linting complains
  lng: any; // would be number - but linting complains
  weatherResults: any = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataLoading: boolean = false;
  errorMessage: string = '';
  isDesktopLayout: boolean = true;

  constructor(private api: WeatherService, breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isDesktopLayout = false;
      } else {
        this.isDesktopLayout = true;
      }
    });
  }

  ngOnInit(): void {
    this.dataLoading = true;
    this.getUserLocation();
    this.dataLoading = false;
  }

  getWeatherResults(): void {
    this.getWeatherForLocation();
  }

  reset(): void {
    this.lat = null;
    this.lng = null;
    this.weatherResults = null;

    this.getUserLocation();
    this.getWeatherForLocation();
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      this.errorMessage = 'Sorry, we are not able to get your location.';
    }
  }

  private getWeatherForLocation(): void {
    this.dataLoading = true;
    // in case network is slow, set timeout fixes all
    setTimeout(
      () => {
        this.api.getWeather(this.lat, this.lng)
                .pipe(takeUntil(this.destroy$))
                .subscribe((resp: Weather) => {
          this.weatherResults = resp;
          this.dataLoading = false;
        });
      },
      5000
    );
  }

  ngOnDestroy(): void {
    // destroy subscription when component detaches from DOM
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
