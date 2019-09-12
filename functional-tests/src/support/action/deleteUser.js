var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = (username, userApi) => {
  const request = new XMLHttpRequest();
  request.open('GET', process.env[userApi], false);
  request.setRequestHeader('Authorization', 'Bearer ' + process.env.access_token);
  request.setRequestHeader('Content-Type', 'application/json');
  // request.responseType = 'json';
  request.onload = function (e) {
    if (this.status == 200) {
      const request = new XMLHttpRequest();
      const users = JSON.parse(this.responseText);
      const myUser = users.find(user => user.email === process.env[username]);
      request.open('DELETE', process.env[userApi] + '?userId=' + myUser.userId, false);
      request.setRequestHeader('Authorization', 'Bearer ' + process.env.access_token);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send();
    } else {
      console.log('User does not exist');
    }
  }
  request.send();
};
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// const request = new XMLHttpRequest();

// request.open('GET', 'https://alpha-identityapi.nice.org.uk/api/users', false);
// request.setRequestHeader('x-api-key', '029B80C2-9631-43F3-88AF-9F037C356D30');
// request.setRequestHeader('Content-Type', 'application/json');
// // request.responseType = 'json';
// request.onload = function (e) {
//   if (this.status == 200) {
//     const request = new XMLHttpRequest();
//     const users = JSON.parse(this.responseText);
//     const myUser = users.find(user => user.email === 'martingmeta67@gmail.com');
//     console.log(myUser);
//     request.open('DELETE', 'https://alpha-identityapi.nice.org.uk/api/users' + '?userId=' + myUser.userId, false);
//     request.setRequestHeader('x-api-key', '029B80C2-9631-43F3-88AF-9F037C356D30');
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send();
//   } else {
//     console.log('User does not exist');
//   }
// }
// request.send();