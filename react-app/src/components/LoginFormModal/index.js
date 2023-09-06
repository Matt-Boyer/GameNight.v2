import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <div id="innerdivsignuppage">
      <h1 id="signuptextsignupmodal">Log In</h1>
      <form id="formsignuppageinputs" onSubmit={handleSubmit}>
        <div>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
          {errors.length > 0 && <p className="errorsforsignuppage">Invalid Credentials</p>}
        </div>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button id="submitbuttonlogin" type="submit">Log In</button>
      </form>
      <div id="innerdivsignupbutton">
					<button id="submitbuttonsignup"
						onClick={async () => {
							await dispatch(login('demo@aa.io', 'password'));
							closeModal()
						}}
					>Demo User</button>
				</div>
    </div>
  );
}

export default LoginFormModal;
