class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  belongs_to :company
  has_many :project_users
  has_many :projects, through: :project_users
  has_many :tasks, through: :projects

  def full_name
    "#{first_name} #{last_name}"
  end
end
