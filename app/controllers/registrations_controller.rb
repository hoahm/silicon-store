class RegistrationsController < Devise::RegistrationsController

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :date_of_birth, :first_name, :last_name, :mobile)
  end

  def account_update_params
    params.require(:user).permit(:email, :password, :password_confirmation, :date_of_birth, :first_name, :last_name, :current_password, :mobile)
  end

  protected
    def after_sign_up_path_for(resource)
      signed_in_root_path(resource)
    end

    def after_update_path_for(resource)
      signed_in_root_path(resource)
    end

end
