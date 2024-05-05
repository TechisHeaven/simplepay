import { BoxesCore } from "@/components/ui/background-boxes";
import SignupForm from "@/components/ui/signupForm";

export default function Register() {
  return (
    <div className="h-screen items-center flex w-full relative overflow-hidden">
      <BoxesCore />
      <SignupForm />
    </div>
  );
}
