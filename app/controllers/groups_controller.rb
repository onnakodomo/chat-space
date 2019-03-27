class GroupsController < ApplicationController


  before_action :set_group, only: [ :edit, :update ]

  # rootパスで設定したindex画面はsidebar表示のみ/
  # 変数は引き渡しておらずcurrent_userで参照
  def index
  end



  def new
    # 新規grouo作成の為に新規インスタンス生成/form＿forに引き渡す
    @group = Group.new
    # @group.users << current_user
  end



  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end



  def update
    if @group.update(group_params)
      redirect_to  group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end



  private
  def group_params
    params.require(:group).permit(:name, { user_ids: [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end

end
