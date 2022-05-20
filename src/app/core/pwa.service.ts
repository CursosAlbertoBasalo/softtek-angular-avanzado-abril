import { isPlatformServer } from '@angular/common';
import { ApplicationRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { concat, first, interval } from 'rxjs';
import { PwaStore } from './pwa.store';

type AppVersion = {
  version: string;
  description: string;
};

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private readonly emptyVersion = {
    version: '',
    description: '',
  };

  private appVersion: AppVersion = this.emptyVersion;

  private readonly storageKey = 'appVersion';

  constructor(
    private readonly swUpdate: SwUpdate,
    private readonly pwaStore: PwaStore,
    private readonly appRef: ApplicationRef,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    if (isPlatformServer(this.platformId)) return;
    this.pwaStore.set({
      status: `🏁 Starting`,
    });
    this.loadInitialVersion();

    this.observeVersionUpdates();
    this.checkForUpdatesOnTime();
  }

  private loadInitialVersion() {
    this.appVersion = this.emptyVersion;
    const localAppVersion = localStorage.getItem(this.storageKey);
    if (localAppVersion) {
      this.appVersion = JSON.parse(localAppVersion);
    }
    this.pwaStore.set({
      version: this.appVersion.version,
      description: this.appVersion.description,
      status: `🏁 Initializing`,
    });
  }

  private saveVersion(appVersion?: AppVersion) {
    if (!appVersion) return;
    this.appVersion = appVersion;
    localStorage.setItem(this.storageKey, JSON.stringify(this.appVersion));
  }

  private observeVersionUpdates() {
    this.pwaStore.set({
      status: `👀 Observing version updates`,
    });
    this.swUpdate.versionUpdates.subscribe((event) => {
      this.onUpdate(event);
    });
  }

  private onUpdate(event: VersionEvent) {
    switch (event.type) {
      case 'VERSION_DETECTED':
        this.pwaStore.set({
          status: `⬇️ Downloading new app version: ${event.version.hash}`,
        });
        break;
      case 'VERSION_READY':
        this.saveVersion(event.latestVersion.appData as AppVersion);
        this.pwaStore.set({
          version: this.appVersion.version,
          description: this.appVersion.description,
          status: `✅ Ready new app hash: ${event.latestVersion.hash}`,
          showReload: true,
        });
        break;
      case 'VERSION_INSTALLATION_FAILED':
        this.pwaStore.set({
          status: `💣 Error: ${event.error} for hash: ${event.version.hash}`,
        });
        break;
    }
  }

  private checkForUpdatesOnTime() {
    this.pwaStore.set({
      status: `✏️ Registering to check for updates`,
    });

    const appIsStable$ = this.appRef.isStable.pipe(first((isStable) => isStable === true));

    const everyNowAndThen$ = interval(60 * 1000);

    const everyNowAndThenOnceAppIsStable$ = concat(appIsStable$, everyNowAndThen$);

    everyNowAndThenOnceAppIsStable$.subscribe(() => {
      this.pwaStore.set({
        status: `⏰ Checking for updates`,
      });
      this.swUpdate.checkForUpdate().then((hasNewVersion) => {
        if (hasNewVersion) {
          this.pwaStore.set({
            version: this.appVersion.version,
            description: this.appVersion.description,
            status: `🪙 Found Updates`,
            showReload: true,
          });
        } else {
          this.pwaStore.set({
            status: `⚒️ Not Found Updates`,
          });
        }
      });
    });
  }
}
