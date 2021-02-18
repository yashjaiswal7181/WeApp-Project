const auth = {
    isAuthenticated: false,
    authenticate(cb, user) {
      this.isAuthenticated = true;
      cb(user);
    },
    signOut(cb) {
      this.isAuthenticated = false;
      cb();
    },
    checkToken: function (token) {
      return fetch('http://localhost:3001/auth/v1/isAuthenticated', {
        method: 'POST',
        headers: {
          Authorization: token,
        },
      }).then((res) => res.json());
    },
  };
  
  export default auth;
  