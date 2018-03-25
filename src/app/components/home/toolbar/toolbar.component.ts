// Importar el núcleo de Angular
import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CountdownService} from '../../../services/countdown.service';

@Component({
    selector: 'toolbar',
    templateUrl: 'toolbar.component.html'
})


// Clase del componente donde iran los datos y funcionalidades
export class ToolbarComponent {
	search: string;
	pageState: any;

	constructor(private _countdownService: CountdownService, private router: Router, private route: ActivatedRoute){}


}
