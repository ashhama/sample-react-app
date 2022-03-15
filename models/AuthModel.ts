type Nullable<T> = T | null;

class AuthItem {
    user: Nullable<string>;
    token: Nullable<string>;
    isLoggedIn: boolean;
    constructor( user: Nullable<string>, token:Nullable<string>, isLoggedIn:boolean) {
        this.user = user;
        this.token = token;
        this.isLoggedIn = isLoggedIn;
    }
  }
  
  export default AuthItem;