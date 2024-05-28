class Api::V1::TasksController < ApplicationController
  respond_to :json

  def index
    @tasks = Project.find(params[:project_id]).tasks
    respond_with @tasks
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      ActionCable.server.broadcast("project_channel_#{@task.project_id}", {type: :task, content: Rabl.render(@task, 'tasks/show', format: :hash)})
      if params["template_key"]
        project = @task.project
        project.template.delete(params["template_key"])
        if project.save
          ActionCable.server.broadcast(
            "project_channel_#{@task.project_id}",
            {
              type: :project,
              content: Rabl.render(project, 'projects/show', format: :hash)
            }
          )
        end
      end
    end
  end

  def update
    @task = Task.find(params[:id])

    if @task.update(task_params)
      ActionCable.server.broadcast("project_channel_#{@task.project_id}", {type: :task, content: Rabl.render(@task, 'tasks/show', format: :hash)})
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
