class Api::V1::ProjectsController < ApplicationController
  respond_to :json

  def create
    @project = Project.new(project_params)

    if @project.save!
      params[:project][:project_users].each do |user|
        ProjectUser.create({project: @project, user_id: user[:id], user_level: user[:read_only] ? "read" : "full"})
      end
      render :show, status: :created
    end
  end

  def show
    @project = Project.find(params[:id])
    render :show
  end

  private

  def project_params
    params.require(:project).permit(
      :name,
      :start_date,
      :end_date,
      schedule: {}
    ).merge(company: current_company)
  end
end
