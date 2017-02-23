class Post 
  include Mongoid::Document
  field :data, type: String
  field :tag, type: String
  field :value, type: String
  field :text, type: String 
  field :temp, type: String 

end
