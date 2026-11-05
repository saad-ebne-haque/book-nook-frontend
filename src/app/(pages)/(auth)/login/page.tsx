"use client";
import { toast } from "sonner";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  KeyRound,
  LibraryBig,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { validatePassword } from "@/lib/auth-validation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const callbackURL = new URLSearchParams(window.location.search).get("callbackURL") || "/";
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    try {
      await authClient.signIn.email({
        email: data.email as string,
        password: data.password as string,
        fetchOptions: {
          onSuccess: () => {
            const redirectURL = new URL(callbackURL, window.location.origin);
            const destination =
              redirectURL.origin === window.location.origin
                ? redirectURL.href
                : window.location.origin;
            const navigateToCallback = () => window.location.assign(destination);

            toast.success("Signed in successfully.", {
              duration: 1500,
              onAutoClose: navigateToCallback,
              onDismiss: navigateToCallback,
            });
            form.reset();
          },
          onError: ({ error }) => {
            toast.error(error.message || "Sign-in failed. Please try again.");
          },
        },
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Sign-in failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="booknook-login-page" aria-labelledby="login-title">
      <div className="booknook-login-layout">
        <div
          className="booknook-login-visual"
          role="img"
          aria-label="A cozy library with shelves of books and a quiet reading nook"
        >
          <div className="booknook-login-visual-top">
            <span className="booknook-login-mark">
              <BookOpen size={22} aria-hidden="true" />
            </span>
            <span>BOOKNOOK READING ROOM</span>
          </div>

          <div className="booknook-login-library" aria-hidden="true">
            <div className="booknook-login-library-window">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="booknook-login-shelf booknook-login-shelf-top">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="booknook-login-shelf booknook-login-shelf-bottom">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="booknook-login-reading-book">
              <BookOpen size={62} strokeWidth={1.2} />
            </div>
            <div className="booknook-login-library-plant">
              <span />
              <span />
              <span />
              <i />
            </div>
          </div>

          <div className="booknook-login-visual-copy">
            <Sparkles size={17} aria-hidden="true" />
            <p>Every great story begins with a little curiosity.</p>
            <span>Find a moment of calm between the pages.</span>
          </div>
        </div>

        <div className="booknook-login-form-panel">
          <div className="booknook-login-form-wrap">
            <div className="booknook-login-heading">
              <span className="booknook-login-heading-icon">
                <LibraryBig size={21} aria-hidden="true" />
              </span>
              <p className="booknook-eyebrow">Your reading room awaits</p>
              <h1 id="login-title">Welcome Back</h1>
              <p>
                Sign in to pick up where your next great story begins.
              </p>
            </div>

            <Form
              className="booknook-auth-form"
              validationBehavior="native"
              onSubmit={onSubmit}
            >
              <div className="booknook-login-fields">
                <TextField className="booknook-login-field" isRequired>
                  <Label htmlFor="login-email">Email address</Label>
                  <div className="booknook-login-input-wrap">
                    <Mail size={18} aria-hidden="true" />
                    <Input
                      className="booknook-login-input"
                      id="login-email"
                      name="email"
                      type="email"
                      pattern="[^@]+@[^@]+\.[^@]{2,}"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-label="Email address"
                      title="Enter a valid email address, such as you@example.com."
                    />
                  </div>
                  <FieldError className="booknook-login-error" />
                </TextField>

                <TextField
                  className="booknook-login-field"
                  isRequired
                  validate={validatePassword}
                  isInvalid={
                    passwordValue ? Boolean(validatePassword(passwordValue)) : undefined
                  }
                >
                  <Label htmlFor="login-password">Password</Label>
                  <div className="booknook-login-input-wrap">
                    <LockKeyhole size={18} aria-hidden="true" />
                    <Input
                      className="booknook-login-input"
                      id="login-password"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      minLength={6}
                      pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      aria-label="Password"
                      aria-describedby="login-password-hint"
                      title="Use at least 6 characters, including a lowercase letter, an uppercase letter, and a number."
                      onChange={(event) => setPasswordValue(event.currentTarget.value)}
                    />
                    <button
                      className="booknook-password-toggle"
                      type="button"
                      aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                      aria-pressed={isPasswordVisible}
                      onClick={() => setIsPasswordVisible((visible) => !visible)}
                    >
                      {isPasswordVisible ? (
                        <EyeOff size={17} aria-hidden="true" />
                      ) : (
                        <Eye size={17} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <p className="booknook-password-hint" id="login-password-hint">
                    Use at least 6 characters, including a lowercase letter, an uppercase letter,
                    and a number.
                  </p>
                  <FieldError className="booknook-login-error">
                    {passwordValue ? validatePassword(passwordValue) : undefined}
                  </FieldError>
                </TextField>
              </div>

              <div className="booknook-login-actions">
                <Button
                  className="booknook-login-submit"
                  type="submit"
                  variant="primary"
                  size="lg"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Login"}
                  {!isSubmitting ? <ArrowRight size={17} aria-hidden="true" /> : null}
                </Button>

                <div className="booknook-login-divider">
                  <span>or continue with</span>
                </div>

                <Button
                  className="booknook-login-google"
                  type="button"
                  variant="outline"
                  size="lg"
                >
                  <span
                    className="booknook-login-google-mark"
                    role="img"
                    aria-label="Google"
                  />
                  Login with Google
                </Button>
              </div>
            </Form>

            <p className="booknook-login-register">
              New to BookNook? <Link href="/register">Create an account</Link>
            </p>
            <span className="booknook-login-decorative-key" aria-hidden="true">
              <KeyRound size={15} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
