var request = require('request');
var fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
var tokens = JSON.parse(fs.readFileSync('YOUR MCD TOKEN.json','utf8').toString())
options={}
const bot = new TelegramBot('YOUR BOT TOKEN', {polling: true});
async function start(){
    for (var token in tokens){
        const checkPromise = () => new Promise(resolve => {
            // console.log(token)
            options[token]= {
                url: 'https://mcdapp1.azurewebsites.net/lottery/get_item',
                headers: {
                    'Content-Type': 'application/json'
                },
                json: {
                      "access_token": token,
                      "source_info": {
                        "app_version": tokens[token].app_version,
                        "device_time": tokens[token].device_time,
                        "device_uuid": tokens[token].device_uuid,
                        "model_id": tokens[token].model_id,
                        "os_version": tokens[token].os_version,
                        "platform": tokens[token].platform
                        }
                    }
            }
            request.post(options[token], function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var object = JSON.stringify(body)
                    var sendtoken = options[token].json.access_token
                    console.log(`${sendtoken}:${object}`)
                    bot.sendMessage(YOUR CHAT ID, `${sendtoken}:${object}`).then(()=>{ 
                            resolve()
                    })
                }
            })
        })
        await checkPromise()
    }
}
start().then(()=>{
    process.exit(0)
})
 
