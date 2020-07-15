import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import {MdbTableDirective} from "angular-bootstrap-md"; 
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {

  public form: FormGroup;

  @ViewChild(MdbTableDirective, { static: true }) 

  mdbTable: MdbTableDirective; 
  elements: any = []; 
  headElements = ['Id', 'Name', 'Email','Date', 'Score']; searchText: string = '';      
  previous: string;
  constructor() { } 
  @HostListener('input') 
  
  oninput() { 
      this.searchItems();
  } 

  ngOnInit(): void {
    for (let i = 1; i <= 15; i++) {
      let j = i*5;
      this.elements.push({ Id: i, Name: 'User ' + i, Email: 'user' + i +'@gmail.com', Date: '6/13/2020', Score: j });
    }
    this.mdbTable.setDataSource(this.elements); 
    this.previous = this.mdbTable.getDataSource(); 
  }

  /*name of the excel-file which will be downloaded. */ 
fileName= 'ExcelSheet.xlsx';  

exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

  searchItems() { 
    const prev = this.mdbTable.getDataSource(); 
    if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous); 
        this.elements = this.mdbTable.getDataSource(); 
    } 
    if (this.searchText) { 
        this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev); 
        } 
    } 

}
