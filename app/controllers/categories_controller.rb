class CategoriesController < ApplicationController
  before_filter :load_category, only: [:show, :update, :destroy]

  def index
    authorize! :read, Category
    page = (params[:page] || 1).to_i
    categories = category_service.list(page)

    render json: render_category_json(categories)
  end

  def create
    authorize! :add, Category
    category = category_service.create(category_params)

    if category.errors.empty?
      render json: render_category_json(category), status: :created
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize! :edit, @category
    category = category_service.update(@category, category_params)

    if category.errors.empty?
      render json: render_category_json(category), status: :ok
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  def show
    authorize! :read, @category

    render json: render_category_json(@category)
  end

  def destroy
    authorize! :delete, @category
    @category.destroy

    render json: {}, status: :no_content
  end

  private
    def category_params
      params.require(:category).permit(:name)
    end

    def category_service
      @category_service ||= CategoryService.new(current_user)
    end

    def render_category_json(category_object)
      category_object.as_json(
        except: [:created_at, :updated_at]
      )
    end

    def load_category
      @category = Category.find(params[:id])
    end
end
