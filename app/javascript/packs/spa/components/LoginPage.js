import React from 'react';

export default function LoginPage() {
  return <div className='login-wrapper'>
    <h2>Please Log In</h2>
    <form className="form-group">
        <input type='text' className="form-group form-control" placeholder="Enter email" />
        <input type='password' className="form-group form-control" placeholder="Enter password" />
      <button type='submit' className="btn btn-primary">Login</button>
    </form>
  </div>
}
