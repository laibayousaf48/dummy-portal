export const isEmail = email => {
    if(email.toString().trim().length === 0) {
        return 'Email is required'
    }
    if(email.toString().indexOf('@') === -1) {
        return 'Email is not in proper format'
    }
    return true 
}

export const  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

/** For Rightcol Tabs */
export function toggleRCTabs(event, tabname){
    window.document.querySelectorAll('#rc-header ul li').forEach((elem)=>{
        elem.classList.remove('active');
    });
    window.document.querySelectorAll('.rc-tab').forEach((elem)=>{
        elem.classList.remove('active');
    });
    window.document.querySelector(`.rc-tab[data-tabname=${tabname}]`).classList.add('active')
    event.target.classList.add('active');
}

/** For Leftcol Tabs */
export function toggleLCTabs(event, tabname){
    window.document.querySelectorAll('#lc-header ul li').forEach((elem)=>{
        elem.classList.remove('active');
    });
    window.document.querySelectorAll('.lc-tab').forEach((elem)=>{
        elem.classList.remove('active');
    });
    window.document.querySelector(`.lc-tab[data-tabname=${tabname}]`).classList.add('active')
    event.target.classList.add('active');
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

export function isValidEmail(email) {
    let r = String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return (r !== null)
}

export function convertDateToMysqlDatetime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

export function convertDateToReadableDate(date) {
    date = date instanceof Date ? date : new Date(date)
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() 
}

export function calculateDistance(latlng1, latlng2, unit = 'm', percision = 2) {
    var latlng1Arr = latlng1.toString().split(",");
    var latlng2Arr = latlng2.toString().split(",");

    var lat1 = parseFloat(latlng1Arr[0]);
    var lng1 = parseFloat(latlng1Arr[1]);
    var lat2 = parseFloat(latlng2Arr[0]);
    var lng2 = parseFloat(latlng2Arr[1]);

    var theta = lng1 - lng2;

    const degreeToRadian = (degrees) => {
        var pi = Math.PI;
        return degrees * (pi/180);
    }

    const radianToDegree = (radians) => {
        var pi = Math.PI;
        return radians * (180/pi);
    }

    var distance = Math.sin(degreeToRadian(lat1)) * Math.sin(degreeToRadian(lat2)) + Math.cos(degreeToRadian(lat1)) * Math.cos(degreeToRadian(lat2)) * Math.cos(degreeToRadian(theta));
    distance = Math.acos(distance);
    distance = radianToDegree(distance);

    var res = distance * 60 * 1.1515; // miles
    switch(unit) {
      case "m":
      case "miles":
        res = res;
      break;
      case "n":
      case "nautical":
        res = res * 0.8684;
      break;
      case "k":
      default:
        res = res * 1.609344;
    }
    return res.toFixed(percision);
}

export function toSentenceCase(text) {
    return text.split(' ').map(word => ["to", "of", "in", "by", "and"].includes(word) ? word : word[0].toUpperCase() + word.substring(1)).join(" ")
}