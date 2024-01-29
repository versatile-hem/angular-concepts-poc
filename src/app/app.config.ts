import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from './graphql.provider';
import { provideAnimations } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),  
    provideHttpClient(), graphqlProvider, provideAnimations(),MatSidenavModule], 
};




