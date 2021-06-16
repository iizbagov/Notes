import styled from "@emotion/styled";
import { useContext } from "react";
import { loginUser } from "../../store";
import { centerAbsoluteCss } from "../common/Position";
import { AppContext } from "../Context";
import { useFormik } from "formik";
import { AppLink } from "../common/AppLink";
import * as Yup from "yup";
import colors from "../common/colors";
import { Column } from "../common/Flex";
import ThemeToggler from "../common/Toggler";
import { useDarkMode } from "../../useDarkModeHook";
import { useHistory } from "react-router";

const FormWrapper = styled(Column)`
  position: relative;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.mainBackground};
`;

const StyledLoginForm = styled("form")`
  height: 500px;
  width: 400px;
  background-color: ${({ theme }) => theme.noteBgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${centerAbsoluteCss}
  border-radius: 10px;
`;

const LoginSection = styled(Column)`
  position: relative;
  margin-bottom: 5px;
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
  margin: 10px 0 5px;
`;

const ErrorMessage = styled("div")`
  margin: -10px 0px 5px;
  font-size: 12px;
  color: ${colors.errorMessageColor};
  font-weight: 500;
  position: absolute;
  top: 105px;
`;

const LoginFormButton = styled("button")`
  height: 50px;
  width: 100px;
  margin-top: 15px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.buttonColor};
  color: ${({ theme }) => theme.mainBackground};
  cursor: pointer;
`;

const RegisterLink = styled("div")`
  margin-bottom: 5px;
  margin-top: 10px;
`;

const StyledLink = styled(AppLink)`
  color: ${({ theme }) => theme.buttonColor};
  &:hover {
    text-decoration: underline;
  }
`;

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required Input"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required Password"),
});

function LoginForm() {
  const context = useContext(AppContext);
  const dispatch = context.dispatchMiddleware;
  const [, toggleTheme] = useDarkMode();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      await dispatch(loginUser, values.username, values.password);
      history.push("/notes");
    },
  });
  return (
    <FormWrapper>
      <ThemeToggler onClick={toggleTheme} />
      <StyledLoginForm onSubmit={formik.handleSubmit}>
        <LoginSection>
          <LoginFormLabel htmlFor="username=">Username</LoginFormLabel>
          <LoginFormInput
            placeholder="username"
            id="username"
            name="username"
            type="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username ? (
            <ErrorMessage>{formik.errors.username}</ErrorMessage>
          ) : null}
        </LoginSection>
        <LoginSection>
          <LoginFormLabel htmlFor="password">Password</LoginFormLabel>
          <LoginFormInput
            placeholder="password"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          ) : null}
        </LoginSection>
        <RegisterLink>
          Not yet registered? Go to{" "}
          <StyledLink to="/register">Sign up</StyledLink>
        </RegisterLink>
        <LoginFormButton type="submit">Log in</LoginFormButton>
      </StyledLoginForm>
    </FormWrapper>
  );
}

export default LoginForm;
