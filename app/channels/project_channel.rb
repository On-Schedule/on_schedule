class ProjectChannel < ApplicationCable::Channel
  def subscribed
    stream_from "project_channel_#{params['project_id']}"
  end

  def unsubscribed
    stop_all_streams
  end
end
