"use strict";

// JP pref list
// TODO: more plain format (using DB?)
const PREF_HOKKAIDO = ["北海道"];
const PREF_TOHOKU   = ["青森県", "岩手県", "秋田県", "宮城県", "山形県", "福島県"];
const PREF_KANTO    = ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"];
const PREF_CHUBU    = ["山梨県", "長野県", "新潟県", "富山県", "石川県", "福井県", "静岡県", "愛知県", "岐阜県"];
const PREF_KINKI    = ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"];
const PREF_CHUGOKU  = ["鳥取県", "島根県", "岡山県", "広島県", "山口県"];
const PREF_SHIKOKU  = ["香川県", "愛媛県", "徳島県", "高知県"];
const PREF_KYUSHU   = ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];
var PREF_ALL = new Array();

// Bootstrap button className define
// choose from: default, primary, success, info, warning, danger, link
const BTN_CLASSNAME_CAN_BE_SELECTED     = 'btn btn-primary';
const BTN_CLASSNAME_CAN_NOT_BE_SELECTED = 'btn btn-default';
const BTN_CLASSNAME_NOW_SELECTED        = 'btn btn-warning';
const BTN_CLASSNAME_RESULT              = 'btn btn-danger';

// const parameters
const ROULETTE_SPEED_DEFAULT     = 100;  // [ms]
const ROULETTE_SPEED_UPPER_LIMIT = 6000; // [ms]
const TIME_TO_CLEAR_MIN          = 50;   // [ms]
const TIME_TO_CLEAR_MAX          = 5000; // [ms]
const TIME_TO_CLEAR_ADDED_MAX    = 700;  // [ms]

// other global var
var gPrefIdx = new Array();
var gPrefElem;              // used as "gPrefElem[gPrefIdx[i]]"
var gNowSelected;
var gRouletteTimeoutID;

function changeButtonStatus(e) {
  if(e.className == BTN_CLASSNAME_CAN_BE_SELECTED) {
    e.className = BTN_CLASSNAME_CAN_NOT_BE_SELECTED;
  }
  else {
    e.className = BTN_CLASSNAME_CAN_BE_SELECTED;
  }
}

function loopRoulette(intervalTime) {
  moveRoulette();
  gRouletteTimeoutID = setTimeout(function() { loopRoulette(intervalTime); }, intervalTime);
}


function moveRoulette() {
  gNowSelected = (gNowSelected+1)%gPrefIdx.length;
  var idx_old = gNowSelected-1;
  if(idx_old < 0) {
    idx_old = gPrefIdx.length-1;
  }
  gPrefElem[gPrefIdx[idx_old]].className = BTN_CLASSNAME_CAN_BE_SELECTED;
  gPrefElem[gPrefIdx[gNowSelected]].className = BTN_CLASSNAME_NOW_SELECTED;
}

function startRoulette(e) {
  e.disabled = true;
  var elem = document.getElementsByName("pref");
  var length_org = PREF_ALL.length;
  for(var i=0; i<length_org; i++) {
    elem[i].onclick = "";
    if(elem[i].className == BTN_CLASSNAME_CAN_BE_SELECTED) {
      gPrefIdx.push(i);
    }
    else {
      elem[i].disabled = true;
    }
  }
  gPrefElem = document.getElementsByName("pref");
  gNowSelected = Math.round(Math.random()*gPrefIdx.length);
  loopRoulette(ROULETTE_SPEED_DEFAULT);
}

function stopRoulette(e) {
  function struggleRoulette(intervalTime) {
    var timeToStop = TIME_TO_CLEAR_MAX*Math.random()+TIME_TO_CLEAR_MIN;
    loopRoulette(intervalTime);
    setTimeout(function() {
      clearTimeout(gRouletteTimeoutID);
      intervalTime += TIME_TO_CLEAR_ADDED_MAX*Math.random();
      if(intervalTime < ROULETTE_SPEED_UPPER_LIMIT) {
        struggleRoulette(intervalTime);
      }
      else {
        gPrefElem[gPrefIdx[gNowSelected]].className = BTN_CLASSNAME_RESULT;
        resultInfo();
      }
    }, timeToStop);
  }

  e.disabled = true;
  clearTimeout(gRouletteTimeoutID);
  var intervalTime = ROULETTE_SPEED_DEFAULT;
  struggleRoulette(intervalTime);
}

function resultInfo() {
  var link2Sightseeing = "https://www.google.co.jp/search?q=" + PREF_ALL[gPrefIdx[gNowSelected]] + "+観光";
  var infoBtnHtml = "<br>";
  infoBtnHtml += "<button type='button' class='" + BTN_CLASSNAME_RESULT;
  infoBtnHtml += "' onclick=\"window.open('" + link2Sightseeing + "')\">";
  infoBtnHtml += "\"" + PREF_ALL[gPrefIdx[gNowSelected]] + " 観光\" on Google" + "</button>";
  console.log(infoBtnHtml);
  document.getElementById("resultID").innerHTML = infoBtnHtml;
}

function init() {
  function mergepref() {
    Array.prototype.push.apply(PREF_ALL, PREF_HOKKAIDO);
    Array.prototype.push.apply(PREF_ALL, PREF_TOHOKU);
    Array.prototype.push.apply(PREF_ALL, PREF_KANTO);
    Array.prototype.push.apply(PREF_ALL, PREF_CHUBU);
    Array.prototype.push.apply(PREF_ALL, PREF_KINKI);
    Array.prototype.push.apply(PREF_ALL, PREF_CHUGOKU);
    Array.prototype.push.apply(PREF_ALL, PREF_SHIKOKU);
    Array.prototype.push.apply(PREF_ALL, PREF_KYUSHU);
  }

  function createBtnHtml(btnLabel) {
    var btnHtml = "<button type='button' name='pref' class='" + BTN_CLASSNAME_CAN_BE_SELECTED + "' onclick='changeButtonStatus(this)'>";
    btnHtml += btnLabel + "</button>";
    return btnHtml;
  }

  mergepref();

  var btnInnerHtml = "";
  for(var i=0; i<PREF_ALL.length; i++) {
    btnInnerHtml += createBtnHtml(PREF_ALL[i]);
  }
  document.getElementById("prefBtnID").innerHTML = btnInnerHtml;
}
