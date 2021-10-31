//select * from users where username = "dror" limit 1;

let username = req.body.username //dror or 1=1


let sql = "select * from users where username = " + username + " limit 1;"

"select * from users where username = :username limit 1;", [{username: "dror"}]