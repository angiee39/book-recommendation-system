import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {LoginForm} from "./login-form";
import {SignupForm} from "./signup-form";

export function LoginSignupTab() {
    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Log into you account to see your task.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <LoginForm/>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="sign-up">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>
                            Fill the details below to create a new account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <SignupForm/>
                    </CardContent>
                </Card>
            </TabsContent>
            {/*<TabsContent value="reset-password">*/}
            {/*    <Card>*/}
            {/*        <CardHeader>*/}
            {/*            <CardTitle>Reset Password</CardTitle>*/}
            {/*            <CardDescription>*/}
            {/*                Fill the details below to reset your password.*/}
            {/*            </CardDescription>*/}
            {/*        </CardHeader>*/}
            {/*        <CardContent className="space-y-2">*/}
            {/*            <SignupForm/>*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}
            {/*</TabsContent>*/}
        </Tabs>
    )
}
