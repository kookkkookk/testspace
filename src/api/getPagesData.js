import $axios from 'axios';

let getPagesDate = function(dataPath) {
    let saveData = null;
    return new Promise(function (resolve, reject) {
        $axios.get(dataPath).then((response) => {
            if (location.hostname === "localhost") {
                //this.homeData = JSON.parse(JSON.stringify(response.data).replace(/.\/images\//g, "src/images/"));
                saveData = JSON.parse(JSON.stringify(response.data).replace(/.\/images\//g, "src/images/"));
                //console.log("getPagesDate's json: ", saveData);
            } else {
                //this.homeData = response.data;
                saveData = response.data;
            }
            resolve(saveData);
        }).catch((error) => {
            //console.log("!ERROR: Ajax " + dataPath + " fail: " + error);
            reject("!ERROR: Ajax " + dataPath + " fail: " + error);
        }).then(() => {
            //console.log("Success getPagesData");
        });
    })
}

export default getPagesDate;