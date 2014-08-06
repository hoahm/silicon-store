class VendorService < ApplicationService
  def list(page)
    vendors = Vendor.order(name: :asc).page(page)
    vendors
  end

  def create(vendor_params, extra_params = {})
    vendor = Vendor.create(category_params)
    vendor
  end

  def update(vendor, vendor_params, extra_params = {})
    vendor.update_attributes(vendor_params)
    vendor
  end
end