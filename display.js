
const ignorelist = [
    'Record Time',
    'Record Time Client',
    'Submit button',
    'User ID',
    'algae button',// button values in the json, not needed
    'coral button',
    'level 1 butto',
    'level 2 butto',
    'level 3 butt',
    'level 4 butt',
    'rid',
    'set up tab',
    'setup tab',
    'teleop tab',
    'state code',// since this is probably known
    'year',// probably known
    'comp name',// ..
    'comp codes',// ..
    'auto tab',
    'end tab',
    'cancel algae',
    'cancel',
    'serverCreatedAt',
    'dropped button',
    'coralTotal'
]// tags to ignore when displaying data

const listlist = [// list of keys which correspond to fields which are a list of timestamps rather than a counter
    'level-1',
    'level-2',
    'level-3',
    'level-4',
    'net',
    'processor'
]



function displayDataR(element, toLoad, n=0){

    // takes data from data var

    if(toLoad == null || toLoad == undefined){return}


    const keys = Object.keys(toLoad)
    if(keys == [] || keys == undefined || typeof toLoad == 'string' || typeof toLoad == 'number' || typeof toLoad == 'boolean'){
        
        element.innerText+=": " + String(toLoad)

    return}

    if(n > 10){return}// shouldnt happen





    for(var i = 0; i < keys.length; i ++){
        if(ignorelist.includes(keys[i])){continue}

        if(toLoad[keys[i]]==null){continue}
        if(toLoad[keys[i]]==0){continue}

        //hardcoding for specific key values
        if(listlist.includes(keys[i])){
            const ndiv = document.createElement('div')
            ndiv.className = "con" + ((n%2)+1)
            ndiv.innerText=keys[i] + ": " + (toLoad[keys[i]].length || 1)
            // ndiv.innerText.replace('undefined', '1')// lmao
            element.appendChild(ndiv)
            continue
        }


        const ndiv = document.createElement('div')
        ndiv.className = "con" + ((n%2)+1)
        ndiv.innerText=keys[i]

        element.appendChild(ndiv)
        displayDataR(ndiv, toLoad[keys[i]], n+1)
    }

}

function displayData(toLoad=data){
    document.getElementById('base').innerHTML = ''//clear
    displayDataR(document.getElementById('base'), toLoad, 0)
}


displayData(results)