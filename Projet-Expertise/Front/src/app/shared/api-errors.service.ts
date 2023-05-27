import { Injectable, EventEmitter } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ApiRouteError, ApiError } from '../auth/models/ApiRouteError';

@Injectable({ providedIn: 'root' })
export class ApiErrorsService {
  errors: ApiRouteError[];
  onError: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.errors = [];
  }

  getErrors(route: string): ApiRouteError {
    let errors = this.errors.find(e => e.route === route);
    if (!errors) {
      errors = <ApiRouteError>{
        route: route,
        errors: []
      };
    }

    return errors;
  }

  getFieldErrors(route: string, key: string): string[] {
    let errors = this.getErrors(route);
    if (errors && errors.errors && errors.errors.length > 0) {
      let fieldErrors = this.getErrors(route).errors.find(fe => fe.key === key);
      if (fieldErrors && fieldErrors.messages && fieldErrors.messages.length > 0) {
        return fieldErrors.messages;
      }
    }

    return [];
  }

  handleApiError(errorResponse: HttpErrorResponse) {
    console.log('error shown');
    if (errorResponse) {
      let newError = <ApiRouteError>{
        route: location.pathname,
        status: errorResponse.status,
        message: errorResponse.message || errorResponse.statusText,
        errors: []
      };

      if (errorResponse.error) {
        newError.errors = Object.keys(errorResponse.error).map(key => {
          return <ApiError>{
            key: key,
            messages: errorResponse.error[key]
          };
        })
      }

      this.setErrors(newError);
    }

    return throwError(errorResponse);
  }

  private setErrors(apiRouteError: ApiRouteError) {
    console.log('tab error ' + JSON.stringify(this.errors));
    let index = this.errors.findIndex(e => e.route == apiRouteError.route);
    console.log('index ' + index);
    if (index >= 0) {
      this.errors[index] = apiRouteError;
    } else {
      this.errors.push(apiRouteError);
    }

    this.onError.emit(true);
  }
}
