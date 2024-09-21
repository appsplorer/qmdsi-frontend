export const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@#,!]/.test(password);
    const isLongEnough = password.length >= 8;
    
    
    
    if (!isLongEnough) {
      throw new Error("Password must be at least 8 characters long");
    } else if (!hasUppercase) {
      throw new Error("Password must contain at least one uppercase letter");
    } else if (!hasNumber) {
      throw new Error("Password must contain at least one number");
    } else if (!hasSpecialChar) {
      throw new Error(
        "Password must contain at least one special character (@, #, !)"
      );
    } else {
      return true
    }
  };