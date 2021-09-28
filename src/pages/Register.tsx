import { Box, Button, Card, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Switch, TextField } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import { formatData, insert } from '../services/enrollment'
import { searchAddressFromCep } from '../services/address'
import { useApp } from '../context/App'

import MaskedInput from 'react-text-mask'

import '../styles/pages/register.css'

import { responsibleProps } from '../interfaces/responsible'
import { studentProps } from '../interfaces/student'
import { financialResponsibleProps } from '../interfaces/financialResponsible'
import { addressProps } from '../interfaces/address'

interface enrollmentProps {
  responsible: responsibleProps,
  student: studentProps,
  financial_responsible: financialResponsibleProps
}

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

const CepMaskCustom = (props: MaskCustomProps) => {
  const { inputRef, ...other } = props

  return (
    <MaskedInput 
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
    />
  )
}

const Register = () => {

  const { setTitle } = useApp()

  useEffect(() => {
    setTitle('PRÉ-MATRÍCULA')
  })

  const responsibleAddressNumberRef = useRef<HTMLInputElement>(null)
  const studentAddressNumberRef = useRef<HTMLInputElement>(null)

  const searchAddress = async (strCep: string, setFieldValue: any, searchTo: string) => {
    const cep = strCep.replace(/[^0-9]/g,'')
    if (cep.length === 8) {
      const { data } = await searchAddressFromCep(cep);
      
      if (!data.hasOwnProperty('erro')) {
        if (searchTo === 'responsible') {
          setFieldValue('responsibleAddress', data.logradouro)
          setFieldValue('responsibleNeighborhood', data.bairro)
          setFieldValue('responsibleCity', data.localidade)
          setFieldValue('responsibleState', data.uf)
          responsibleAddressNumberRef.current?.focus()
        } else if (searchTo === 'student') {
          setFieldValue('studentAddress', data.logradouro)
          setFieldValue('studentNeighborhood', data.bairro)
          setFieldValue('studentCity', data.localidade)
          setFieldValue('studentState', data.uf)
          studentAddressNumberRef.current?.focus()
        }
      }
    }
  }

  const cloneAddress = (data: addressProps, setFieldValue: any) => {
    setFieldValue('studentCep', data.cep)
    setFieldValue('studentAddress', data.address)
    setFieldValue('studentNeighborhood', data.neighborhood)
    setFieldValue('studentCity', data.city)
    setFieldValue('studentState', data.state)
    setFieldValue('studentNumber', data.number)
    setFieldValue('studentComplement', data.complement)
  }

  const cloneResponsible = (data: financialResponsibleProps, setFieldValue: any) => {
    setFieldValue('financialResponsibleCpf', data.cpf)
    setFieldValue('financialResponsibleName', data.name)
    setFieldValue('financialResponsibleEmail', data.email)
  }

  const validationSchema = yup.object().shape({
    responsibleCpf: yup
      .string()
      .required('O CPF do responsável é obrigatório.'),
    responsibleRg: yup
      .string()
      .max(15, 'O RG do responsável deve ter no máximo 15 caracteres'),
    responsibleRelationship: yup
      .string()
      .required('Informe o grau de parentesco')
      .max(15, 'O campo relacionamento deve ter no máximo 15 caracteres'),
    responsibleName: yup
      .string()
      .required('O nome do responsável é obrigatório.')
      .max(255, 'O nome do responsável deve ter no máximo 255 caracteres'),
    responsibleEmail: yup
      .string()
      .email('O email informado é inválido.')
      .max(255, 'O email deve ter no máximo 255 caracteres'),
    responsibleCep: yup
      .string()
      .required('O Cep é obrigatório'),
    responsibleAddress: yup
      .string()
      .required('O endereço é obrigatório.')
      .max(255, 'O endereço deve ter no máximo 255 caracteres'),
    responsibleNumber: yup
      .string()
      .required('O número é obrigatório.')
      .max(10, 'O número deve ter no máximo 10 caracteres'),
    responsibleNeighborhood: yup
      .string()
      .required('O bairro é obrigatório.')
      .max(255, 'O bairro deve ter no máximo 255 caracteres'),
    responsibleCity: yup
      .string()
      .required('A cidade é obrigatória.')
      .max(255, 'A cidade deve ter no máximo 255 caracteres'),
    responsibleState: yup
      .string()
      .required('O estado é obrigatório.')
      .max(2, 'O estado deve ter no máximo 2 caracteres'),
    responsibleComplement: yup
      .string()
      .max(255, 'O complemento deve ter no máximo 255 caracteres'),
    responsibleNationality: yup
      .string()
      .required('A nacionalidade é obrigatória.')
      .max(255, 'A necionalidade deve ter no máximo 255 caracteres')
      .default('Brasileiro'),
    responsibleProfession: yup
      .string()
      .required('A profissão é obrigatória.')
      .max(255, 'A profissão deve ter no máximo 255 caracteres'),
    studentName: yup
      .string()
      .required('O nome do aluno é obrigatório.')
      .max(255, 'O nome do aluno deve ter no máximo 255 caracteres'),
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
      })
      .max(255, 'O nome do aluno deve ter no máximo 255 caracteres'),
    studentCep: yup
      .string()
      .required('O Cep é obrigatório'),
    studentAddress: yup
      .string()
      .required('O endereço é obrigatório.')
      .max(255, 'O endereço deve ter no máximo 255 caracteres'),
    studentNumber: yup
      .string()
      .required('O número é obrigatório.')
      .max(10, 'O número deve ter no máximo 10 caracteres'),
    studentNeighborhood: yup
      .string()
      .required('O bairro é obrigatório.')
      .max(255, 'O bairro deve ter no máximo 255 caracteres'),
    studentCity: yup
      .string()
      .required('A cidade é obrigatória.')
      .max(255, 'A cidade deve ter no máximo 255 caracteres'),
    studentState: yup
      .string()
      .required('O estado é obrigatório.')
      .max(2, 'O estado deve ter no máximo 2 caracteres'),
    studentComplement: yup
      .string()
      .max(255, 'O complemento deve ter no máximo 255 caracteres'),
      studentFatherName: yup
      .string()
      .required('O nome do pai é obrigatório.')
      .max(255, 'O nome do pai deve ter no máximo 255 caracteres'),
      studentFatherPhone: yup
      .string()
      .max(15, 'O telefone do pai deve ter no máximo 15 caracteres'),
    studentMotherName: yup
      .string()
      .required('O nome do pai é obrigatório.')
      .max(255, 'O nome do pai deve ter no máximo 255 caracteres'),
    studentMotherPhone: yup
      .string()
      .max(15, 'O telefone da mãe deve ter no máximo 15 caracteres'),
    studentAuthorizedResponsibilities: yup
      .string()
      .max(255, 'Os responsaveis autorizados deve ter no máximo 255 caracteres'),
    financialResponsibleCpf: yup
      .string()
      .required('O CPF do responsável financeiro é obrigatório.'),
    financialResponsibleName: yup
      .string()
      .required('O nome do responsável financeiro é obrigatório.')
      .max(255, 'O nome do responsável financeiro deve ter no máximo 255 caracteres'),
    financialResponsibleEmail: yup
      .string()
      .email('O email informado é inválido.')
      .max(255, 'O email deve ter no máximo 255 caracteres'),
  })

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  const raceColorTypes = ["Branca", "Preta", "Parda", "Amarela", "Indigena", "Sem informação"]

  const studentClasses = ["Maternal I","Maternal II","Pré I","Pré II","Primeiro ano","Segundo ano","Terceiro ano","Quarto ano","Quinto ano","Sexto ano","Sétimo ano","Oitavo ano","Nono ano"]

  const relationshipList = ["Mãe", "Pai", "Avó", "Avô", "Tia", "Tio", "Irmã", "Irmão", "Madrasta", "Padrasto", "Prima", "Primo", "Outro"]

  return (
    <div className="content register-content">
      <Formik
        initialValues={{
          responsibleCpf: '',
          responsibleRg: '',
          responsibleRelationship: '',
          responsibleName: '',
          responsibleEmail: '',
          responsibleCep: '',
          responsibleAddress: '',
          responsibleNumber: '',
          responsibleNeighborhood: '',
          responsibleCity: '',
          responsibleState: '',
          responsibleComplement: '',
          responsibleNationality: 'Brasileiro',
          responsibleProfession: '',
          studentName: '',
          studentBirthday: '',
          studentCpf: '',
          studentBloodType: '',
          studentRaceColor: '',
          studentClass: '',
          studentAllergic: false,
          studentAllergicDescription: '',
          studentCep: '',
          studentAddress: '',
          studentNumber: '',
          studentNeighborhood: '',
          studentCity: '',
          studentState: '',
          studentComplement: '',
          studentFatherName: '',
          studentFatherPhone: '',
          studentMotherName: '',
          studentMotherPhone: '',
          studentAuthorizedResponsibilities: '',
          financialResponsibleCpf: '',
          financialResponsibleName: '',
          financialResponsibleEmail: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {

          const data = formatData(values)
          const response = await insert(data);

          console.log(response)
          actions.setSubmitting(true)
          setTimeout(() => {
            actions.setSubmitting(false)
            actions.resetForm()
          }, 2000);
        }}
      >
        {({ handleSubmit, handleChange, handleReset, values, touched, dirty, isSubmitting, errors, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="formRegister" noValidate autoComplete="off">
            <Card className="block">
              <h3>DADOS DO RESPONSÁVEL</h3>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="responsibleCpf" error={(!!errors.responsibleCpf && !!touched.responsibleCpf) && !!errors.responsibleCpf}>CPF *</InputLabel>
                    <OutlinedInput
                      id="responsibleCpf"
                      value={values.responsibleCpf}
                      onChange={handleChange}
                      label="CPF *"
                      inputComponent={CpfMaskCustom as any}
                      error={(!!errors.responsibleCpf && !!touched.responsibleCpf) && !!errors.responsibleCpf}
                    />
                    <FormHelperText className="Mui-error">{(errors.responsibleCpf && touched.responsibleCpf) && errors.responsibleCpf}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="responsibleRg"
                    name="responsibleRg"
                    label="RG"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.responsibleRg}
                    helperText={(errors.responsibleRg && touched.responsibleRg) && errors.responsibleRg}
                    error={(!!errors.responsibleRg && !!touched.responsibleRg) && !!errors.responsibleRg}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="responsibleRelationship"
                    select
                    variant="outlined"
                    fullWidth
                    label="Grau de parentesco"
                    value={values.responsibleRelationship}
                    onChange={handleChange("responsibleRelationship")}
                    error={(!!errors.responsibleRelationship && !!touched.responsibleRelationship) && !!errors.responsibleRelationship}
                  >
                    {relationshipList.map(val => <MenuItem value={val} key={val}>{val}</MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="responsibleName"
                    name="responsibleName"
                    label="Nome *"
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

              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="responsibleCep" error={(!!errors.responsibleCep && !!touched.responsibleCep) && !!errors.responsibleCep}>CEP *</InputLabel>
                    <OutlinedInput
                      id="responsibleCep"
                      value={values.responsibleCep}
                      onChange={e => {
                        handleChange(e)
                        searchAddress(e.target.value, setFieldValue, 'responsible')
                      }}
                      label="CEP *"
                      inputComponent={CepMaskCustom as any}
                      error={(!!errors.responsibleCep && !!touched.responsibleCep) && !!errors.responsibleCep}
                    />
                    <FormHelperText className="Mui-error">{(errors.responsibleCep && touched.responsibleCep) && errors.responsibleCep}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="responsibleAddress"
                    name="responsibleAddress"
                    label="Endereço *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.responsibleAddress}
                    helperText={(errors.responsibleAddress && touched.responsibleAddress) && errors.responsibleAddress}
                    error={(!!errors.responsibleAddress && !!touched.responsibleAddress) && !!errors.responsibleAddress}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="responsibleNumber"
                    name="responsibleNumber"
                    inputRef={responsibleAddressNumberRef}
                    label="Número *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.responsibleNumber}
                    helperText={(errors.responsibleNumber && touched.responsibleNumber) && errors.responsibleNumber}
                    error={(!!errors.responsibleNumber && !!touched.responsibleNumber) && !!errors.responsibleNumber}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                  <TextField
                    id="responsibleNeighborhood"
                    name="responsibleNeighborhood"
                    label="Bairro *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.responsibleNeighborhood}
                    helperText={(errors.responsibleNeighborhood && touched.responsibleNeighborhood) && errors.responsibleNeighborhood}
                    error={(!!errors.responsibleNeighborhood && !!touched.responsibleNeighborhood) && !!errors.responsibleNeighborhood}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    id="responsibleCity"
                    name="responsibleCity"
                    label="Cidade *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.responsibleCity}
                    helperText={(errors.responsibleCity && touched.responsibleCity) && errors.responsibleCity}
                    error={(!!errors.responsibleCity && !!touched.responsibleCity) && !!errors.responsibleCity}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    id="responsibleState"
                    name="responsibleState"
                    label="Estado *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.responsibleState}
                    helperText={(errors.responsibleState && touched.responsibleState) && errors.responsibleState}
                    error={(!!errors.responsibleState && !!touched.responsibleState) && !!errors.responsibleState}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="responsibleComplement"
                    name="responsibleComplement"
                    label="Complemento"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.responsibleComplement}
                    helperText={(errors.responsibleComplement && touched.responsibleComplement) && errors.responsibleComplement}
                    error={(!!errors.responsibleComplement && !!touched.responsibleComplement) && !!errors.responsibleComplement}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="responsibleNationality"
                    name="responsibleNationality"
                    label="Nacionalidade *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.responsibleNationality}
                    helperText={(errors.responsibleNationality && touched.responsibleNationality) && errors.responsibleNationality}
                    error={(!!errors.responsibleNationality && !!touched.responsibleNationality) && !!errors.responsibleNationality}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="responsibleProfession"
                    name="responsibleProfession"
                    label="Profissão *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.responsibleProfession}
                    helperText={(errors.responsibleProfession && touched.responsibleProfession) && errors.responsibleProfession}
                    error={(!!errors.responsibleProfession && !!touched.responsibleProfession) && !!errors.responsibleProfession}
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
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Box mt={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      type="button"
                      size="medium"
                      onClick={() => cloneAddress({
                        cep: values.responsibleCep,
                        address: values.responsibleAddress,
                        neighborhood: values.responsibleNeighborhood,
                        city: values.responsibleCity,
                        state: values.responsibleState,
                        number: values.responsibleNumber,
                        complement: values.responsibleComplement
                      }, setFieldValue)}
                      disabled={!dirty || isSubmitting}
                    >
                      Mesmo endereço do responsável
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="responsibleCep" error={(!!errors.responsibleCep && !!touched.responsibleCep) && !!errors.responsibleCep}>CEP *</InputLabel>
                    <OutlinedInput
                      id="studentCep"
                      value={values.studentCep}
                      onChange={e => {
                        handleChange(e)
                        searchAddress(e.target.value, setFieldValue, 'student')
                      }}
                      label="CEP *"
                      inputComponent={CepMaskCustom as any}
                      error={(!!errors.studentCep && !!touched.studentCep) && !!errors.studentCep}
                    />
                    <FormHelperText className="Mui-error">{(errors.studentCep && touched.studentCep) && errors.studentCep}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="studentAddress"
                    name="studentAddress"
                    label="Endereço *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentAddress}
                    helperText={(errors.studentAddress && touched.studentAddress) && errors.studentAddress}
                    error={(!!errors.studentAddress && !!touched.studentAddress) && !!errors.studentAddress}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="studentNumber"
                    name="studentNumber"
                    inputRef={studentAddressNumberRef}
                    label="Número *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentNumber}
                    helperText={(errors.studentNumber && touched.studentNumber) && errors.studentNumber}
                    error={(!!errors.studentNumber && !!touched.studentNumber) && !!errors.studentNumber}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                  <TextField
                    id="studentNeighborhood"
                    name="studentNeighborhood"
                    label="Bairro *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentNeighborhood}
                    helperText={(errors.studentNeighborhood && touched.studentNeighborhood) && errors.studentNeighborhood}
                    error={(!!errors.studentNeighborhood && !!touched.studentNeighborhood) && !!errors.studentNeighborhood}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    id="studentCity"
                    name="studentCity"
                    label="Cidade *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentCity}
                    helperText={(errors.studentCity && touched.studentCity) && errors.studentCity}
                    error={(!!errors.studentCity && !!touched.studentCity) && !!errors.studentCity}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    id="studentState"
                    name="studentState"
                    label="Estado *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentState}
                    helperText={(errors.studentState && touched.studentState) && errors.studentState}
                    error={(!!errors.studentState && !!touched.studentState) && !!errors.studentState}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="studentComplement"
                    name="studentComplement"
                    label="Complemento"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentComplement}
                    helperText={(errors.studentComplement && touched.studentComplement) && errors.studentComplement}
                    error={(!!errors.studentComplement && !!touched.studentComplement) && !!errors.studentComplement}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="studentFatherName"
                    name="studentFatherName"
                    label="Nome do pai *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentFatherName}
                    helperText={(errors.studentFatherName && touched.studentFatherName) && errors.studentFatherName}
                    error={(!!errors.studentFatherName && !!touched.studentFatherName) && !!errors.studentFatherName}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="studentFatherPhone"
                    name="studentFatherPhone"
                    label="Telefone do pai"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentFatherPhone}
                    helperText={(errors.studentFatherPhone && touched.studentFatherPhone) && errors.studentFatherPhone}
                    error={(!!errors.studentFatherPhone && !!touched.studentFatherPhone) && !!errors.studentFatherPhone}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="studentMotherName"
                    name="studentMotherName"
                    label="Nome da mãe *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentMotherName}
                    helperText={(errors.studentMotherName && touched.studentMotherName) && errors.studentMotherName}
                    error={(!!errors.studentMotherName && !!touched.studentMotherName) && !!errors.studentMotherName}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="studentMotherPhone"
                    name="studentMotherPhone"
                    label="Telefone da mãe"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentMotherPhone}
                    helperText={(errors.studentMotherPhone && touched.studentMotherPhone) && errors.studentMotherPhone}
                    error={(!!errors.studentMotherPhone && !!touched.studentMotherPhone) && !!errors.studentMotherPhone}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="studentAuthorizedResponsibilities"
                    name="studentAuthorizedResponsibilities"
                    label="Responsaveis autorizados"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.studentAuthorizedResponsibilities}
                    helperText={(errors.studentAuthorizedResponsibilities && touched.studentAuthorizedResponsibilities) && errors.studentAuthorizedResponsibilities}
                    error={(!!errors.studentAuthorizedResponsibilities && !!touched.studentAuthorizedResponsibilities) && !!errors.studentAuthorizedResponsibilities}
                    margin="normal"
                  />
                </Grid>
              </Grid>

            </Card>

            <Card className="block">
              <h3>RESPONSÁVEL FINANCEIRO</h3>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Box mt={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      type="button"
                      size="medium"
                      onClick={() => cloneResponsible({
                        cpf: values.responsibleCpf,
                        name: values.responsibleName,
                        email: values.responsibleEmail,
                      }, setFieldValue)}
                      disabled={!dirty || isSubmitting}
                    >
                      Mesmo do responsável
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="financialResponsibleCpf" error={(!!errors.financialResponsibleCpf && !!touched.financialResponsibleCpf) && !!errors.financialResponsibleCpf}>CPF *</InputLabel>
                    <OutlinedInput
                      id="financialResponsibleCpf"
                      value={values.financialResponsibleCpf}
                      onChange={handleChange}
                      label="CPF *"
                      inputComponent={CpfMaskCustom as any}
                      error={(!!errors.financialResponsibleCpf && !!touched.financialResponsibleCpf) && !!errors.financialResponsibleCpf}
                    />
                    <FormHelperText className="Mui-error">{(errors.financialResponsibleCpf && touched.financialResponsibleCpf) && errors.financialResponsibleCpf}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="financialResponsibleName"
                    name="financialResponsibleName"
                    label="Nome *"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.financialResponsibleName}
                    helperText={(errors.financialResponsibleName && touched.financialResponsibleName) && errors.financialResponsibleName}
                    error={(!!errors.financialResponsibleName && !!touched.financialResponsibleName) && !!errors.financialResponsibleName}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="financialResponsibleEmail"
                    name="financialResponsibleEmail"
                    label="Email"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    onChange={handleChange}
                    value={values.financialResponsibleEmail}
                    helperText={(errors.financialResponsibleEmail && touched.financialResponsibleEmail) && errors.financialResponsibleEmail}
                    error={(!!errors.financialResponsibleEmail && !!touched.financialResponsibleEmail) && !!errors.financialResponsibleEmail}
                    margin="normal"
                  />
                </Grid>
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