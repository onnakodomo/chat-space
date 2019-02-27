require 'rails_helper'

describe MessagesController  do
  # 予め、保存する時の前提になるgroupとuserは設定しておく
  let(:group)      { create(:group) }
  let(:user)       { create(:user) }

  describe "#index" do
    # ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
    context "ログイン" do
      before do
        login user
        # このgroup_idは上のgroupから取得
        get :index, params: { group_id: group.id }
      end
      it "アクション内で定義している変数があるか" do
        # ここのmessageはformに渡す為の新規インスタンス
        expect(assigns(:message)).to be_a_new(Message)
      end
      # :groupは、上の処理により呼び出されるprivate配下のgroup
      it "特定のgroupのインスタンスを呼び出せているか" do
        expect(assigns(:group)).to eq group
      end

      it "該当するviewが描画されているどうか" do
        expect(response).to render_template :index
      end
    end
# ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
    context "ログアウト" do
      before do
        get :index, params: { group_id: group.id }
      end
      it "リダイレクト出来るかどうか" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end




  describe "#create" do
    # attributes_forは、中に入ったこの場合で言う所の,messageの中の情報を
    # 個々のparamsって名付けただけなのか!?
    # もし、cretaetアクションが対応するのであれば、このようなハッシュがparamsとして,
    # createアクションに行き渡るはずだ/だとしたら重複しないのか
    let(:params) {{ group_id: group.id, user_id: user.id, message: attributes_for(:message)}}
    # ここのparamsは一種架空のparamsで、もし、createsクションが発動した時は、送られるだろうparams
    # ここの:messageは、factorybotで定義した仮のインスタンス。
    # それを、paramsの中身と同じように、ハッシュ構造の中に配置
# ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
    context "ログイン" do
      before do
        login user
      end

      context "保存に成功" do
        subject {
          post :create,
          params: params
        }

        it "メッセージの保存は出来たのか" do
          expect { subject }.to change(Message, :count).by(1)
        end

        it "画面は遷移したのか" do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

# ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
      context "保存に失敗" do
        let(:invalid_params) {{ group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil )}}

        subject {
          post :create,
          params: invalid_params
        }

        it "保存は行われなかったか" do
          expect{ subject }.not_to change(Message, :count)
        end

        it "意図したビューは表示されたのか" do
          subject
          expect(response).to render_template :index
        end
      end
    end
# ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
    context "ログアウト" do
      it "意図した画面に遷移したのか" do
        # editで、idを渡すように、paramsを渡している
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

end
















  # let(:messages)   { create_list(:message,5)}
# つまり自分が混乱していた原因は、params以下の記述は、勝手にegit等の特定のidを必要とするアクションにしか利用しないとの先入観があった。
# indexには、idを必要としないのだから、params { group_id: group_id }の記述は不要だとの誤解
#
# it "アクション内で定義している変数があるか" do
#   expect(assigns(:messages)).to match(messages)
# end
# つまり自分がきずかなかった理由は、index アクションとの先入観により、実装を確かめすに、どんな
# 変数を定義しているのかも、確認しないまま、indexだからと勝手に一覧表示と考えていて、group変数への考慮もなかったし、実装を確かめずに,newが生成されるのもおかしいと感じてしまっていrた。
#
