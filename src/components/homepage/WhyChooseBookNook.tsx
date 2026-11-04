import { Bookmark, BookOpen, Compass, Library } from "lucide-react";

export default function WhyChooseBookNook() {
  return (
    <section
      className="booknook-home-why"
      aria-labelledby="home-why-title"
    >
      <div className="booknook-home-why-heading">
        <p className="booknook-eyebrow">More than a bookshelf</p>
        <h2 id="home-why-title">Why choose BookNook?</h2>
        <p>
          A welcoming place to follow your curiosity, keep track of the stories
          you love, and discover what to read next.
        </p>
      </div>

      <div className="booknook-home-reasons">
        <article className="booknook-home-reason">
          <span className="booknook-home-reason-icon">
            <Library size={21} aria-hidden="true" />
          </span>
          <h3>Wide Book Collection</h3>
          <p>
            Explore a thoughtful range of stories, subjects, and genres for
            every kind of reader.
          </p>
        </article>
        <article className="booknook-home-reason">
          <span className="booknook-home-reason-icon">
            <Bookmark size={21} aria-hidden="true" />
          </span>
          <h3>Easy Borrowing</h3>
          <p>
            Find a book that catches your eye and enjoy a straightforward
            borrowing experience.
          </p>
        </article>
        <article className="booknook-home-reason">
          <span className="booknook-home-reason-icon">
            <BookOpen size={21} aria-hidden="true" />
          </span>
          <h3>Personal Library</h3>
          <p>
            Keep your reading life close and make it easy to return to the books
            that matter to you.
          </p>
        </article>
        <article className="booknook-home-reason">
          <span className="booknook-home-reason-icon">
            <Compass size={21} aria-hidden="true" />
          </span>
          <h3>Discover New Authors</h3>
          <p>
            Step beyond the familiar and find a fresh voice for your next
            favorite read.
          </p>
        </article>
      </div>
    </section>
  );
}
