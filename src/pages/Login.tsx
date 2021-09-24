import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { Button, Card, Container, TextField } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import * as yup from 'yup'
import { login } from '../services/auth'
import { getAuthenticatedUser, setUser } from '../services/user';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import '../styles/pages/login.css'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    iconLoading: {
      color: '#ffffff',
      marginLeft: 10
    }
  })
)

const Login = () => {

  const classes = useStyles();

  let history = useHistory()

  const [message, setMessage] = useState('');

  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Informe o email.')
      .email('Email inválido'),
    password: yup
      .string()
      .required('Informe a senha.')
  })

  return (
    <div className="content login-content">
      <Container>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            const response = await login(values)

            if (response.success) {
              const user = await getAuthenticatedUser()
              setUser(user)
              history.push('/lista')
            } else {
              setMessage(response.codeError === 401
                ? 'Email ou senha inválidos, tente novamente.'
                : 'Erro interno de servidor, tente mais tarde.'
              )
              setShowAlert(true);
              setTimeout(() => { setShowAlert(false) }, 6000);
            }
          }}
        >
          {({ handleSubmit, handleChange, handleReset, values, touched, dirty, isSubmitting, errors }) => (
            <form onSubmit={handleSubmit} className="formLogin" noValidate autoComplete="off">
              <Card className="block">
                <h1>Área Administrativa</h1>
                <p>Informe os dados de acesso.</p>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onChange={handleChange}
                  value={values.email}
                  helperText={(errors.email && touched.email) && errors.email}
                  error={(!!errors.email && !!touched.email) && !!errors.email}
                  margin="normal"
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Senha"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onChange={handleChange}
                  value={values.password}
                  helperText={(errors.password && touched.password) && errors.password}
                  error={(!!errors.password && !!touched.password) && !!errors.password}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="medium"
                  fullWidth
                  className="btn-login"
                >
                  ACESSAR {isSubmitting && <CircularProgress size={20} className={classes.iconLoading} />}
                </Button>
                {showAlert &&
                  <Alert severity="error" className="alert">{message}</Alert>
                }
              </Card>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  )
}

export default Login