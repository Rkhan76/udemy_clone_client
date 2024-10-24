import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { BackgroundImgAuth } from './BackgroundImgAuth'
import { SignInWithGoogle } from './SiginWithGoogle'

export const Signup = ({
  onSubmit,
  errorMessage,
  loading,
  formData,
  onInputChange,
}:any) => {
  console.log(errorMessage, " error message")
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <BackgroundImgAuth />
      <form
        className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-lg rounded-lg flex flex-col justify-center relative z-10"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign up and start learning
        </h2>
        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}
        <div className="grid w-full gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-gray-700" htmlFor="fullName">
              Full Name
            </Label>
            <Input
              type="text"
              id="fullName"
              name="fullname" // Add the name attribute
              value={formData.fullname} // Use the formData state
              onChange={onInputChange} // Handle input change
              placeholder="Full Name"
              className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="text-gray-700" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email" // Add the name attribute
              value={formData.email} // Use the formData state
              onChange={onInputChange} // Handle input change
              placeholder="Email"
              className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="text-gray-700" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password" // Add the name attribute
              value={formData.password} // Use the formData state
              onChange={onInputChange} // Handle input change
              placeholder="Password"
              className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
              required
            />
          </div>

          <Button className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 transition duration-200 rounded-md">
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8S4 7.582 4 12z"
                  />
                </svg>
                Loading...
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-600 text-opacity-50 text-md">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col items-center">
          <SignInWithGoogle />
        </div>
      </form>
    </div>
  )
}
