class RealtimeCategoryController < FayeRails::Controller
  channel "/category" do
    subscribe do
      Rails.logger.debug "Received on #{channel}: #{inspect}"

      console.log("========")
      console.log(message);
    end
  end
end