class CompanyAdminChannel < ApplicationCable::Channel
  def subscribed
    stream_from "company_admin_channel_#{params['company_id']}"
  end

  def unsubscribed
    stop_all_streams
  end
end
