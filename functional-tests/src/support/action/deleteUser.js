var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = (username, userApi) => {
  const getUserRequest = new XMLHttpRequest();
  getUserRequest.open('GET', process.env[userApi] + '/users', false);
  getUserRequest.setRequestHeader('Authorization', 'Bearer ' + process.env.access_token);
  getUserRequest.setRequestHeader('Content-Type', 'application/json');
  // request.responseType = 'json';
  getUserRequest.onload = function (e) {
    console.log(this.status);
    if (this.status == 200) {
      const deleteUserRequest = new XMLHttpRequest();
      const users = JSON.parse(this.responseText);
      const myUser = users.find(user => user.emailAddress === process.env[username]);
      console.log('myUser ', myUser.emailAddress);
      console.log
      deleteUserRequest.open('DELETE', process.env[userApi] + '/users/' + myUser.userId, false);
      deleteUserRequest.setRequestHeader('Authorization', 'Bearer ' + process.env.access_token);
      deleteUserRequest.setRequestHeader('Content-Type', 'application/json');
      deleteUserRequest.onload = function(e) {
        if (this.status == 200) {
          console.log('User with email' + process.env[username] + ' has been deleted', this.status)
        } else {
          const failedResponse = JSON.parse(this.responseText); 
          throw(new Error('Status ' + this.status + ' Request returned as ' + this.response + ' - ' + failedResponse.errorMessage,));
        }                
      } 
      deleteUserRequest.send();
    } else {
      console.log('User does not exist');
    }
  }
  getUserRequest.send();
};
