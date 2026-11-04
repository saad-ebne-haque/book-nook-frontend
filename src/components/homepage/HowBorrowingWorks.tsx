import { BookOpen, RotateCcw, Search } from "lucide-react";

export default function HowBorrowingWorks() {
  return (
    <section
      className="booknook-home-borrow-section"
      aria-labelledby="home-borrow-title"
    >
      <div className="booknook-home-borrow">
        <div className="booknook-home-section-heading booknook-home-centered-heading">
          <div>
            <p className="booknook-eyebrow">A few easy steps</p>
            <h2 id="home-borrow-title">How borrowing works</h2>
            <p className="booknook-home-section-intro">
              From first browse to the final page, finding a book is simple.
            </p>
          </div>
        </div>

        <ol className="booknook-home-steps">
          <li className="booknook-home-step">
            <div className="booknook-home-step-top">
              <span className="booknook-home-step-icon">
                <Search size={21} aria-hidden="true" />
              </span>
              <span className="booknook-home-step-number">01</span>
            </div>
            <h3>Discover Your Book</h3>
            <p>
              Browse the shelves and find a story, subject, or author that
              speaks to you.
            </p>
          </li>
          <li className="booknook-home-step">
            <div className="booknook-home-step-top">
              <span className="booknook-home-step-icon">
                <BookOpen size={21} aria-hidden="true" />
              </span>
              <span className="booknook-home-step-number">02</span>
            </div>
            <h3>Borrow Your Favorite</h3>
            <p>
              Choose the book you love and make it your next reading companion.
            </p>
          </li>
          <li className="booknook-home-step">
            <div className="booknook-home-step-top">
              <span className="booknook-home-step-icon">
                <RotateCcw size={21} aria-hidden="true" />
              </span>
              <span className="booknook-home-step-number">03</span>
            </div>
            <h3>Enjoy and Return</h3>
            <p>
              Settle in with your story, then return it when you’re ready for a
              new one.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
