// Helper function to validate username
function isValidUsername(username) {
    // Follows usual username conventions
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return typeof username === 'string' && usernameRegex.test(username);
  }
  
  // Helper function to validate date format (yyyy-mm-dd)
  function isValidDateFormat(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return typeof date === 'string' && dateRegex.test(date);
  }

  module.exports.isValidUsername = isValidUsername;
  module.exports.isValidDateFormat = isValidDateFormat;