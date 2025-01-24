import { SignUp } from '@clerk/nextjs';

const Signup = () => {
  return (
    <SignUp 
      path="/sign-up" 
      routing="path" 
      signInUrl="/sign-in" 
    />
  );
};

export default Signup;
