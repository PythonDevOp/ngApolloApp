import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'search-form',
    styleUrls: ['search-form.component.css'],
    templateUrl: './search-form.component.html',
})
export class SearchForm {
    @Input()
    parent: FormGroup;
}
