import { Button, Input } from "@heroui/react";
import {
  ArrowRight,
  BookOpen,
  KeyRound,
  LibraryBig,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
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

            <div className="booknook-login-fields">
              <div className="booknook-login-field">
                <label htmlFor="login-email">Email address</label>
                <div className="booknook-login-input-wrap">
                  <Mail size={18} aria-hidden="true" />
                  <Input
                    className="booknook-login-input"
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-label="Email address"
                  />
                </div>
              </div>

              <div className="booknook-login-field">
                <label htmlFor="login-password">Password</label>
                <div className="booknook-login-input-wrap">
                  <LockKeyhole size={18} aria-hidden="true" />
                  <Input
                    className="booknook-login-input"
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-label="Password"
                  />
                </div>
              </div>
            </div>

            <div className="booknook-login-forgot-row">
              <span className="booknook-login-forgot">Forgot password?</span>
            </div>

            <div className="booknook-login-actions">
              <Button
                className="booknook-login-submit"
                type="button"
                variant="primary"
                size="lg"
              >
                Login
                <ArrowRight size={17} aria-hidden="true" />
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
