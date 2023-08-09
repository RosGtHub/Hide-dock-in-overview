const { Meta } = imports.gi;
const Main = imports.ui.main;

function hideDock() {
    Main.overview.dash.hide();
}

function onOverviewActivated() {
    hideDock();
}

function onOverviewDeactivated() {
    Main.overview.dash.show();
}

class DockExtension {
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
