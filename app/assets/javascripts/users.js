$(function(){

  if ($("#sign_up_form").length > 0){
    $("#sign_up_form").validate({
      rules: {
        "user[first_name]": {
          required: true
        },
        "user[last_name]": {
          required: true
        },
        "user[date_of_birth]": {
          required: true
        },
        "user[email]": {
          required: true,
          email: true
        },
        "user[password]": {
          required: true,
          minlength: 6
        },
        "user[password_confirmation]": {
          required: true,
          equalTo: "#user_password"
        }
      },
      messages: {
        "user[first_name]": {
          required: "Please input your first name"
        },
        "user[last_name]": {
          required: "Please input your last name"
        },
        "user[date_of_birth]": {
          required: "Please input your day of birth"
        },
        "user[email]": {
          required: "Please input your email",
          email: "Email is invalid"
        },
        "user[password]": {
          required: "Please input your password",
          minlength: "Minimum password length is 6 characters"
        },
        "user[password_confirmation]": {
          required: "Please input your password confirmation",
          equalTo: "Password confirmation do not match"
        }
      }
    });
  }

});