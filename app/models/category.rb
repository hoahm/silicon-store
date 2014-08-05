class Category < ActiveRecord::Base
  has_paper_trail
  has_many :items

  validates :name, presence: true

  after_create {|category| category.message 'create' }
  after_update {|category| category.message 'update' }
  after_destroy {|category| category.message 'destroy' }

  def message(action)
    msg = {
      resource: 'categories',
      action: action,
      id: self.id,
      obj: self
    }

    $redis.publish 'rt-change', msg.to_json
  end
end