

let countDownEl =  document.querySelector('.time')


// let total_seconds = 60*25
// let c_minutes = Math.floor(parseInt(total_seconds/60))
// let c_seconds = Math.floor(parseInt(total_seconds%60))


// function updateCountDown(){
//     if(total_seconds <= 0){
//         console.log('project over')
//     }else{
//         total_seconds--;
//         c_minutes = Math.floor(parseInt(total_seconds / 60))
//         c_seconds = Math.floor(parseInt(total_seconds % 60))
//         c_seconds = c_seconds < 10 ? '0' + c_seconds : c_seconds
//         countDownEl.innerHTML = `${c_minutes} : ${c_seconds} mins`
//         setTimeout('updateCountDown'(), 1000);
//     }
// }

let duration = 2
let hourInDay = (60 * 60) * 24 / 3600
let day = hourInDay/24
let month = 30  * day
let realtime = duration * month



console.log(realtime)

setInterval(updateCountDown, 1000)