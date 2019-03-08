class MessagesController < ApplicationController
  before_action :set_group

  # 特定のgroupに紐すくmessages表示と、新規messagesの為の変数生成
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end


  def create
    @message = Message.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: "メッセージを送信しました"}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージを入力してください。"
      render :index
    end
  end


  private
  def message_params
    params.require(:message).permit(:body, :image).merge(group_id: params[:group_id], user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
