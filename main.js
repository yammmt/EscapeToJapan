// JP pref list
// TODO: more plain format (using DB?)
const pref_hokkaido = ["北海道"];
const pref_tohoku = ["青森県", "岩手県", "秋田県", "宮城県", "山形県", "福島県"];
const pref_kanto = ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"];
const pref_chubu = ["山梨県", "長野県", "新潟県", "富山県", "石川県", "福井県", "静岡県", "愛知県", "岐阜県"];
const pref_kinki = ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"];
const pref_chugoku = ["鳥取県", "島根県", "岡山県", "広島県", "山口県"];
const pref_shikoku = ["香川県", "愛媛県", "徳島県", "高知県"];
const pref_kyushu = ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];
var pref_all = new Array();

// Bootstrap button className define
// choices: default, primary, success, info, warning, danger, link
const btn_classname_can_be_selected = 'btn btn-primary';
const btn_classname_can_not_be_selected = 'btn btn-default';

// const parameters
const roulette_speed = 300; // [ms]
const time_to_stop_max = 7000; // [ms]

// var index array
var pref_idx = new Array();

// other global var
var pref_elem; // used as "pref_elem[pref_idx[i]]""
var now_selected = 0;
var roulette_timeoutID;

function changeButtonStatus(e) {
  if(e.className == btn_classname_can_be_selected) {
    e.className = btn_classname_can_not_be_selected;
  }
  else {
    e.className = btn_classname_can_be_selected;
  }
}

function loopRoulette() {
  moveRoulette();
  roulette_timeoutID = setTimeout(loopRoulette, roulette_speed);
}

// FIXME: this might be a very slow function
function moveRoulette() {
  var idx_old = now_selected-1;
  if(idx_old < 0) {
    idx_old = pref_idx.length-1;
  }
  // console.log("pref_idx.length:" + pref_idx.length);
  // console.log("idx_old:" + idx_old);
  // console.log("pref_idx[idx_old]:" + pref_idx[idx_old]);
  pref_elem[pref_idx[idx_old]].className = btn_classname_can_be_selected;
  pref_elem[pref_idx[now_selected]].className = "btn btn-warning";
  now_selected = (now_selected+1)%pref_idx.length;
}

function startRoulette(e) {
  e.disabled = true;
  var elem = document.getElementsByName("pref");
  var length_org = pref_all.length;
  for(var i=0; i<length_org; i++) {
    if(elem[i].className == btn_classname_can_not_be_selected) {
      elem[i].disabled = true;
    }
    else {
      pref_idx.push(i);
    }
  }
  pref_elem = document.getElementsByName("pref");
  loopRoulette();
}

// TODO: create this function
function stopRoulette(e) {
  e.disabled = true;
  setTimeout(function() {clearTimeout(roulette_timeoutID)}, time_to_stop_max*Math.random()+3.0);
}

function init() {
  // FIXME: this might be a very slow function
  function mergepref() {
    Array.prototype.push.apply(pref_all, pref_hokkaido);
    Array.prototype.push.apply(pref_all, pref_tohoku);
    Array.prototype.push.apply(pref_all, pref_kanto);
    Array.prototype.push.apply(pref_all, pref_chubu);
    Array.prototype.push.apply(pref_all, pref_kinki);
    Array.prototype.push.apply(pref_all, pref_chugoku);
    Array.prototype.push.apply(pref_all, pref_shikoku);
    Array.prototype.push.apply(pref_all, pref_kyushu);
  }

  function createButtonHTML(btn_name) {
    var html_created = "<button type='button' name='pref' class='" + btn_classname_can_be_selected + "' onclick='changeButtonStatus(this)'>";
    html_created += btn_name + "</button>";
    return html_created;
  }

  mergepref();

  // TODO: more concrete and readable var name
  pref_btn_innerHTML = "";
  for(var i=0; i<pref_all.length; i++) {
    pref_btn_innerHTML += createButtonHTML(pref_all[i]);
  }
  document.getElementById("pref_btn").innerHTML = pref_btn_innerHTML;
}
