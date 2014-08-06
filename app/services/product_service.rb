class ProductService < ApplicationService
  def list(page)
    products = Item.includes([:category, :vendor]).order(created_at: :desc).page(page)
    products
  end

  def create(product_params, extra_params = {})
    product = Item.create(product_params)
    product
  end

  def update(product, product_params, extra_params = {})
    product.update_attributes(product_params)
    product
  end
end