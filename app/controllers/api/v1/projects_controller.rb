class Api::V1::ProjectsController < ApplicationController
  respond_to :json

  def create
   @project = Project.new(project_params)

   if @project.save!
    ProjectUser.create({project: @project, user: current_user})
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
