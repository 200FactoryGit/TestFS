export interface ApiRouteError {
    route: string;
    status: number;
    message: string;
    errors: ApiError[];
  }
  
  export interface ApiError {
    key: string;
    messages: string[];
  }
  