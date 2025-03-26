// gets number of contributions from each email, sorts them
function getContributors(){
    let contributors = []
    for(var i = 0; i < data.length; i ++){
        let a = false
        for(var ii = 0; ii < contributors.length; ii++){
            if(contributors[ii].n==data[i]["User Email"]){
                contributors[ii].c++ // peak mentioned
                a=true
                break
            }
        }
        if(!a){
            contributors.push({
                n:data[i]["User Email"],
                c:1
            })}
    }

    for(var i = 0; i < contributors.length; i++){
        var maxi = i;// max index
        for(var ii = i; ii < contributors.length; ii ++){
            if(contributors[maxi].c < contributors[ii].c){
                maxi = ii
            }
        }
        let temp = contributors[i]
        contributors[i] = contributors[maxi]
        contributors[maxi] = temp
    }

    return contributors
}