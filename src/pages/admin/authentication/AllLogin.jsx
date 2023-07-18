import React from 'react'

function AllLogin() {
  return (
    <div class="container">
    <form class="form-1">
      <h1>Login</h1>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required />
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required />
      <span>Forgot Password</span>
      <button>Login</button>
    </form>
  </div>
  )
}

export default AllLogin