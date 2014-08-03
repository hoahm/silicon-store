class ApplicationService
  def initialize(current_user)
    @current_user ||= current_user
  end

  def current_user
    @current_user
  end
end