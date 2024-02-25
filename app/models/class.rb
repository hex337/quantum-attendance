class Class < ApplicationRecord
  # Validations
  validates :name, presence: true
  validates :description, presence: true

  # Associations
  has_many :students

  def as_json(options={})
    super(options.merge({ except: [:created_at, :updated_at] }))
  end
end
