
"use strict";
// IDの取得
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivision = document.getElementById("result-area");
const tweetDivision = document.getElementById("tweet-area");


// 【追加】ボタンを押すと背景色が変わる
function changePageBgColor( newColor ) {
    document.body.style.backgroundColor = newColor;
};
function changeButtonColor(secondColor) {
  assessmentButton.style.backgroundColor = secondColor; // IDで直接色を変更可能
};


// ボタンをクリックしたとき
assessmentButton.addEventListener(
  'click',
  // 再利用しない関数は「無名関数」もしくは「アロー関数」  (関数名) => {処理}
  function () {


    // ユーザが入力した値を取得
    const userName = userNameInput.value;
    // 何も入力されていなかったら、処理を終了(ガード句)
    if (userName.length === 0) {
      return;
    }
    console.log(userName);


    // 診断結果を初期化
    resultDivision.innerText = "";


    // 診断結果をHTMLで表示する(resulut-area属性に追加する子要素たち)
    const header = document.createElement("h3");
    header.innerText = "診断結果";
    resultDivision.appendChild(header); // 子要素[1]  <h3>診断結果</h3

    const paragraph = document.createElement("p");
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph); // 子要素[2]  <p>診断結果の文章</p>


    // ツイートボタン
    tweetDivision.innerText = "";
    const anchor = document.createElement("a");
    // #あなたのいいところ をハッシュタグ化(URIエンコード)
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent('あなたのいいところ') + "&ref_src=twsrc%5Etfw";

    // 属性を設定
    anchor.setAttribute("href", hrefValue); // href属性(URL)
    anchor.setAttribute("class", "twitter-hashtag-button"); // class属性
    anchor.setAttribute("data-text", result); // 診断結果テキスト
    anchor.innerText = "Tweet #あなたのいいところ";

    // tweet-area属性に子要素を追加
    tweetDivision.appendChild(anchor); 

    // ボタンの見た目が変化  <script src="https://platform.twitter.com/widgets.js">を子要素に追加
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);

  }
);

// または"入力欄で"Enterキーを押したとき
userNameInput.addEventListener(
  "keydown",
  (event) => {
    // もし、eventに格納されたのがEnterキーだったら
    if (event.code === "Enter") {
      assessmentButton.dispatchEvent(new Event('click')); // clickした時と同じ処理をする
    }
  }
);

// clickがckickになってた


// 診断結果の文章
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
];

/** 
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果　
 */

// 診断結果の取得、ユーザ名へ変換
function assessment(userName) {

  console.log(`文字列${userName}のコードを取得`);

    // 文字コードを取得、足し合わせる
    let sum0fCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sum0fCharCode += userName.charCodeAt(i); // sumへ代入 0番目, 1番目, 2番目 ...
    }

    // 文字コード番号の合計を、回答の数で割ってインデックスの数値を求める(入力した文字コードで決まるため規則性はあるが、プレイヤーが狙って文章を引き当てるのは困難。つまりこのコードは規則性のある乱数?)
    const index = sum0fCharCode % answers.length;
    let result = answers[index]; // 診断結果の文章が決まる

    result = result.replaceAll("###userName###", userName); // 文章の「ユーザ名」を置き換え
    return result; // 回答
}


// console.log(assessment('太郎'));
// console.log(assessment('次郎'));
// console.log(assessment('太郎'));


// // 文章チェッカー
// function test() {
//     console.log("診断した文章のテスト");

//     console.assert(
//         assessment("太郎") === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
//     '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
//     );

//     console.log("テスト終了");
// }
// test();








/* 
JSDoc形式のコメントは、見た目の分かりやすさが特徴
色付きだからと言って「コードではなく、あくまでコメント」なので注意

@param = 仮引数の宣言
@return = 返り値の保持



インデックス＝添え字に応じて文字コードを取得する
"文字".charCodeAt(インデックス);
"あい".charCodeAt(0);　⇒あ⇒12354
"あい".charCodeAt(1);　⇒い⇒12356


replaceAll = 文字列の変換
"文字列".replaceAll("変換対象", "変換後");
「あ」を「い」に置き換える
"あんこ".replaceAll("あ", "い");　⇒　いんこ


usr strict は「厳格モード」という
let や const のような変数宣言を強制化するものであり、
エラーの原因となりうる変数を教えてくれる


let = 変数(代入可)スコープ範囲外でもOK
const = "定数"(再代入不可)スコープ範囲内のみ
var = 変数宣言なし
基本はconst、変更したくなったらletに変えると良いそう


console.assert = 式が正常に動作するかチェックする
console.assert(チェック対象, "エラーメッセージ");


function()のような、関数名が"ない"ものを「無名関数」という
=>が付くと「アロー関数」になる。

入力がない場合は処理を空で返すことを「ガード句」という
ブール値でtrueが返るものはtruthy、
falseが返るものはfalsyという。


createElementでタグを指定
innerTextで文字を作成
appendChildでHTMLに"子要素として"適用


子要素初期化の例
innerText = " "で上書き
もしくはremoveChildで要素を削除する



setAttribute = HTMLタグの属性を設定する
classやidに関しては、他のプロパティでも設定可能 (createElement変数.className = "クラス名")

ちなみに、複数のclassを定義する場合はclassListプロパティが使える
createElement変数.classList.add('クラス名1', 'クラス名2');



URL = Uniform Resource Locator
https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw

https = スキーム
twitter.com = ホスト名
/intent/tweet = リソース名
? = クエリ

URLの中に文字列を含ませる場合は「URIエンコード」を使う

encodeURIComponent = 文字列を URI エンコードへ変換
decodeURIComponent = URIエンコードを元に戻す

元あるコードを解析することを「リバースエンジニアリング」という
教材を読み解く私みたいなもん

OSS = オープンソースソフトウェア
リポジトリ = 開発コードの管理場所
フォーク = 他人のリポをコピーして作るリポジトリのこと


*/

// マルチカーソル　Ctrl + Alt + ↓   文の末尾 テンキーのEnd(NumLockに注意!)
// ちなみに複製は Shift + Alt + ↓

