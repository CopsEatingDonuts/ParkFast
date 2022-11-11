import rp from 'request-promise';
import cheerio from 'cheerio';
import fs from 'fs';

var splitList;
var addList;

const motorist = "https://www.motorist.sg/article/1198/shell-petrol-stations-in-singapore-locations-amenities-promotions";
const coordArr = ["1.345900,103.772130", "1.330950,103.799088", "1.3233836,103.817211", "1.3188807,103.8498033", "1.3109855,103.8422092", "1.3113138,103.843093", "1.3145675,103.8572805", "1.3241824,103.8421185", "1.3765569,103.8450682", "1.3445414,103.8646073", "1.3484698,103.8385906", "1.3698889,103.8278812", "1.3837092,103.8770875", "1.4406178,103.8244401", "1.3632352,103.8673705", "1.3512683,103.8354918", "1.3411375,103.8486859", "1.3725206,103.8285173", "1.4443631,103.7900217", "1.411321,103.7565357", "1.3606496,103.8739062", "1.4308124,103.8329278", "1.2906332,103.8068428", "1.3723075,103.7634489", "1.2975968,103.80331", "1.2899571,103.8324041", "1.2868381,103.834442", "1.2893335,103.8030384", "1.2704565,103.8127722", "1.2884921,103.8196336", "1.3385659,103.7769836", "1.3188139,103.9128849", "1.309839,103.9011338", "1.308194,103.909739", "1.312054,103.8755513", "1.3106081,103.8838043", "1.3493329,103.8901426", "1.3310919,103.8777589", "1.3655932,103.9673141", "1.331794,103.8887307", "1.32166,103.8918029", "1.4044292,103.9065938", "1.3916522,103.8927167", "1.3125951,103.9265486", "1.3308566,103.9476548", "1.3491458,103.9476641", "1.3109736,103.8945187", "1.3440594,103.7077874", "1.3477255,103.7648458", "1.3502571,103.7383781", "1.3856025,103.7465211", "1.3235028,103.721767", "1.3501047,103.701183", "1.4382507,103.7753087" , "1.277378,103.7896821", "1.2893262,103.7778664", "1.2891371,103.6255772"]

rp(motorist).then(function(html){
    var motor = cheerio.load(html);
    var motorList = [];
    for (var i=7; i<68; i++) {
      var argument = "body > main > div > div.container.pt-5.pb-0 > div > div > div.article-body.fr-view > p:nth-child(" + i.toString() + ")"
      motorList.push(motor(argument).html());
    } //shell addresses

    motorList = motorList.filter(function (el) {
      return el != null;
    });


    var smallArr;
    var smallDict;
    var bigArr = [];

    for (var i=0; i<motorList.length; i++) {

      smallArr = [];
      smallDict = {};
      smallArr.push(motorList[i]);
      smallArr = smallArr[0].split("<br>");
      smallArr[0] = smallArr[0].split("<strong>")[1];
      smallArr[0] = smallArr[0].split("</strong>")[0];
      if (smallArr[2] == '6767 9189') {
        smallArr[2] = smallArr[3];
        smallArr[2] = smallArr[2].split("Services: ")[1];
      }
      else smallArr[2] = smallArr[2].split("Amenities: ")[1];

      smallDict.Name = smallArr[0];
      smallDict.Address = smallArr[1];
      smallDict.Amenities = smallArr[2];
      smallDict.Recharge = false;
      smallDict.Coordinates = coordArr[i];
      if (smallArr[2].includes("Recharge")) smallDict.Recharge = true;
      bigArr.push(smallDict);
    }

console.log(bigArr);

//write this to file

fs.writeFile('ShellScrape.json', JSON.stringify(bigArr), (err) => {
   if (err) throw err;
   console.log('Shell location details updated');
   });



})
