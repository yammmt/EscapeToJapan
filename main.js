// TODO: more plain pref's format (using DB?)
var prefs_hokkaido = ["北海道"];
var prefs_tohoku = ["青森県", "岩手県", "秋田県", "宮城県", "山形県", "福島県"];
var prefs_kanto = ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"];
var prefs_chubu = ["山梨県", "長野県", "新潟県", "富山県", "石川県", "福井県", "静岡県", "愛知県", "岐阜県"];
var prefs_kinki = ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"];
var prefs_chugoku = ["鳥取県", "島根県", "岡山県", "広島県", "山口県"];
var prefs_shikoku = ["香川県", "愛媛県", "徳島県", "高知県"];
var prefs_kyushu = ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];
var prefs_all = new Array();

function init() {
  // FIXME: very slow function
  function mergePrefs() {
    Array.prototype.push.apply(prefs_all, prefs_hokkaido);
    Array.prototype.push.apply(prefs_all, prefs_tohoku);
    Array.prototype.push.apply(prefs_all, prefs_kanto);
    Array.prototype.push.apply(prefs_all, prefs_chubu);
    Array.prototype.push.apply(prefs_all, prefs_kinki);
    Array.prototype.push.apply(prefs_all, prefs_chugoku);
    Array.prototype.push.apply(prefs_all, prefs_shikoku);
    Array.prototype.push.apply(prefs_all, prefs_kyushu);
  }

  mergePrefs();
  // FIXME: more concrete var name
  var chxs = document.getElementById("prefs_select");
  var prefs_checkbox = "除外する都道府県にチェック : ";
  for(var i = 0; i < prefs_all.length; i++) {
    if(i%5 == 0) {
      prefs_checkbox += "<br>";
    }
    prefs_checkbox += "<input type='checkbox' name='prefs' value='"+prefs_all[i]+"'>"+prefs_all[i]+"  ";
  }
  chxs.innerHTML = prefs_checkbox;
}

function getCheckboxStatus() {
  var elements = document.getElementById("prefs");
  for(var i = 0; i<elements.length; i++) {
    console.log(elements[i].value);
  }
}
