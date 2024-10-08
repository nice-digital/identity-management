import { XMLHttpRequest } from "xmlhttprequest";

export async function finduser(userApi: string, username: string): Promise<void> {

  const request = new XMLHttpRequest();

  console.log('userApi', process.env[userApi]);
  request.open('GET', process.env[userApi] + '/users', false);
  request.setRequestHeader('Authorization', 'Bearer ' + process.env.access_token);
  request.setRequestHeader('Content-Type', 'application/json');
  // request.responseType = 'json';
  request.onload = function(e: any) {
    console.log(this.status);
    if (this.status == 200) {
     const users = JSON.parse(this.responseText);
      const myUser = users.find((user: { email: string | undefined; }) => user.email === process.env[username]);
      
      return myUser;
    } else {
      throw(new Error('Status ' + this.status + ' Request returned as ' + this.response));
    }
  }; 
request.send();
 };

export default finduser;
