class CategoriesController < ApplicationController

  def index
    authorize! :read, Category
    json_data = category_service.list

    render json: json_data[:categories]
  end

  private
    def category_params
      params.require(:category).permit(:name)
    end

    def category_service
      @category_service ||= CategoryService.new(current_user)
    end
end
