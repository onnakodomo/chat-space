
# messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
```Ruby:message.rb
- belongs_to :group
- belongs_to :user
```

<br>

# groups_usersテーブル
|Column|Type|Option|
|------|----|------|
|name|text|null: false, unique: true|

### Association
```Ruby:group.rb
- has_many :messages
- has_many :users, throuth: :groups_users
- has_many :groups_users
```
<br>

# groups_usersテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true, index: true|
|group_id|integer|null: false, foreign_key: true, index: true|

### Association
```Ruby:groups_user.rb
- belongs_to :group
- belongs_to :user
```


# usersテーブル
|Column|Type|Option|
|------|----|------|
|nickname|text|null: false, unique: true|
|email|string|null: false, unique: true|

### Association
```Ruby:user.rb
- has_many :messages
- has_many :groups, throuth: :groups_users
- has_many :groups_users
```
