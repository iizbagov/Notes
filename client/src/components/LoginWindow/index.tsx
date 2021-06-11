import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { loginUser, registerUser } from "../../store";
import Button from "../common/Button";
import { Column, Row } from "../common/Flex";
import { centerAbsoluteCss } from "../common/Position";
import { AppContext } from "../Context";

const LoginForm = styled(Column)`
  height: 500px;
  width: 400px;
  background-color: ${({ theme }) => theme.noteBgColor};
  justify-content: center;
  align-items: center;
  ${centerAbsoluteCss}
  border-radius: 10px;
`;

const LoginFormInput = styled("input")`
  padding: 15px;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.linkColor};
  font-size: 18px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: none;
`;

const LoginFormLabel = styled("label")`
  margin-bottom: 10px;
`;

const LoginButtons = styled(Row)`
  margin-top: 20px;
  width: 300px;
  justify-content: space-around;
`;

const LoginFormButton = styled(Button)`
  height: 50px;
  width: 100px;
  margin-top: 15px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
`;

function Login() {
  const context = useContext(AppContext);
  const dispatch = context.dispatchMiddleware;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <LoginForm>
      <LoginFormLabel>Enter your username</LoginFormLabel>
      <LoginFormInput
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <LoginFormLabel>Enter your password</LoginFormLabel>
      <LoginFormInput
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButtons>
        <LoginFormButton
          onClick={() => dispatch(loginUser, username, password)}
        >
          Log in
        </LoginFormButton>
        <LoginFormButton
          onClick={() => {
            registerUser(username, password);
          }}
        >
          Sign in
        </LoginFormButton>
      </LoginButtons>
    </LoginForm>
  );
}

export default Login;
