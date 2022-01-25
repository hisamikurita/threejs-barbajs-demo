## 開発

- node 14.18.1, npm 6.14.15, yarn 1.22.17
- node_modules のインストールには yarn を使用してください

### Install

```
yarn install
```

### 開発プレビュー

開発用のサーバーは http://localhost:8080/ になります

```
yarn develop
```

### 納品

```
yarn production
```

### その他

- エディターは visual studio code を使用してください。
- prettier を使用し、セーブ時にコードを整形をしています。
- src/variables.json で定数の設定ができます。サンプルでは meta を記述してます。
- scripts/prettify-html.js では html 整形をしていますが、圧縮したい場合は外してください。
- src/views/partials/\_picture-element.pug は webp 画像モジュールです。
- src/views/partials/\_svg-element.pug は SVG スプライトモジュールです。
- gulpfile.js の stylus タスクでリセット css を挿入してます。
