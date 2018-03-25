import {Component} from '@angular/core';
import 'app/rxjs-operators';

/*const electron = (<any>window).require('electron');^
const {remote} = electron;*/

@Component({
  templateUrl: 'app.component.html',
  selector: 'app-root'
})

export class AppComponent {
  infoApp = 'Countdown timer';

  constructor() {}

  handlerWindow(action: String) {
    /*console.log(action);
    const window = remote.getCurrentWindow();
    if (action === 'close') {
         window.close();
    }else if (action === 'max') {
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    }else if (action === 'min') {
        window.minimize();
    }*/
  }
}
