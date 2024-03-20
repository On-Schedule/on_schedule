class Task < ApplicationRecord
  belongs_to :project

  def date_index
    {start: (start_date - project.start_date).to_i + 1, stop: (end_date - start_date).to_i + 1}
  end
end
