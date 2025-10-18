import { LoginForm } from "@/features/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";


export default async function Page() {
    await requireUnauth();
    return (
        <div>
            <LoginForm />
        </div>
    )
}