class Api::V1::TasksController < ApplicationController
  respond_to :json

  def index
    project = Project.find(params[:project_id])
    @tasks = project.tasks
    respond_with @tasks
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      render :show, status: :created
    end
  end

  private

  def task_params
    params.require(:task).permit(
      :name,
      :start_date,
      :end_date,
      :hours,
      :project_id
    )
  end
end