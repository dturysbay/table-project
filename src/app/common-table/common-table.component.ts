import { Component } from '@angular/core';
import axios from "axios";
import {PanelModule} from "primeng/panel";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [
    PanelModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    TableModule,
    NgForOf,
    PaginatorModule,
    NgIf
  ],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent {
  // data = [
  //   { name: 'Candice Mack', age: 30, company: 'COMBOGENE', balance: '$1,942.91', favoriteFruit: 'apple' },
  //   { name: 'Avis Buchanan', age: 32, company: 'MANTRIX', balance: '$3,203.94', favoriteFruit: 'banana' },
  //   { name: 'Henderson Hooper', age: 35, company: 'UPLINX', balance: '$2,446.31', favoriteFruit: 'apple' },
  //   { name: 'Foley Fitzgerald', age: 32, company: 'UNCORP', balance: '$3,028.51', favoriteFruit: 'banana' },
  //   { name: 'Griffith Knight', age: 26, company: 'ENDIPIN', balance: '$2,755.24', favoriteFruit: 'banana' },
  //   { name: 'Richardson Lara', age: 22, company: 'MAZUDA', balance: '$3,598.38', favoriteFruit: 'apple' },
  //   { name: 'Kaye Meyers', age: 22, company: 'FURNIGEER', balance: '$2,531.89', favoriteFruit: 'strawberry' },
  //   { name: 'Allen Small', age: 26, company: 'ANIMALIA', balance: '$1,693.10', favoriteFruit: 'banana' },
  //   { name: 'Chavez Valencia', age: 24, company: 'XERONK', balance: '$2,836.62', favoriteFruit: 'strawberry' }
  // ];
  data: any[] = []

  columns = [
    { field: 'name', name: 'Name', visible: true },
    { field: 'age', name: 'Age', visible: true },
    { field: 'company', name: 'Company', visible: true },
    { field: 'balance', name: 'Balance', visible: true },
    { field: 'favoriteFruit', name: 'Favorite Fruit', visible: true }
  ];

  displayedColumns = this.columns.filter(col => col.visible);
  filterText = '';
  currentPage = 1;
  rowsPerPage = 5;
  sortColumn = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  paginatedData: any[] = [];
  totalPages = 1;

  ngOnInit() {

    this.fetchData()
    this.updateTable();
  }

  toggleColumnVisibility(column: any) {
    column.visible = !column.visible;
    this.displayedColumns = this.columns.filter(col => col.visible);
    this.updateTable();
  }

  applyFilter() {
    this.currentPage = 1;
    this.updateTable();
  }

  updateTable() {
    let filteredData = this.data;

    if (this.filterText) {
      filteredData = this.data.filter(row => {
        return Object.values(row).some(value =>
          String(value).toLowerCase().includes(this.filterText.toLowerCase())
        );
      });
    }

    // if (this.sortColumn) {
    //   filteredData = filteredData.sort((a, b) => {
    //     const aVal = a[this.sortColumn];
    //     const bVal = b[this.sortColumn];
    //
    //     if (aVal < bVal) {
    //       return this.sortOrder === 'asc' ? -1 : 1;
    //     } else if (aVal > bVal) {
    //       return this.sortOrder === 'asc' ? 1 : -1;
    //     } else {
    //       return 0;
    //     }
    //   });
    // }

    this.totalPages = Math.ceil(filteredData.length / this.rowsPerPage);

    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedData = filteredData.slice(start, end);
  }

  sortTable(column: string) {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
    this.updateTable();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateTable();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTable();
    }
  }

  fetchData(){
    const apiURL = 'https://d152194c00c2ad29.mokky.dev/table-items';
    axios.get(apiURL)
      .then(response => {
        this.data = response.data;
        this.updateTable()
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }
}
