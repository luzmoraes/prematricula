import api from '../api'
import { responsibleProps } from '../interfaces/responsible'
import { studentProps } from '../interfaces/student'
import { financialResponsibleProps } from '../interfaces/financialResponsible'

interface enrollmentProps {
  responsible: responsibleProps,
  student: studentProps,
  financial_responsible: financialResponsibleProps
}

export const insert = async (data: enrollmentProps) => {
  try {
    return await api.post('/api/enrollment');
  } catch (error) {
    return {success: false, codeError: error.response.status}
  }
}

export const formatData = (data: any) => {
  return {
    responsible: {
      cpf: data.responsibleCpf,
      rg: data.responsibleRg,
      relationship: data.responsibleRelationship,
      name: data.responsibleName,
      email: data.responsibleEmail,
      cep: data.responsibleCep,
      address: data.responsibleAddress,
      number: data.responsibleNumber,
      neighborhood: data.responsibleNeighborhood,
      city: data.responsibleCity,
      state: data.responsibleState,
      complement: data.responsibleComplement,
      nationality: data.responsibleNationality,
      profession: data.responsibleProfession
    },
    student: {
      name: data.studentName,
      birthday: data.studentBirthday,
      cpf: data.studentCpf,
      bloodType: data.studentBloodType,
      race_color: data.studentRaceColor,
      class: data.studentClass,
      allergic: data.studentAllergic,
      allergic_description: data.studentAllergicDescription,
      cep: data.studentCep,
      address: data.studentAddress,
      number: data.studentNumber,
      neighborhood: data.studentNeighborhood,
      city: data.studentCity,
      state: data.studentState,
      complement: data.studentComplement,
      father_name: data.studentFatherName,
      father_phone: data.studentFatherPhone,
      mother_name: data.studentMotherName,
      mother_phone: data.studentMotherPhone,
      authorized_responsibilities: data.studentAuthorizedResponsibilities
    },
    financial_responsible: {
      cpf: data.financialResponsibleCpf,
      name: data.financialResponsibleName,
      email: data.financialResponsibleEmail
    }
  }

}