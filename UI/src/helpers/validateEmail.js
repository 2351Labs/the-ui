export default function validateEmail(email) {
    // Check if the email is provided
    if (!email) {
      return "Email is required.";
    }
  
    // Validate email format using a regular expression.
    // This regex ensures the email has at least one character before the '@',
    // a domain, and a valid top-level domain.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
  
    // If all validations pass, return null (indicating no error)
    return null;
  }