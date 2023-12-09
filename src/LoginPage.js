// import React, { useState } from "react";
// import bcrypt from "bcrypt";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [authenticated, setAuthenticated] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email && password) {
//       const hashedPassword = bcrypt.hash(password, 10);
//       const user = { email, password: hashedPassword };
//       // Call login API or perform other login logic here
//       setAuthenticated(true);
//     } else {
//       setError(null);
//     }
//   };

//   const handleLogout = () => {
//     setAuthenticated(false);
//   };

//   return (
//     <div className="login-page">
//       <h1>Login to your account</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//       {error && <div className="error">{error}</div>}
//       {authenticated && <div className="authenticated">Welcome, {email}!</div>}
//       <button onClick={handleLogout} className="logout">
//         Logout
//       </button>
//     </div>
//   );
// }

// export default LoginPage;
