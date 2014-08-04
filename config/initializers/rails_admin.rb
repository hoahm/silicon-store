RailsAdmin.config do |config|

  config.authorize_with :cancan
  config.current_user_method(&:current_user)

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete do
      except ['User', 'Role']
    end
    show
    edit
    delete do
      except ['User', 'Role']
    end
    show_in_app
    history_index do
      except ['Role']
    end
    history_show do
      except ['Role']
    end
  end

  config.main_app_name = ["Silicon Straits Saigon Store", "ACP"]

  config.audit_with :paper_trail, 'User', 'PaperTrail::Version'
  config.audit_with :paper_trail, 'Vendor', 'PaperTrail::Version'
  config.audit_with :paper_trail, 'Category', 'PaperTrail::Version'
  config.audit_with :paper_trail, 'Item', 'PaperTrail::Version'

  config.included_models = ['User', 'Vendor', 'Category', 'Item', 'Role']

  config.model 'User' do
    navigation_label I18n.t(".rails_admin.navigation.users_management")
    navigation_icon 'icon-user'

    list do
      include_fields :first_name, :last_name, :email, :date_of_birth
      sort_by :first_name
      field :date_of_birth do
        strftime_format "%d/%m/%Y"
      end
    end

    edit do
      include_fields :first_name, :last_name, :email, :date_of_birth, :mobile, :password
    end
  end

  config.model 'Role' do
    navigation_label I18n.t(".rails_admin.navigation.users_management")
    edit do
      exclude_fields :name
    end
  end

  config.model 'Vendor' do
    navigation_label I18n.t(".rails_admin.navigation.products_management")
    label I18n.t(".rails_admin.navigation.manufacturers")
    weight -1
    list do
      field :name
      field :created_at do
        strftime_format "%d/%m/%Y %H:%M"
      end
      field :updated_at do
        strftime_format "%d/%m/%Y %H:%M"
      end
    end

    edit do
      field :name do
        label I18n.t(".rails_admin.model.vendor.name")
      end
      field :description, :ck_editor do
        label I18n.t(".rails_admin.model.vendor.description")
        help I18n.t(".rails_admin.model.vendor.description_help")
      end
    end
  end

  config.model 'Category' do
    navigation_label I18n.t(".rails_admin.navigation.products_management")
    weight -2
    list do
      include_fields :name, :created_at
    end
  end

  config.model 'Item' do
    navigation_label I18n.t(".rails_admin.navigation.products_management")
    label I18n.t(".rails_admin.navigation.products")
    weight -3
    list do
      include_fields :name, :sku, :category, :quantity
    end

    edit do
      field :name do
        label I18n.t(".rails_admin.model.item.name")
      end
      field :sku
      field :description do
        label I18n.t(".rails_admin.model.item.description")
      end
      field :vendor do
        label I18n.t(".rails_admin.model.item.vendor")
      end
      field :category
      field :quantity
      field :price
      field :photo
    end
  end
end