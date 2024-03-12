class Api::V1::UsersController < ApplicationController
  respond_to :json

  def index
    @all_users = current_company.users
    respond_with @all_users
  end

  def show
    respond_with current_user
  end
end
