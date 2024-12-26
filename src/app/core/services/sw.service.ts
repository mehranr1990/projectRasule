import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwService {

  update: boolean = false;

  constructor(updates: SwUpdate) {

    updates.versionUpdates.subscribe((evt) => {
      console.log(evt);
      
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          if(evt.latestVersion.hash){
            console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
            this.update = true
          }
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });

  }

}
