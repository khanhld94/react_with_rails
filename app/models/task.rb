class Task < ApplicationRecord
  validates :text, uniqueness: true
end
