require 'csv'

class ProjectTemplate < ApplicationRecord
  class << self
    def create_from_csv name, csv_file, company_id
      template = {
        tasks: []
      }

      CSV.read(csv_file).each do |row|
        template[:tasks].push(row.to_h)
      end

      create(name:, template:, company_id:)
    end
  end
end
