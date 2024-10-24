import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { BackgroundImgAuth } from './BackgroundImgAuth'
import { SignInWithGoogle } from './SiginWithGoogle'

export const Signin = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <BackgroundImgAuth />
      <form className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-lg rounded-lg flex flex-col justify-center relative z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign in to continue
        </h2>
        <div className="grid w-full gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-gray-700" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="text-gray-700" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
            />
          </div>

          <Button className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 transition duration-200 rounded-md">
            Sign In
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
