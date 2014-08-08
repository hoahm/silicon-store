class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  rescue_from CanCan::AccessDenied do |exception|
    if request.xhr?
      flash[:alert] = exception.message
      render json: { unauthorized: true }, status: :unauthorized
    else
      flash[:alert] = exception.message
      redirect_to main_app.root_url
    end
  end

  def after_sign_in_path_for(resource)
    if resource.is_admin?
      rails_admin_path
    else
      root_path
    end
  end
end