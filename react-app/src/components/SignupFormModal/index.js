import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { login, signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			let data = await dispatch(signUp(username, email, password));
			if (data) {
				data = data.map((err) => {
					return err.split(':')[1]
				})
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div id="outerdivsignuppage">
			<div id="innerdivsignuppage">
				<div>
					<h1 id="signuptextsignupmodal">Sign Up</h1>
				</div>
				<form onSubmit={handleSubmit} id="formsignuppageinputs">
					<div>
						{errors.map((error, idx) => (
							<div key={idx} className="errorsforsignuppage">{error}</div>
						))}
					</div>
					<div>
						<label>
							Email:
							<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							Username:
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							Password:
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							Confirm Password:
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</label>
					</div>
					<div>
						<button id="submitbuttonsignup" type="submit">Sign Up</button>
					</div>
					<div>
					</div>
				</form>
				<div id="innerdivsignupbutton">
					<button id="submitbuttonsignup"
						onClick={async () => {
							await dispatch(login('demo@aa.io', 'password'));
							closeModal()
						}}
					>Demo User</button>
				</div>
				<div>
					<a href="https://game-night-63q9.onrender.com/api/auth/oauth_login"><button id='googlebutton'><img id="googleiconbutton" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"></img> Continue with Google</button></a>
				</div>
			</div>
		</div>
	);
}

export default SignupFormModal;
