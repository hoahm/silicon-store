class RegistrationsController < Devise::RegistrationsController

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :date_of_birth, :first_name, :last_name, :mobile)
  end

  def account_update_params
    params.require(:user).permit(:email, :password, :password_confirmation, :date_of_birth, :first_name, :last_name, :current_password, :mobile)
  end

end
