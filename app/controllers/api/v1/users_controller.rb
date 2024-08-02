class Api::V1::UsersController < ApplicationController
  respond_to :json

  def index
    @all_users = current_company.users
    respond_with @all_users
  end

  def show
    respond_with current_user
  end

  def project_users
    @users = User.find_by_sql(
      [
        "SELECT users.id AS id, project_users.id AS project_user_id, users.first_name, users.last_name, project_users.user_level
        FROM users LEFT OUTER JOIN project_users ON users.id = project_users.user_id AND project_users.project_id = ?",
        params[:project_id]
      ]
    )
    respond_with @users
  end
end
