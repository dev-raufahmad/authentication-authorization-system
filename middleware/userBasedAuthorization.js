const userBasedAuthorization = (...arg) => {
    return function (req ,res , next) {
        console.log("The arg in the userbasedauthentication is : " , arg);
        
        let result = false;
        arg.forEach((e) => {
            if(req.user.role == e){
                result = true;
            }
        })
        console.log("The result is : " , result);
        
        if(!result) return res.json({ message : "You are not authorized to access this route" });
        return next();
    }
}


module.exports = userBasedAuthorization