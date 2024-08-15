import useAuth from "@/context/AuthContext";
import apiFood from "@/services/apiFood";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Lock,
  Email,
  Wallet,
  Map,
  Phone,
  LocationCity,
  Streetview,
  House,
  Signpost,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface RegisterForm {
  email: string;
  password: string;
  name: string;
  cpf: string;
  cep: string;
  phone: string;
  city: string;
  street: string;
  number: number;
  address_complement: string;
}

interface Props {
  changeLoginType: VoidFunction;
}

export const Register = ({ changeLoginType }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Insira um E-mail válido").required("Escreva seu E-mail"),
    password: yup.string().required("Escreva sua senha"),
    name: yup.string().required("Escreva seu nome"),
    cpf: yup.string().required("Escreva seu CPF"),
    cep: yup.string().required("Escreva seu CEP"),
    phone: yup.number().required("Escreva seu telefone"),
    city: yup.string().required("Escreva sua cidade"),
    street: yup.string().required("Escreva sua rua"),
    number: yup.number().required("Escreva o número da sua casa"),
    address_complement: yup.string().required("Escreva o complemento do seu endereço"),
  });

  const formik = useFormik<RegisterForm>({
    initialValues: {
      email: "",
      password: "",
      name: "",
      cpf: "",
      cep: "",
      phone: "",
      city: "",
      street: "",
      number: 0,
      address_complement: "",
    },
    validationSchema,
    async onSubmit(...values) {
      try {
        await apiFood.post("/user", { ...values[0] });

        const response = await apiFood.post("/login", {
          email: values[0].email,
          password: values[0].password,
        });

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

  const fetchCep = async () => {
    if (formik.values.cep.length != 8) return;
    try {
      const result = await axios.get(`https://viacep.com.br/ws/${formik.values.cep}/json/`);
      formik.setFieldValue("city", result.data.localidade);
      formik.setFieldValue("street", result.data.logradouro);
      formik.setFieldValue("address_complement", result.data.complemento);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCep();
  }, [formik.values.cep]);

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
        <Typography variant="h4">Registro</Typography>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Email sx={{ color: "action.active", mr: 1, mt: 2 }} />

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

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <AccountCircle sx={{ color: "action.active", mr: 1, mt: 2 }} />

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-name">Nome</InputLabel>
            <Input
              id="standard-adornment-name"
              type={"text"}
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              error={formik?.touched?.name && formik?.errors?.name ? true : false}
            />
          </FormControl>
        </Box>
        {formik?.touched?.name && formik?.errors?.name && (
          <FormHelperText error>{formik?.errors?.name}</FormHelperText>
        )}

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Phone sx={{ color: "action.active", mr: 1, mt: 2 }} />

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-phone">Telefone</InputLabel>
            <Input
              id="standard-adornment-phone"
              type={"text"}
              value={formik.values.phone}
              onChange={(e) => formik.setFieldValue("phone", e.target.value)}
              error={formik?.touched?.phone && formik?.errors?.phone ? true : false}
            />
          </FormControl>
        </Box>
        {formik?.touched?.phone && formik?.errors?.phone && (
          <FormHelperText error>{formik?.errors?.phone}</FormHelperText>
        )}

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Wallet sx={{ color: "action.active", mr: 1, mt: 2 }} />

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-cpf">CPF</InputLabel>
            <Input
              id="standard-adornment-cpf"
              type={"text"}
              value={formik.values.cpf}
              onChange={(e) => formik.setFieldValue("cpf", e.target.value)}
              error={formik?.touched?.cpf && formik?.errors?.cpf ? true : false}
            />
          </FormControl>
        </Box>
        {formik?.touched?.cpf && formik?.errors?.cpf && (
          <FormHelperText error>{formik?.errors?.cpf}</FormHelperText>
        )}

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
            <Map sx={{ color: "action.active", mr: 1, mt: 2 }} />

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-cep">CEP</InputLabel>
              <Input
                id="standard-adornment-cep"
                type={"text"}
                value={formik.values.cep}
                onChange={(e) => formik.setFieldValue("cep", e.target.value)}
                error={formik?.touched?.cep && formik?.errors?.cep ? true : false}
              />
            </FormControl>
          </Box>
          {formik?.touched?.cep && formik?.errors?.cep && (
            <FormHelperText error>{formik?.errors?.cep}</FormHelperText>
          )}

          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
            <LocationCity sx={{ color: "action.active", mr: 1, mt: 2 }} />

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-city">Cidade</InputLabel>
              <Input
                id="standard-adornment-city"
                type={"text"}
                value={formik.values.city}
                onChange={(e) => formik.setFieldValue("city", e.target.value)}
                error={formik?.touched?.city && formik?.errors?.city ? true : false}
              />
            </FormControl>
          </Box>
          {formik?.touched?.city && formik?.errors?.city && (
            <FormHelperText error>{formik?.errors?.city}</FormHelperText>
          )}
        </Box>

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
            <Streetview sx={{ color: "action.active", mr: 1, mt: 2 }} />

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-street">Rua</InputLabel>
              <Input
                id="standard-adornment-street"
                type={"text"}
                value={formik.values.street}
                onChange={(e) => formik.setFieldValue("street", e.target.value)}
                error={formik?.touched?.street && formik?.errors?.street ? true : false}
              />
            </FormControl>
          </Box>
          {formik?.touched?.street && formik?.errors?.street && (
            <FormHelperText error>{formik?.errors?.street}</FormHelperText>
          )}

          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
            <House sx={{ color: "action.active", mr: 1, mt: 2 }} />

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-number">Número da casa</InputLabel>
              <Input
                id="standard-adornment-number"
                type={"text"}
                value={formik.values.number}
                onChange={(e) => formik.setFieldValue("number", e.target.value)}
                error={formik?.touched?.number && formik?.errors?.number ? true : false}
              />
            </FormControl>
          </Box>
          {formik?.touched?.number && formik?.errors?.number && (
            <FormHelperText error>{formik?.errors?.number}</FormHelperText>
          )}
        </Box>

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
          <Signpost sx={{ color: "action.active", mr: 1, mt: 2 }} />

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-address_complement">Complemento</InputLabel>
            <Input
              id="standard-adornment-address_complement"
              type={"text"}
              value={formik.values.address_complement}
              onChange={(e) => formik.setFieldValue("address_complement", e.target.value)}
              error={
                formik?.touched?.address_complement && formik?.errors?.address_complement
                  ? true
                  : false
              }
            />
          </FormControl>
        </Box>
        {formik?.touched?.address_complement && formik?.errors?.address_complement && (
          <FormHelperText error>{formik?.errors?.address_complement}</FormHelperText>
        )}

        <Button sx={{ mt: 3 }} fullWidth variant="contained" onClick={() => formik.submitForm()}>
          Registrar-se
        </Button>
      </Box>
      <Box display={"flex"} mt={2} justifyContent={"center"}>
        <Typography>Já tem uma conta ? &nbsp;</Typography>
        <Link component="button" onClick={changeLoginType} underline="none" fontFamily={"Roboto"}>
          Entre
        </Link>
      </Box>
    </Box>
  );
};
