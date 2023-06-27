class RemoveTitleFromReviews < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :title
  end
end
