class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user)
  end

  def create
  end
end

