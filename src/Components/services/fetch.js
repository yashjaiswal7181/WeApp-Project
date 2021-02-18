export function loginFetch(user, history) {
    fetch(' http://localhost:3001/auth/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          // setErrorMessage(res.json());
        }
      })
      .then((data) => {
        console.log('token', data);
        localStorage.setItem('token', data.token);
        history.push('/');
        // Changing/Modifying the original state
      });
  }
  