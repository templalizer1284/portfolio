import "../Styles/Login.css";

export default function Login() {
    return(
        <div id="Login">
            <h2>Login</h2>
            <form action="http://localhost:8080/login" method="post">
		<input type="text" placeholder="Username"/>
		<input type="password" placeholder="Password"/>
		<button id="login-button" type="submit">Login</button>
            </form>
	</div>
    );
}
