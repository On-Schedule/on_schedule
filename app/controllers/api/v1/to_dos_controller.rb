class Api::V1::ToDosController < ApplicationController
  respond_to :json

  def create
    @to_do = ToDo.new(to_do_params)

    if @to_do.save && @to_do.owner_type == "Project"
      ActionCable.server.broadcast("project_channel_#{@to_do.owner_id}", {type: :to_do, content: Rabl.render(@to_do, 'to_dos/show', format: :hash)})
    end
  end

  def to_do_params
    params.require(:to_do).permit(
      :title,
      :user_id,
      :owner_type,
      :owner_id,
      :due_date,
      :description,
      :status
    )
  end
end
