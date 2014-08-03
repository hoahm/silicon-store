class ProductService < ApplicationService
  def list(page, per_page)
    json_data = {}
    products = Item.order(created_at: :desc).page(page).per(per_page)
    json_data[:products] = products
    json_data
  end

  def create(product_params, extra_params = {})
    json_data = {}
    product = Item.create(product_params)
    json_data[:product] = product
    json_data
  end

  def update(product, product_params, extra_params = {})
    json_data = {}
    product.update_attributes(product_params)
    json_data[:product] = product
    json_data
  end
end