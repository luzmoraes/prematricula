import { Box, Button, Card, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, OutlinedInput, Switch, TextField } from '@material-ui/core'
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import MaskedInput from 'react-text-mask'

import '../styles/pages/register.css'

import logoImage from '../images/logo-censf-white.png'

interface MaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void
}

const CpfMaskCustom = (props: MaskCustomProps) => {
  const { inputRef, ...other } = props

  return (
    <MaskedInput 
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
      // placeholder="CPF"
      // placeholderChar={'\u2000'}
      // showMask
    />
  )
}

const BirthdayMaskCustom = (props: MaskCustomProps) => {
  const { inputRef, ...other } = props

  return (
    <MaskedInput 
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
    />
  )
}

const Register = () => {

  const validationSchema = yup.object().shape({
    responsibleCpf: yup
      .string()
      .required('O CPF do responsável é obrigatório.'),
    responsibleName: yup
      .string()
      .required('O nome do responsável é obrigatório.'),
    responsibleEmail: yup
      .string()
      .email('O email informado é inválido.'),
    studentName: yup
      .string()
      .required('O nome do aluno é obrigatório.'),
    studentBirthday: yup
      .string()
      .required('A data de nascimento do aluno é obrigatório.'),
    studentCpf: yup
      .string(),
    studentBloodType: yup
      .string(),
    studentRaceColor: yup
      .string(),
    studentClass: yup
      .string()
      .required('A turma do aluno é obrigatória.'),
    studentAllergic: yup
      .boolean(),
    // studentAllergicDescription: yup
    //   .string()
    //   .when('studentAllergic', {
    //     is: (studentAllergic) => studentAllergic,
    //     then: yup
    //       .string()
    //       .required('A descrição da alergia é obrigatória.')
    //   }),
  })

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  const raceColorTypes = ["Branca", "Preta", "Parda", "Amarela", "Indigena", "Sem informação"]

  const studentClasses = ["Maternal I","Maternal II","Pré I","Pré II","Primeiro ano","Segundo ano","Terceiro ano","Quarto ano","Quinto ano","Sexto ano","Sétimo ano","Oitavo ano","Nono ano"]

  return (
    <>
      <div className="header">
        <img src={logoImage} alt="CENSF"/>
        <h3>PRÉ-MATRÍCULA</h3>
      </div>
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            responsibleCpf: '',
            responsibleName: '',
            responsibleEmail: '',
            studentName: '',
            studentBirthday: '',
            studentCpf: '',
            studentBloodType: '',
            studentRaceColor: '',
            studentClass: '',
            studentAllergic: false
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values)
            actions.setSubmitting(true)
            setTimeout(() => {
              actions.setSubmitting(false)
              actions.resetForm()
            }, 2000);
          }}
        >
          {({ handleSubmit, handleChange, handleReset, values, touched, dirty, isSubmitting, errors }) => (
            <form onSubmit={handleSubmit} className="formRegister" noValidate autoComplete="off">
              <Card className="block">
                <h3>DADOS DO RESPONSÁVEL</h3>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="responsibleCpf" error={!!errors.responsibleCpf}>CPF</InputLabel>
                  <OutlinedInput
                    id="responsibleCpf"
                    value={values.responsibleCpf}
                    onChange={handleChange}
                    label="CPF"
                    inputComponent={CpfMaskCustom as any}
                    error={!!errors.responsibleCpf}
                  />
                  <FormHelperText className="Mui-error">{errors.responsibleCpf}</FormHelperText>
                </FormControl>
                <TextField
                  id="responsibleName"
                  name="responsibleName"
                  label="Nome"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onChange={handleChange}
                  value={values.responsibleName}
                  helperText={(errors.responsibleName && touched.responsibleName) && errors.responsibleName}
                  error={!!errors.responsibleName}
                  margin="normal"
                />
                <TextField
                  id="responsibleEmail"
                  name="responsibleEmail"
                  label="Email"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onChange={handleChange}
                  value={values.responsibleEmail}
                  helperText={(errors.responsibleEmail && touched.responsibleEmail) && errors.responsibleEmail}
                  error={!!errors.responsibleEmail}
                  margin="normal"
                />
              </Card>
              <Card className="block">
                <h3>DADOS DO ALUNO</h3>
                <TextField
                  id="studentName"
                  name="studentName"
                  label="Nome"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onChange={handleChange}
                  value={values.studentName}
                  helperText={(errors.studentName && touched.studentName) && errors.studentName}
                  error={!!errors.studentName}
                  margin="normal"
                />
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="studentBirthday" error={!!errors.studentBirthday}>Data de Nascimento</InputLabel>
                  <OutlinedInput
                    id="studentBirthday"
                    value={values.studentBirthday}
                    onChange={handleChange}
                    label="Data de Nascimento"
                    inputComponent={BirthdayMaskCustom as any}
                    error={!!errors.studentBirthday}
                  />
                  <FormHelperText className="Mui-error">{errors.studentBirthday}</FormHelperText>
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="studentCpf" error={!!errors.studentCpf}>CPF</InputLabel>
                  <OutlinedInput
                    id="studentCpf"
                    value={values.studentCpf}
                    onChange={handleChange}
                    label="CPF"
                    inputComponent={CpfMaskCustom as any}
                    error={!!errors.studentCpf}
                  />
                  <FormHelperText className="Mui-error">{errors.studentCpf}</FormHelperText>
                </FormControl>
                <TextField
                  id="student-blood-type"
                  select
                  variant="outlined"
                  fullWidth
                  label="Tipo Sanguíneo"
                  value={values.studentBloodType}
                  onChange={handleChange("studentBloodType")}
                  error={!!errors.studentBloodType}
                >
                  {bloodTypes.map(val => <MenuItem value={val} key={val}>{val}</MenuItem>)}
                </TextField>
                <TextField
                  id="student-race-color"
                  select
                  variant="outlined"
                  fullWidth
                  label="Raça/Cor"
                  value={values.studentRaceColor}
                  onChange={handleChange("studentRaceColor")}
                  error={!!errors.studentRaceColor}
                >
                  {raceColorTypes.map(val => <MenuItem value={val} key={val}>{val}</MenuItem>)}
                </TextField>
                <TextField
                  id="student-race-color"
                  select
                  variant="outlined"
                  fullWidth
                  label="Turma"
                  value={values.studentClass}
                  onChange={handleChange("studentClass")}
                  error={!!errors.studentClass}
                >
                  {studentClasses.map(val => <MenuItem value={val} key={val}>{val}</MenuItem>)}
                </TextField>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.studentAllergic}
                        onChange={handleChange}
                        name="studentAllergic"
                        color="primary"
                      />
                    }
                    label="Alérgico"
                  />
                </FormGroup>
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
              <Box mt={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  size="medium"
                  fullWidth
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Cancelar
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default Register