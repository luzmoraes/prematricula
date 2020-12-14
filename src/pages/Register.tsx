import { Box, Button, Card, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Switch, TextareaAutosize, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import { useApp } from '../context/App'

import MaskedInput from 'react-text-mask'

import '../styles/pages/register.css'

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

  const { setTitle } = useApp()

  useEffect(() => {
    setTitle('PRÉ-MATRÍCULA')
  })

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
    studentAllergicDescription: yup
      .string()
      .when('studentAllergic', {
        is: (studentAllergic) => studentAllergic,
        then: yup
          .string()
          .required('A descrição da alergia é obrigatória.')
      }),
  })

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  const raceColorTypes = ["Branca", "Preta", "Parda", "Amarela", "Indigena", "Sem informação"]

  const studentClasses = ["Maternal I","Maternal II","Pré I","Pré II","Primeiro ano","Segundo ano","Terceiro ano","Quarto ano","Quinto ano","Sexto ano","Sétimo ano","Oitavo ano","Nono ano"]

  return (
    <div className="content register-content">
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
          studentAllergic: false,
          studentAllergicDescription: ''
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
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="responsibleCpf" error={(!!errors.responsibleCpf && !!touched.responsibleCpf) && !!errors.responsibleCpf}>CPF</InputLabel>
                    <OutlinedInput
                      id="responsibleCpf"
                      value={values.responsibleCpf}
                      onChange={handleChange}
                      label="CPF"
                      inputComponent={CpfMaskCustom as any}
                      error={(!!errors.responsibleCpf && !!touched.responsibleCpf) && !!errors.responsibleCpf}
                    />
                    <FormHelperText className="Mui-error">{(errors.responsibleCpf && touched.responsibleCpf) && errors.responsibleCpf}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
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
                    error={(!!errors.responsibleName && !!touched.responsibleName) && !!errors.responsibleName}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                    error={(!!errors.responsibleEmail && !!touched.responsibleEmail) && !!errors.responsibleEmail}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Card>
            <Card className="block">
              <h3>DADOS DO ALUNO</h3>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
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
                    error={(!!errors.studentName && !!touched.studentName) && !!errors.studentName}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="studentCpf" error={!!errors.studentCpf}>CPF</InputLabel>
                    <OutlinedInput
                      id="studentCpf"
                      value={values.studentCpf}
                      onChange={handleChange}
                      label="CPF"
                      inputComponent={CpfMaskCustom as any}
                      error={(!!errors.studentCpf && !!touched.studentCpf) && !!errors.studentCpf}
                    />
                    <FormHelperText className="Mui-error">{(errors.studentCpf && touched.studentCpf) && errors.studentCpf}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="studentBirthday" error={(!!errors.studentBirthday && !!touched.studentBirthday) && !!errors.studentBirthday}>Data de Nascimento</InputLabel>
                    <OutlinedInput
                      id="studentBirthday"
                      value={values.studentBirthday}
                      onChange={handleChange}
                      label="Data de Nascimento"
                      inputComponent={BirthdayMaskCustom as any}
                      error={(!!errors.studentBirthday && !!touched.studentBirthday) && !!errors.studentBirthday}
                    />
                    <FormHelperText className="Mui-error">{(!!errors.studentBirthday && !!touched.studentBirthday) && errors.studentBirthday}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="student-blood-type"
                    select
                    variant="outlined"
                    fullWidth
                    label="Tipo Sanguíneo"
                    value={values.studentBloodType}
                    onChange={handleChange("studentBloodType")}
                    error={(!!errors.studentBloodType && !!touched.studentBloodType) && !!errors.studentBloodType}
                  >
                    {bloodTypes.map(val => <MenuItem value={val} key={val}>{val}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="student-race-color"
                    select
                    variant="outlined"
                    fullWidth
                    label="Raça/Cor"
                    value={values.studentRaceColor}
                    onChange={handleChange("studentRaceColor")}
                    error={(!!errors.studentRaceColor && !!touched.studentRaceColor) && !!errors.studentRaceColor}
                  >
                    {raceColorTypes.map(val => <MenuItem value={val} key={val}>{val}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="studentClass"
                    select
                    variant="outlined"
                    fullWidth
                    label="Turma"
                    value={values.studentClass}
                    onChange={handleChange("studentClass")}
                    error={(!!errors.studentClass && !!touched.studentClass) && !!errors.studentClass}
                  >
                    {studentClasses.map(val => <MenuItem value={val} key={val}>{val}</MenuItem>)}
                  </TextField>
                  <FormHelperText className="Mui-error">{(errors.studentClass && touched.studentClass) && errors.studentClass}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                {values.studentAllergic && (
                <Grid item xs={12}>
                  <TextField
                    id="studentAllergicDescription"
                    name="studentAllergicDescription"
                    label="Descrição alérgica"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    multiline
                    onChange={handleChange}
                    value={values.studentAllergicDescription}
                    helperText={(errors.studentAllergicDescription && touched.studentAllergicDescription) && errors.studentAllergicDescription}
                    error={(!!errors.studentAllergicDescription && !!touched.studentAllergicDescription) && !!errors.studentAllergicDescription}
                    margin="normal"
                  />
                </Grid>
                )}
              </Grid>
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
    </div>
  )
}

export default Register