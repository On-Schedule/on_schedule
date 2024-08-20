class Api::V1::ProjectsController < ApplicationController
  respond_to :json

  def create
    @project = Project.new(project_params)

    if params[:template]
      template = ProjectTemplate.find(params[:template])
      @project.template = template.template["tasks"]
    end

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

  def destroy; end

  def archive
    project = Project.find(params[:project_id])

    tasks = project.tasks
    to_dos = project.to_dos
    project_users = project.project_users

    time = Time.now

    project.update(deleted_at: time)
    tasks.update_all(deleted_at: time)
    to_dos.update_all(deleted_at: time)
    project_users.update_all(deleted_at: time)
  end

  def update_users
    project = Project.find(params[:project_id])
    ProjectUser.destroy_by(id: params[:users][:remove].map { |user| user["project_user_id"] })

    serialize_project_users(params[:users][:update]).each do |user|
      if user[:id]
        ProjectUser.find(user[:id]).update({user_level: user[:user_level]})
      else
        ProjectUser.create(user)
      end
    end

    ActionCable.server.broadcast("project_channel_#{project.id}",
      {type: :project, content: Rabl.render(project, 'projects/show', format: :hash)})
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

  def serialize_project_users users
    users.map do |user|
      {id: user["project_user_id"], user_id: user["id"], user_level: user["user_level"], project_id: params[:project_id]}.compact
    end
  end
end
