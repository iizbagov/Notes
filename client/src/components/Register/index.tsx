import styled from "@emotion/styled";
import { useContext } from "react";
import { registerUser } from "../../store";
import { centerAbsoluteCss } from "../common/Position";
import { AppContext } from "../Context";
import { useFormik } from "formik";
import { AppLink } from "../common/AppLink";
import { Column } from "../common/Flex";
import ThemeToggler from "../common/Toggler";
import { useDarkMode } from "../../useDarkModeHook";
import * as Yup from "yup";
import colors from "../common/colors";
import { useHistory } from "react-router";

const FormWrapper = styled(Column)`
  position: relative;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.mainBackground};
`;

const StyledRegisterForm = styled("form")`
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

const RegisterSection = styled(Column)`
  position: relative;
  margin-bottom: 5px;
`;

const RegisterFormInput = styled("input")`
  padding: 15px;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.linkColor};
  font-size: 18px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: none;
`;

const RegisterFormLabel = styled("label")`
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

const RegisterFormButton = styled("button")`
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
  margin: 10px 0 5px;
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

function RegisterForm() {
  const context = useContext(AppContext);
  const dispatch = context.dispatchMiddleware;
  const history = useHistory();
  const [_, toggleTheme] = useDarkMode();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(registerUser, values.username, values.password);
      history.push("/");
    },
  });
  return (
    <FormWrapper>
      <ThemeToggler onClick={toggleTheme} />
      <StyledRegisterForm onSubmit={formik.handleSubmit}>
        <RegisterSection>
          <RegisterFormLabel htmlFor="username=">Username</RegisterFormLabel>
          <RegisterFormInput
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
        </RegisterSection>
        <RegisterSection>
          <RegisterFormLabel htmlFor="password">Password</RegisterFormLabel>
          <RegisterFormInput
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
        </RegisterSection>
        <RegisterLink>
          Go to <StyledLink to="/">Log in</StyledLink>
        </RegisterLink>
        <RegisterFormButton type="submit">Sign up</RegisterFormButton>
      </StyledRegisterForm>
    </FormWrapper>
  );
}

export default RegisterForm;
