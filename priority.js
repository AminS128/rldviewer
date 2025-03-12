var prioritylist = JSON.parse(localStorage.getItem('priorityList') || "[]")
// contains objects from the processed data (returned from dostuff())

function saveList(list=prioritylist){
    localStorage.setItem('priorityList', JSON.stringify(list))
}

function loadList(list=prioritylist){// more like display than load, wtv

    const base = document.getElementById('listbase')
    base.innerHTML = ""
    const sample = document.getElementById('sample')

    for(var i = 0; i < list.length; i ++){
        // console.log(list)
        const newe = sample.cloneNode(true)
        newe.removeAttribute('id')
        newe.className = ""// remove hidden
        newe.innerHTML = newe.innerHTML
        .replace("[[T]]", list[i].team)
        .replace("[[C]]", 
            (list[i].l4 ? "L4 " : "") +
            (list[i].l3 ? "L3 " : "") + 
            (list[i].doesAlgae ? "Algae " : "") +
            (list[i].auto.coral ? "Auto " : "") + // only counts coral in auto, since moving is p much always and algae doesnt happen
            (list[i].cage == 2 ? "Deep" : (list[i].cage == 1 ? "Shallow" : ""))
        )
        .replace("[[N]]", list[i].notes)

        const moveListener = function(e){// movelistener for elements with a mousedown/mouseup, to be added and removed as needed
            newe.style.position = 'fixed'
            // console.log(e)
            const offset = 10
            newe.style.left = e.pageX - offset + "px"
            newe.style.top = e.pageY - offset + "px"
            // console.log(newe)
            // console.log(newe)
        }

        newe.children[0].addEventListener('mousedown', (e)=>{
            console.log('on')
            window.addEventListener('mousemove', moveListener)

        })
        newe.children[0].addEventListener('mouseup', (e)=>{
            console.log('off')

            window.removeEventListener('mousemove', moveListener)

            // reorder
            var newIndex = 0
            while (
                (base.children[newIndex].getBoundingClientRect().top + window.scrollY + base.children[newIndex].getBoundingClientRect().height/2 < e.pageY 
                && newIndex < base.children.length-1) || (base.children[newIndex] == newe)){
                newIndex++
                // console.log(base.children[newIndex].getBoundingClientRect().top + window.scrollY)
            }

            console.log(newIndex)
            var temp = prioritylist.splice(Array.prototype.indexOf.call(base.children, newe), 1)[0]
            prioritylist.splice(newIndex, 0, temp)
            
            saveList()
            loadList()
        })

        // console.log(newe.children)
        // i LOVE hardcoded indeces
        const a = i
        newe.children[3].addEventListener('input', ()=>{// tried focusout, definitely more efficient but bugged w drag reordering
            prioritylist[a].notes = newe.children[3].innerText
            // console.log(newe.children[3].innerText)
            saveList()// how it feels to write to localstorage twice a second
        })

        base.appendChild(newe)
    }
}

function addToList(n){
    var topush = results[n];

    if(!topush){console.log("no data on team");
        topush = {team:n, auto:{}, notes:"no data"}
    }// null, undefined, etc (empty object is truthy)

    //item taken from computed results, same format
    prioritylist.push(topush)
    saveList()
    loadList()
}

function removeFromList(n){
    for(var i = 0; i < prioritylist.length; i++){
        if(prioritylist[i].team == n){
            prioritylist.splice(i, 1)
            saveList()
            loadList()
            return true
        }
    }
    return false
}


loadList()