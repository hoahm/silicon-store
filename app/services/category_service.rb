class CategoryService < ApplicationService
  def list(page)
    categories = Category.order(name: :asc).page(page)
    categories
  end

  def create(category_params, extra_params = {})
    category = Item.create(category_params)
    category
  end

  def update(category, category_params, extra_params = {})
    category.update_attributes(category_params)
    category
  end
end