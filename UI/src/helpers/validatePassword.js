export default function validatePassword(password) {
  // Check for minimum length (8 or more characters)
  if (!/^.{8,}$/.test(password)) {
    return "Password must be at least 8 characters long.";
  }

  // Check for at least one uppercase letter
  if (!/(?=.*[A-Z])/.test(password)) {

    return "Password must contain at least one uppercase letter.";
  }

  // Check for at least one digit
  if (!/(?=.*\d)/.test(password)) {

    return "Password must contain at least one digit.";
  }
  // // Check for at least one special character
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // // Check for at least one special character (@, $, !, %, *, ?, &)
  // if (!/(?=.*[@$!%*?&])/.test(password)) {
  //   return "Password must contain at least one special character (@, $, !, %, *, ?, &).";
  // }

  // // Check that only allowed characters are present
  // if (!/^[A-Za-z\d@$!%*?&]+$/.test(password)) {
  //   return "Password contains invalid characters.";
  // }

  // If all validations pass, return null (or an empty string) to indicate success
  return null;
}
