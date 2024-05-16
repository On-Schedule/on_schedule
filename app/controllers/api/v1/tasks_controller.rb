class Api::V1::TasksController < ApplicationController
  respond_to :json

  def index
    @tasks = Project.find(params[:project_id]).tasks
    respond_with @tasks
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render :show, status: :created
    end
  end

  def update
    @task = Task.find(params[:id])

    if @task.update(task_params)
      render :show, status: :ok
    end
  end

  private

  def task_params
    params.require(:task).permit(
      :name,
      :start_date,
      :end_date,
      :hours,
      :cost_code,
      :project_id,
      :description,
      :responsibility
    )
  end
end
