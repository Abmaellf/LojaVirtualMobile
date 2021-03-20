import { StorageService } from './storage.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/config/api.config";
import { tap } from 'rxjs/operators';
import { CredenciaisDTO } from "src/models/credenciais.dto";
import { LocalUser } from "src/models/local_user";

@Injectable()
export class AuthService{

    constructor(
      private http: HttpClient,
      public storage: StorageService){
        
    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseURL}/login`,
            creds, 
            { observe: 'response',  responseType: 'text' }
        ).pipe(tap( res => {

          console.log(res)
          
          const token = res.headers.get('Authorization');

        }))
      }


      succesFulllogin(authorizationValue: string){
        let  tok = authorizationValue.substring(7);
        let user: LocalUser = {
          token: tok
        };
        this.storage.setLocalUser(user);
 }

 logout(){
  this.storage.setLocalUser(null);
}


    }