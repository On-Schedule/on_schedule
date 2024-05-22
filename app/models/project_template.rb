require 'csv'

class ProjectTemplate < ApplicationRecord
  class << self
    def create_from_csv name, csv_file, company_id
      type = :tasks
      template = {
        tasks: [],
        to_dos: [],
        project_settings: {days: [], hours: nil}
      }

      CSV.read(csv_file).each do |row|
        if row[0] == "name" || row.all?(&:nil?)
          next
        elsif row[0] == "to-dos"
          type = :to_dos
          next
        end

        template[type].push(build_object(type, row))
      end

      create(name:, template:, company_id:)
    end

    private

    def build_object type, row
      if type == :tasks
        {
          name: row[0],
          start_date: row[1],
          end_date: row[2],
          hours: row[3],
          cost_code: row[4],
          responsibility: row[5],
          description: row[6]
        }
      elsif type == :to_dos
        {
          name: row[0],
          due_date: row[1],
          description: row[2]
        }
      end
    end
  end
end
