FactoryBot.define do
  factory :message do
    body         { Faker::Lorem.sentence }
    #特定のファイルを実際に用意しておくということか
    image        {File.open("#{Rails.root}/public/images/IMG_7035.jpg")}
    # アソシエーション定義
    user
    group
  end
end


# FactoryBot.define do
#   factory :message do
#     content {Faker::Lorem.sentence}
#     image {File.open("#{Rails.root}/public/images/no_image.jpg")}
#     user
#     group
#   end
# end
