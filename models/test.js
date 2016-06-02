/**
 * Created by 小敏哥 on 2016/5/26.
 */

var fs = require('fs');
var path = require('path');
var COMMENTS_FILE = path.join( '../comments.json');
function User(user) {
    this.name = user.name;
    this.password = user.password;

    this.getUser=function(name,callback){
        fs.readFile(COMMENTS_FILE, function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
           var users= JSON.parse(data);
            var user=null;
            for(var i=0;i<users.length;i++){
                if(users[i].name==name){
                    user=users[i];
                    break;
                }
            }
            callback(user);
        });
    }
}
module.exports = User;