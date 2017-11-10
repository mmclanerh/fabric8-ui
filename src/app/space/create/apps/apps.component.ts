import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import {
  AppsService,
  Environment,
} from './services/apps.service';

import { Spaces } from 'ngx-fabric8-wit';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'alm-apps',
  templateUrl: 'apps.component.html'
})
export class AppsComponent implements OnDestroy, OnInit {

  spaceId: Observable<string>;
  environments: Observable<Environment[]>;
  applications: Observable<string[]>;

  constructor(
    private spaces: Spaces,
    private appsService: AppsService
  ) {
    this.spaceId = this.spaces.current.first().map(space => space.id);
   }

  ngOnDestroy(): void { }

  ngOnInit(): void {
    this.updateResources();
  }

  private updateResources(): void {
    this.spaceId.subscribe(spaceId => {
      this.environments =
        this.appsService.getEnvironments(spaceId);

      this.applications =
        this.appsService.getApplications(spaceId);
    });
  }

}
