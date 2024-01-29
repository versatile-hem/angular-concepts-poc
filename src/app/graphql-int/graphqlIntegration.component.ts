import { Component, OnInit ,Inject, Injectable} from '@angular/core'; 
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { NgFor , NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule,MAT_DIALOG_DATA, MatDialogRef, MatDialogClose, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';




const SEARCH_CLIENTS = gql`
query SearchClientv2($size: Int!, $page: Int!) {
  searchClientv2(input: { size: $size, page: $page, searchParam: { name: "" } }) {
      page
      size
      clients {
          name
          description
          address
          email
          contactPersonName
          type
      }
  }
}
`;

const CHANGE_POST_TITLE = gql`
mutation SaveClient {
  saveClient(input: {
    name: "new ent"
    address: "e"
    email: "mai"
    description: "d"
    type: CA
    contactPersonName: "csdd"
}) {
  name
  description
  address
  email
  contactPersonName
  type
  }
}
`;

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [NgFor ,MatButtonModule, MatDialogModule, NgIf,MatIconModule, MatTooltipModule, MatPaginatorModule,MatPaginatorModule],
  templateUrl: './graphqlIntegration.component.html',
  styleUrl: './graphqlIntegration.component.scss',
}) 
export class GraphqlIntegrationComponent implements OnInit{

  clientInformation: any; 
  
  constructor(private apollo: Apollo, public dialog: MatDialog) {
  }
  ngOnInit() {
    const cliQuery = this.apollo
    .watchQuery({
      query: SEARCH_CLIENTS,
      variables: {
        size: 5,
        page: 0,
        searchParam: { name: "" }
      },
    }).valueChanges.subscribe(result => {
      this.clientInformation = result.data;
      this.pageSize = this.clientInformation.searchClientv2.pageSize;
      this.length = this.clientInformation.searchClientv2.size;;
    });
  }
 

  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent = new PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.searchClient(this.pageSize, this.pageIndex);

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      this.searchClient(this.pageSizeOptions.length, this.pageIndex);
    }
  }


  searchClient(totalcount: Number, pageNumber: Number) {
    const cliQuery = this.apollo
    .watchQuery({
      query: SEARCH_CLIENTS,
      variables: {
        size: totalcount,
        page: pageNumber,
        searchParam: { name: "" }
      },
    }).refetch().then(result => {
      this.clientInformation = result.data;
      this.pageSize = this.clientInformation.searchClientv2.pageSize;
      this.length = this.clientInformation.searchClientv2.size;;
    });
  }
  
}
