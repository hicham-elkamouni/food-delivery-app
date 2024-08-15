import useAuth from "@/context/AuthContext";
import apiFood from "@/services/apiFood";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { AccountCircle, Lock, VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Input,
  IconButton,
  InputAdornment,
  InputLabel,
  FormHelperText,
  Typography,
  Link,
} from "@mui/material";

interface LoginForm {
  email: string;
  password: string;
}

interface Props {
  changeLoginType: VoidFunction;
}

export const Login = ({ changeLoginType }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Insira um E-mail válido").required("Escreva seu E-mail"),
    password: yup.string().required("Escreva sua senha"),
  });

  const formik = useFormik<LoginForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    async onSubmit(values) {
      try {
        const response = await apiFood.post("/login", { ...values });
        authenticate({
          token: response.data.token,
          email: response.data.email,
          id: response.data.id,
        });
      } catch (error) {
        console.error(error);
      }

      if ("loginok") navigate("/menu");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid lightgrey",
          p: 5,
          borderRadius: 5,
          width: "50%",
        }}
      >
        <Typography variant="h4">Login</Typography>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <AccountCircle sx={{ color: "action.active", mr: 1, mt: 2 }} />

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-email">E-mail</InputLabel>
            <Input
              id="standard-adornment-email"
              type={"text"}
              value={formik.values.email}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              error={formik?.touched?.email && formik?.errors?.email ? true : false}
            />
          </FormControl>
        </Box>
        {formik?.touched?.email && formik?.errors?.email && (
          <FormHelperText error>{formik?.errors?.email}</FormHelperText>
        )}

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Lock sx={{ color: "action.active", mr: 1, mt: 2 }} />

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
              error={formik?.touched?.password && formik?.errors?.password ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((old) => !old)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        {formik?.touched?.password && formik?.errors?.password && (
          <FormHelperText error>{formik?.errors?.password}</FormHelperText>
        )}

        <Button sx={{ mt: 3 }} fullWidth variant="contained" onClick={() => formik.submitForm()}>
          Entrar
        </Button>
      </Box>
      <Box display={"flex"} mt={2} justifyContent={"center"}>
        <Typography>Não tem uma conta? &nbsp;</Typography>
        <Link component="button" onClick={changeLoginType} underline="none" fontFamily={"Roboto"}>
          Cadastre-se
        </Link>
      </Box>
    </Box>
  );
};
