class CategoryService < ApplicationService
  def list
    json_data = {}
    categories = Category.order(name: :asc)
    json_data[:categories] = categories
    json_data
  end
end