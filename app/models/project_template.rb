require 'csv'

class ProjectTemplate < ApplicationRecord
  belongs_to :company
  validates_presence_of :name
  validates_presence_of :template
  validates :name, uniqueness: {scope: :company_id}

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
