# alexa-gohan


[![alexa-gohan](http://img.youtube.com/vi/wxj7vpirw-k/0.jpg)](http://www.youtube.com/watch?v=wxj7vpirw-k "alexa-gohan")

## これは何？

「アレクサ、ごはんだよを開いて」  
「誰にごはんだよと伝えますか」  
「長男」  
「長男にごはんだよと伝えました」  

といった感じで、アレクサから家族の誰かに、ごはんができたことを LINE してもらうやつ。

---

## 使い方

スキル開発の基礎的な知識については、[Alexaスキル開発トレーニング](https://developer.amazon.com/ja/alexa-skills-kit/training/building-a-skill) の第1回と第2回を一通り読んで試してもらえればわかるはず。

ここではスキル作成に関する説明は、上記の「Alexaスキル開発トレーニング」に譲り、スキルとひもづける Lambda Function（このリポジトリにあるコード）を動かすのに最低限必要な設定のみ説明する。

### 環境変数の設定

Lambda Function の設定画面で、LINE bot アカウントのアクセストークンとシークレットを、環境変数 `CHANNEL_ACCESS_TOKEN` と `CHANNEL_SECRET` にセットしておく。

### user.js の作成

LINE bot でメッセージを送る相手の名前とユーザIDをマッピングしたテーブルを作成し、`user.js` という名前で保存。

```javascript
exports.id = {
    '長男': 'Uad1bc...',
    '次男': 'Ue0114...',
    '長女': 'Ua84b8...',
}

```

ユーザIDは以下のような Lambda Function を API Gateway 配下で動かして、LINE bot の Webhook 経由で取得。

```javascript
exports.handler = (event, context, callback) => {
    console.log(event.body);
};
```

### zip で固めてアップロード

作成した `user.js` を含めて zip に固めてアップロードする。

---

## FAQ

### なぜつくったのか

家の中で「ごはんだよ」と叫んでも、長男や次男は部屋でイヤホンを装着して音楽聴いてたりするので、聞こえないことがよくある。そういう時は LINE でメッセージを送るようにしてるけど、いちいちスマホを取り出して LINE を開いて…、とやるのがめんどくさいので。

### 誰に送るか指定しなくてもブロードキャストすればいいのでは？

長男は塾や習い事がある日は早めに食べる、など、全員が同じタイミングで食事するわけではないので。


### LINE するなら Clova WAVE とか Clova Friends 使えばいいじゃん

アレクサスキルを開発してみたかったので。
