
import { Avatar, Button, Card } from "@heroui/react";
import { BookOpenCheck, LockKeyhole, Mail, UserRound } from "lucide-react";

export default function ProfilePage() {
  return (
    <section
      className="booknook-profile-page"
      aria-labelledby="profile-page-title"
    >
      <header className="booknook-profile-heading">
        <p className="booknook-eyebrow">
          <BookOpenCheck size={16} aria-hidden="true" />
          Your BookNook account
        </p>
        <h1 id="profile-page-title">My Profile</h1>
        <p>
          Keep your account details close while you explore the reading room.
        </p>
      </header>

      <div className="booknook-profile-layout">
        <Card className="booknook-profile-card" variant="default">
          <Card.Header className="booknook-profile-card-heading">
            <div>
              <Card.Title>Profile information</Card.Title>
              <Card.Description>
                Personal details associated with your account.
              </Card.Description>
            </div>
            <span className="booknook-profile-lock" aria-label="Read-only">
              <LockKeyhole size={16} aria-hidden="true" />
            </span>
          </Card.Header>

          <Card.Content className="booknook-profile-card-content">
            <div className="booknook-profile-identity">
              <Avatar
                className="booknook-profile-avatar"
                size="lg"
                aria-label="Profile avatar unavailable"
              >
                <Avatar.Fallback>
                  <UserRound size={30} aria-hidden="true" />
                </Avatar.Fallback>
              </Avatar>
              <div>
                <h2>Account details unavailable</h2>
                <p>
                  This preview does not have access to signed-in profile
                  information.
                </p>
              </div>
            </div>

            <div className="booknook-profile-details">
              <div className="booknook-profile-detail">
                <span>
                  <UserRound size={15} aria-hidden="true" />
                  Full name
                </span>
                <strong>Not available in this preview</strong>
              </div>
              <div className="booknook-profile-detail">
                <span>
                  <Mail size={15} aria-hidden="true" />
                  Email address
                </span>
                <strong>Not available in this preview</strong>
              </div>
            </div>
          </Card.Content>

          <Card.Footer className="booknook-profile-card-footer">
            <Button
              className="booknook-profile-edit-button"
              isDisabled
              type="button"
              variant="outline"
              aria-describedby="profile-edit-unavailable"
            >
              Edit Profile
            </Button>
            <p id="profile-edit-unavailable">
              Profile editing is not available in this preview.
            </p>
          </Card.Footer>
        </Card>

        <aside className="booknook-profile-note" role="note">
          <span className="booknook-profile-note-icon" aria-hidden="true">
            <LockKeyhole size={17} />
          </span>
          <div>
            <h2>Account privacy</h2>
            <p>
              Your profile details will appear here when account information is
              available.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}