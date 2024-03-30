import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import GLib from 'gi://GLib';

let delay = 0.2;
let _sourceId;

function onOverviewActivated() {
  Main.overview.dash.hide();
}

function onOverviewDeactivated() {
    _sourceId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, delay, () => {
    Main.overview.dash.show();
    return GLib.SOURCE_CONTINUE;
  });
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
    if (_sourceId) {
      GLib.Source.remove(_sourceId);
      _sourceId = null;
    }
  }
}
