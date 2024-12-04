class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_channel_#{params['user_id']}"
  end

  def unsubscribed
    stop_all_streams
  end
end
