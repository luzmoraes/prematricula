import { Box, Button, Card, Container, TextField } from '@material-ui/core'
import React, { FormEvent, useState } from 'react'
import * as yup from 'yup'

import '../styles/pages/register.css'

import logoImage from '../images/logo-censf-white.png'

const Register = () => {
  const [responsibleName, setResponsibleName] = useState('')
  const [studentName, setStudentName] = useState('')

  const formSchema = yup.object().shape({
    responsible_name: yup
      .string()
      .required(),
    student_name: yup
      .string()
      .required()
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const formData = {
      responsible_name: responsibleName,
      student_name: studentName
    }

    formSchema
      .isValid(formData)
      .then(valid => {
        console.log('valid', valid)
      })
      .catch(err => {
        console.log('err', err)
      })

    // console.log(responsibleName)
    // console.log(studentName)
  }

  return (
    <>
      <div className="header">
        <img src={logoImage} alt="CENSF"/>
        <h3>PRÉ-MATRÍCULA</h3>
      </div>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit} className="formRegister" noValidate autoComplete="off">
          <Card className="block">
            <h3>DADOS DO RESPONSÁVEL</h3>
            <TextField
              id="student_name"
              name="student_name"
              label="Nome"
              variant="outlined"
              size="medium"
              fullWidth
              onChange={e => setResponsibleName(e.target.value)}
            />
          </Card>
          <Card className="block">
            <h3>DADOS DO ALUNO</h3>
            <TextField
              id="student_name"
              label="Nome"
              variant="outlined"
              size="medium"
              fullWidth
              onChange={e => setStudentName(e.target.value)}
            />
          </Card>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="medium"
            fullWidth
          >
            Realizar pré matrícula
          </Button>
        </form>
      </Container>
    </>
  )
}

export default Register