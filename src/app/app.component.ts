import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonTableComponent} from "./common-table/common-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'table-project';
}
