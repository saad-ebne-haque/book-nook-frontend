export function validatePassword(value: string) {
  if (!value) {
    return null;
  }

  const missingRequirements: string[] = [];

  if (value.length < 6) {
    missingRequirements.push("at least 6 characters");
  }
  if (!/[a-z]/.test(value)) {
    missingRequirements.push("a lowercase letter");
  }
  if (!/[A-Z]/.test(value)) {
    missingRequirements.push("an uppercase letter");
  }
  if (!/[0-9]/.test(value)) {
    missingRequirements.push("a number");
  }

  return missingRequirements.length
    ? `Add ${missingRequirements.join(", ")} to your password.`
    : null;
}
