import { Button } from '../ui/button'
import TeacherBackground from '../../assets/teacherSignupBackground.jpg'

export const TeacherRegistration = ({ loading, error, onClick }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full h-full">
        <img
          src={TeacherBackground}
          alt="Teacher image"
          className="object-cover w-full h-full absolute top-0 left-0 z-0 opacity-90"
        />
        <div className="relative z-10 p-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Register as a Teacher
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button
            onClick={onClick}
            className={`mt-4 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Click to Register'}
          </Button>
        </div>
      </div>
    </div>
  )
}
