
var ConnectedToAccount = false;
var AccountRealName = "";
var AccountName = "Player_"+Math.floor(Math.random()*99999);
var AccountEmail = "";
var AccountIcon = "resources/login/guest.png";
var AccountDefaultIcon = "resources/login/guest.png";
var AccountUid = "";
var AccountTotalPoints = 0;
var AccountCoins = 100000;
var AccountRank = 99999;
var AccountGamePlayed = 0;
var AccountAveragePlacement = 0;
var AccountSaveString = "";
var AccountloadString = "";

var AccountFirstLogin = false;

var HiScores = [];
var HiScoreScope = 0;

function Login_CheckLoged() {}

function Login_OpenWindow() {}



function Login_CloseWindow() {}

function Login_SetAvatar(el) {}

function Login_ShowAvatar() {}


function ConnectDisconnect(Type) {}

function updateConnectIcon() {}


function Auth_UpdateScore ()
{
  se_savePref ("AccountGamePlayed", AccountGamePlayed);
  se_savePref ("AccountAveragePlacement", AccountAveragePlacement);
  se_savePref ("AccountCoins", AccountCoins);
  se_savePref ("AccountSaveString", AccountSaveString);
  se_savePref ("AccountTotalPoints", AccountTotalPoints);
  se_savePref ("AccountName", AccountName);
}

function Auth_GetPref ()
{
 var TempValue;
 TempValue = se_GetPref("AccountGamePlayed"); if (TempValue>0) AccountGamePlayed = TempValue; else AccountGamePlayed = 0;
 TempValue = se_GetPref("AccountAveragePlacement"); if (TempValue>0) AccountAveragePlacement = TempValue; else AccountAveragePlacement = 0;
 TempValue = se_GetPref("AccountTotalPoints"); if (TempValue>0) AccountTotalPoints = TempValue; else AccountTotalPoints = 0;
 TempValue = se_GetPref("AccountCoins"); if (TempValue>0) AccountCoins = TempValue; else AccountCoins = 50000;

 TempValue = se_GetStringPref ("AccountName");  try {if (TempValue.length>3) AccountName = TempValue;} catch {AccountName = "Player_"+Math.floor(Math.random()*99999);}
 TempValue = se_GetStringPref ("AccountSaveString");  try {if (TempValue.length>3) AccountloadString = TempValue;} catch {AccountloadString = "";}

}
