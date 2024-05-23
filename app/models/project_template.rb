require 'csv'

class ProjectTemplate < ApplicationRecord
  class << self
    def create_from_csv name, csv_file, company_id
      template = {
        tasks: {}
      }

      CSV.read(csv_file, headers: true).each_with_index do |row, index|
        template[:tasks][index] = row.to_h
      end

      create(name:, template:, company_id:)
    end
  end
end
