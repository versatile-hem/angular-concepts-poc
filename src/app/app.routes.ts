import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GraphqlIntegrationComponent } from './graphql-int/graphqlIntegration.component';



export const routes: Routes = [
        { path: '\grapql-int', component: GraphqlIntegrationComponent },
    ];  
export class AppRoutingModule { }
