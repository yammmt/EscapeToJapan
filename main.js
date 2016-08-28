// JP prefs list
// TODO: more plain pref's format (using DB?)
const prefs_hokkaido = ["北海道"];
const prefs_tohoku = ["青森県", "岩手県", "秋田県", "宮城県", "山形県", "福島県"];
const prefs_kanto = ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"];
const prefs_chubu = ["山梨県", "長野県", "新潟県", "富山県", "石川県", "福井県", "静岡県", "愛知県", "岐阜県"];
const prefs_kinki = ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"];
const prefs_chugoku = ["鳥取県", "島根県", "岡山県", "広島県", "山口県"];
const prefs_shikoku = ["香川県", "愛媛県", "徳島県", "高知県"];
const prefs_kyushu = ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];
const prefs_all = new Array();

// Bootstrap className define
// choices: default, primary, success, info, warning, danger, link
const btn_classname_selected = 'btn btn-primary'
const btn_classname_not_selected = 'btn btn-default';

function changeButtonStatus(e) {
  console.log(e.className);
  if(e.className == btn_classname_selected) {
    e.className = btn_classname_not_selected;
  }
  else {
    e.className = btn_classname_selected;
  }
}

function init() {
  // FIXME: this might be a very slow function
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

  function createButtonHTML(btn_name) {
    var html_created = "<button type='button' class='" + btn_classname_selected + "' onclick='changeButtonStatus(this)'>";
    html_created += btn_name + "</button>";
    return html_created;
  }

  mergePrefs();

  // TODO: more concrete and readable var name
  prefs_btn_innerHTML = "";
  for(var i=0; i<prefs_all.length; i++) {
    /*
    if(i%7 == 0) {
      prefs_btn_innerHTML += "<br>";
    }
    */
    //prefs_btn_innerHTML += "<button type='button' class='btn btn-success' onclick='changeButtonStatus(this)'>"+prefs_all[i]+"</button>";
    prefs_btn_innerHTML += createButtonHTML(prefs_all[i]);
  }
  document.getElementById("prefs_btn").innerHTML = prefs_btn_innerHTML;
}
