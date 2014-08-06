class VendorsController < ApplicationController
  before_filter :load_vendor, only: [:show, :update, :destroy]

  def index
    authorize! :read, Vendor
    page = (params[:page] || 1).to_i
    vendors = vendor_service.list(page)

    render json: render_vendor_json(vendors)
  end

  def create
    authorize! :add, Vendor
    product = vendor_service.create(vendor_params)

    if vendor.errors.empty?
      rendor json: render_vendor_json(vendor), status: :created
    else
      render json: vendor.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize! :edit, @vendor
    vendor = vendor_service.update(@vendor, vendor_params)

    if vendor.errors.empty?
      rendor json: render_vendor_json(vendor), status: :created
    else
      render json: vendor.errors, status: :unprocessable_entity
    end
  end

  def show
    authorize! :read, @vendor

    render json: render_vendor_json(@vendor)
  end

  def destroy
    authorize! :delete, @vendor
    @vendor.destroy

    render json: {}, status: :no_content
  end

  private
    def vendor_params
      params.require(:vendor).permit(:name, :description)
    end

    def load_vendor
      @vendor = Vendor.find(params[:id])
    end

    def vendor_service
      @vendor_service ||= VendorService.new(current_user)
    end

    def render_vendor_json(vendor_object)
      vendor_object.as_json(
        except: [:created_at, :updated_at]
      )
    end
end
