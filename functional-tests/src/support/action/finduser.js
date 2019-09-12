var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
export const finduser = (userApi, username) => {

  const request = new XMLHttpRequest();

  console.log('userApi', process.env[userApi]);
  request.open('GET', process.env[userApi], true);
  request.setRequestHeader('Authorization', 'Bearer ' + process.env.access_token);
  request.setRequestHeader('Content-Type', 'application/json');
  // request.responseType = 'json';
  request.onload = function(e) {
    if (this.status == 200) {
     const users = JSON.parse(this.responseText);
      const myUser = users.find(user => user.email === process.env[username]);

      // console.log(myUser.userId);
      return myUser;
    }
  }; 
request.send();
 };

export default finduser;
