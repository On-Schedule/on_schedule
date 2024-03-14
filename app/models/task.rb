class Task < ApplicationRecord
  belongs_to :project

  def chart_index_values
    {start: (start_date - project.start_date).to_i + 1, stop: (end_date - start_date).to_i + 1}
  end
end
