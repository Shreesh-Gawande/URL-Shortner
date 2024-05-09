const sessionIdToUserMap=new Map();  //This is basically the diary in which server keep track of all the ids

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}


module.exports={
    setUser,
    getUser,
}