class Api::V1::ProjectTemplatesController < ApplicationController
  respond_to :json

  def index
    @project_templates = current_company.project_templates
    render :index
  end

  def create
    @project_template = ProjectTemplate.create_from_csv(params[:name], params[:csv_file].tempfile, current_company.id)
    render :show, status: :created
  end
end
