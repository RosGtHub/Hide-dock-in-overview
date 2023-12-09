import * as Main from 'resource:///org/gnome/shell/ui/main.js';  

function onOverviewActivated() {
    Main.overview.dash.hide();
}

function onOverviewDeactivated() {
    Main.overview.dash.show();
}

export default class  DockExtension{
    enable() { 
        this.showingSignalId = Main.overview.connect('showing', onOverviewActivated);
        this.hiddenSignalId = Main.overview.connect('hiding', onOverviewDeactivated);
    }
    disable() {
        Main.overview.disconnect(this.showingSignalId);
        Main.overview.disconnect(this.hiddenSignalId);
    }
}

function init() {
    return new DockExtension(); 
}
