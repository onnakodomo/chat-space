class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text
      t.references
      t.referrence
      t.timestamps
    end
  end
end
