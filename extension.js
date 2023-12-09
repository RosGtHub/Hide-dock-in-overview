import * as Main from 'resource:///org/gnome/shell/ui/main.js';

function onOverviewActivated() {
  Main.overview.dash.hide();
}

function onOverviewDeactivated() {
  Main.overview.dash.show();
}

export default class DockExtension {
  constructor() {
    this.showingSignalId = null;
    this.hiddenSignalId = null;
  }

  enable() {
    if (this.showingSignalId) {
      Main.overview.disconnect(this.showingSignalId);
    }
    if (this.hiddenSignalId) {
      Main.overview.disconnect(this.hiddenSignalId);
    }
    this.showingSignalId = Main.overview.connect('showing', onOverviewActivated);
    this.hiddenSignalId = Main.overview.connect('hiding', onOverviewDeactivated);
  }

  disable() {
    if (this.showingSignalId) {
      Main.overview.disconnect(this.showingSignalId);
      this.showingSignalId = null;
    }
    if (this.hiddenSignalId) {
      Main.overview.disconnect(this.hiddenSignalId);
      this.hiddenSignalId = null;
    }
  }

  static init() {
    const extension = new DockExtension();
    extension.enable();
    return extension;
  }
}
