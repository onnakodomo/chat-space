class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @users = @group.users
  end

  def create
  end
end

