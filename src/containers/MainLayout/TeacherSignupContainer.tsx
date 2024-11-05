import { TeacherRegistration } from '../../components/MainLayout/TeacherRegistration'
import { useTeacherSignup } from '../../hooks/MainLayout/useTeacherSignup'

const TeacherSignupContainer = () => {
  const { loading, error, handleTeacherRegistration } = useTeacherSignup()

  return (
    <TeacherRegistration
      loading={loading}
      error={error}
      onClick={handleTeacherRegistration}
    />
  )
}

export default TeacherSignupContainer
