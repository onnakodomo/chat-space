FactoryBot.define do
  factory :user do
    # password = Faker::Internet.password(8)
    name                          { Faker::Name.last_name }
    email                         { Faker::Internet.free_email}
    password                      { Faker::Internet.password(8) }
    password_confirmation         { Faker::Internet.password(8) }
  end
end
