class Api::V1::AnalyticsController < ApplicationController
  respond_to :json

  def week_overview
    render json: AnalyticsService.get_week_overview(current_user).to_json
  end
end
