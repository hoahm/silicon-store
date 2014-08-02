RailsAdmin.config do |config|

  config.authorize_with :cancan
  config.current_user_method(&:current_user)

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
    history_index
    history_show
  end

  config.main_app_name = ["Silicon Straits Saigon Store", "ACP"]
end