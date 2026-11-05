"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Image as ImageIcon,
  LibraryBig,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { validatePassword } from "@/lib/auth-validation";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    try {
      await authClient.signUp.email({
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
        image: data.photoURL as string,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account created successfully.", {
              duration: 1500,

            });
            router.refresh();
            router.push('/');
          },
          onError: ({ error }) => {
            toast.error(error.message || "Registration failed. Please try again.");
          },
        },
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <section
      className="booknook-login-page booknook-register-page"
      aria-labelledby="register-title"
    >
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
            <p>A new chapter starts with a story you can call your own.</p>
            <span>Make yourself at home among the books.</span>
          </div>
        </div>

        <div className="booknook-login-form-panel">
          <div className="booknook-login-form-wrap">
            <div className="booknook-login-heading">
              <span className="booknook-login-heading-icon">
                <LibraryBig size={21} aria-hidden="true" />
              </span>
              <p className="booknook-eyebrow">Join the reading room</p>
              <h1 id="register-title">Create Your Account</h1>
              <p>
                Build your personal library and find a little more to read.
              </p>
            </div>

            <Form
              className="booknook-auth-form"
              validationBehavior="native"
              onSubmit={onSubmit}
            >
              <div className="booknook-login-fields booknook-register-fields">
                <TextField className="booknook-login-field" isRequired>
                  <Label htmlFor="register-name">Full name</Label>
                  <div className="booknook-login-input-wrap">
                    <UserRound size={18} aria-hidden="true" />
                    <Input
                      className="booknook-login-input"
                      id="register-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      aria-label="Full name"
                    />
                  </div>
                  <FieldError className="booknook-login-error" />
                </TextField>

                <TextField className="booknook-login-field" isRequired>
                  <Label htmlFor="register-email">Email address</Label>
                  <div className="booknook-login-input-wrap">
                    <Mail size={18} aria-hidden="true" />
                    <Input
                      className="booknook-login-input"
                      id="register-email"
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

                <TextField className="booknook-login-field">
                  <Label htmlFor="register-photo">Photo URL</Label>
                  <div className="booknook-login-input-wrap">
                    <ImageIcon size={18} aria-hidden="true" />
                    <Input
                      className="booknook-login-input"
                      id="register-photo"
                      name="photoURL"
                      type="url"
                      autoComplete="url"
                      placeholder="https://example.com/photo.jpg"
                      aria-label="Photo URL"
                    />
                  </div>
                  <FieldError className="booknook-login-error" />
                </TextField>

                <TextField
                  className="booknook-login-field"
                  isRequired
                  aria-label="Password"
                  validate={validatePassword}
                  isInvalid={
                    passwordValue ? Boolean(validatePassword(passwordValue)) : undefined
                  }
                >
                  <Label htmlFor="register-password">Password</Label>
                  <div className="booknook-login-input-wrap">
                    <LockKeyhole size={18} aria-hidden="true" />
                    <Input
                      className="booknook-login-input"
                      id="register-password"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      minLength={6}
                      pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}"
                      autoComplete="new-password"
                      placeholder="Create a password"
                      aria-label="Password"
                      aria-describedby="register-password-hint"
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
                  <p className="booknook-password-hint" id="register-password-hint">
                    Use at least 6 characters, including a lowercase letter, an uppercase letter,
                    and a number.
                  </p>
                  <FieldError className="booknook-login-error">
                    {passwordValue ? validatePassword(passwordValue) : undefined}
                  </FieldError>
                </TextField>
              </div>

              <div className="booknook-login-actions booknook-register-actions">
                <Button
                  className="booknook-login-submit"
                  type="submit"
                  variant="primary"
                  size="lg"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                  {!isSubmitting ? <ArrowRight size={17} aria-hidden="true" /> : null}
                </Button>

                <div className="booknook-login-divider">
                  <span>or sign up with</span>
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
                  Sign up with Google
                </Button>
              </div>
            </Form>

            <p className="booknook-login-register">
              Already have an account? <Link href="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
