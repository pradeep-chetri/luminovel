"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-background px-4",
        className,
      )}
      {...props}
    >
      <div className="flex w-full max-w-xl flex-col  gap-6">
        <Card className="overflow-hidden p-0 shadow-md">
          <CardContent className="">
            <form className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center mb-4">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account to continue
                  </p>
                </div>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </Field>

                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm text-primary underline-offset-2 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </Field>

                <Field>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </Field>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>

                <Field className="grid grid-cols-3 gap-4">
                  {/* Apple */}
                  <Button variant="outline" type="button" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M16.365 1.43c0 1.14-.456 2.22-1.21 3.02-.79.84-2.1 1.48-3.16 1.38-.14-1.08.41-2.22 1.13-3.02.79-.84 2.11-1.46 3.24-1.53.02.05.02.1.02.15zm3.41 16.67c-.74 1.63-1.65 3.26-3.03 3.29-1.33.03-1.76-.86-3.29-.86s-2.02.83-3.3.88c-1.33.05-2.35-1.48-3.1-3.11C5.23 15.73 4.7 11.25 6.55 8.8c.91-1.22 2.34-1.99 3.73-2.01 1.37-.03 2.67.92 3.29.92.61 0 2.28-1.14 3.85-.97.65.03 2.48.27 3.65 2.05-.09.06-2.18 1.27-2.16 3.76.02 2.99 2.63 3.98 2.66 3.99z" />
                    </svg>
                    <span className="sr-only">Login with Apple</span>
                  </Button>

                  {/* Google */}
                  <Button variant="outline" type="button" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    <span className="sr-only">Login with Google</span>
                  </Button>

                  {/* Meta */}
                  <Button variant="outline" type="button" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303z" />
                    </svg>
                    <span className="sr-only">Login with Meta</span>
                  </Button>
                </Field>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a
                    href="#"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    Sign up
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <FieldDescription className="px-6 text-center text-sm text-muted-foreground">
          By logging in, you agree to our{" "}
          <a
            href="#"
            className="text-primary underline-offset-2 hover:underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-primary underline-offset-2 hover:underline"
          >
            Privacy Policy
          </a>
          .
        </FieldDescription>
      </div>
    </div>
  );
}
