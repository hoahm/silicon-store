class ProductsController < ApplicationController
  before_filter :load_product, only: [:show, :edit, :update, :destroy]

  def index
    authorize! :read, Item
    page = (params[:page] || 1).to_i
    products = product_service.list(page)

    respond_to do |format|
      format.html
      format.json {
        render json: {
          products: render_product_json(products),
          page: page,
          total_pages: products.total_pages
        }
      }
    end
  end

  def new
  end

  def create
    authorize! :add, Item
    product = product_service.create(product_params)

    if story.errors.empty?
      render json: render_product_json(product), status: :created
    else
      render json: product.errors, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    authorize! :edit, @product
    product = product_service.update(@product, product_params)

    if product.errors.empty?
      render json: render_product_json(product), status: :ok
    else
      render json: product.errors, status: :unprocessable_entity
    end
  end

  def show
    authorize! :read, @product

    respond_to do |format|
      format.html
      format.json {
        render json: render_product_json(@product)
      }
    end
  end

  def destroy
    authorize! :delete, @product
    @product.destroy

    render json: {}, status: :no_content
  end

  private
    def product_params
      params.require(:product).permit(:name, :description, :sku, :quantity, :price, :vendor_id, :category_id, :photo)
    end

    def load_product
      @product = Item.find(params[:id])
    end

    def product_service
      @product_service ||= ProductService.new(current_user)
    end

    def render_product_json(product_object)
      product_object.as_json(
        include: {
          category: {
            except: [:created_at, :updated_at]
          },
          vendor: {
            except: [:created_at, :updated_at]
          }
        },
        except: [:created_at, :updated_at]
      )
    end
end