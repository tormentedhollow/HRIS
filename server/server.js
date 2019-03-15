var express = require('express'); // Express App include
var app = express();
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var multer = require('multer');
//var fs = require('fs');
var crypto = require("crypto");
//var cors = require('cors');
var path = require('path');
var fs = require('fs');
var staticRoot = __dirname + '/../dist'; 
var DIR = __dirname + '/../dist/assets/photo'; 


 var db_config = {
    host     : '172.16.130.8',
    user     : 'pmis',
    password : 'pmis',
    database : 'hris',
    multipleStatements: true
 }
 
 /*var connection = mysql.createConnection({
   host     : '172.16.130.8',
   user     : 'pmis',
   password : 'pmis',
   database : 'hris',
   multipleStatements: true
 });

 connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});*/

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
handleDisconnect();


http.listen(3001,function(){  
    console.log("All right ! I am alive at Port 3001.");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(staticRoot));

app.get('/', function (req, res) {
res.sendFile(path.join(staticRoot,'index.html'))
});


app.get('*', function (req, res) {
    res.sendFile(path.join(staticRoot,'index.html'));
   });

//app.use(cors());

var storage = multer.diskStorage({
        destination: function(req, file, cb) {
                cb(null, DIR)
        },
        filename: function(req, file, cb) {
                crypto.pseudoRandomBytes(5, function(err, raw) {
                        cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname);
                });
        }
});

var upload = multer({ storage: storage });
 

app.post('/upload', upload.any(), function(req, res, next) {
    console.log(req.files[0].filename);
    connection.query('UPDATE pi SET Photo = ? where PI_ID = ?', [req.files[0].filename, req.query.id], function (error, results, fields) {
     if (error) throw error;
        res.end('file uploaded');
        console.log('uploaded');
    });
});


app.post('/authenticate',function(req,res){
    console.log(req.body);
    var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
    var table = ["user", "Uname", req.body.username, "Pword", req.body.password];
    query = mysql.format(query,table);
    console.log(query);
    var data = {}; 
    connection.query(query,function(err, rows, fields){
        if(rows.length != 0){
            data["data"] = rows;
            res.json(data);

        }else{

            var query1 = "SELECT * FROM ?? WHERE ??=? and ??=?";
            var table1 = ["pi", "Sname", req.body.username, "Mname", req.body.password];
            query1 = mysql.format(query1,table1);
            //console.log(query);
            var data1 = {};    
            connection.query(query1,function(err, rows, fields){
                if(rows.length != 0){
                    data1["data"] = rows;
                    res.json(data1);

                }else{
                    data1["data"] = false;
                    res.json(data1);
                }
            });

            //data["data"] = false;
            //res.json(data);
        }
    });
});

app.post('/addPDS',function(req,res){
    var data = {};
    //console.log(req.body);
    var pi = req.body.f;

    var sql = `INSERT INTO pi(
      Sname, Fname, Mname, Extname, DoB, 
      PoB, sex, civil_status, citizenship, Height, 
      Weight, BT, GSIS_ID, PAGIBIG_ID, PHILHEALTH_ID, 
      SSS_ID, R_Address, R_ZipCode, R_Tel, P_Address, 
      P_ZipCode, P_Tel, Email, Cell, A_Emp_ID, TIN,
      s_surname, s_firstname, s_middlename, s_occupation, s_employer, s_tel,
      f_surname, f_firstname, f_middlename,
      m_surname, m_firstname, m_middlename)
    VALUES (?, ?, ?, ? ,?, ?, ?, ?, ? , ?, ?, ?, ?, ? ,?, ?, ?, ?, ? , ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;  
    connection.query(String(sql),[
      pi.surname, pi.first, pi.middle, pi.ext, pi.bday, 
      pi.pob, pi.sex, pi.cs, pi.citizenship, pi.height, 
      pi.weight, pi.bloodtype, pi.gsis, pi.pagibig, pi.phno, 
      pi.sss, pi.address, pi.zipcode, pi.telno, pi.address2, 
      pi.zipcode2, pi.telno2, pi.email, pi.cellno, pi.empno, pi.tin,
      pi.spouseSurname, pi.spouseFirst, pi.spouseMiddle, pi.spouseOccupation, pi.spouseEmployer, pi.spouseTel,
      pi.FatherSurname, pi.FatherFirst, pi.FatherMiddle,
      pi.MotherSurname, pi.MotherFirst, pi.MotherMiddle
    ],function(err, result){
         if (err) throw err;
        data["error"] = 0;
        data["data"] = result;
        console.log(result.insertId);
        var children =  req.body.c;
        var education =  req.body.e;

        children.map(function(value) { 
            var post  = {name: value.name , DoB: value.bday2, PI_ID: result.insertId};
            var query = connection.query('INSERT INTO fb_child SET ?', post, function (error, results, fields) {
            if (error) throw error;
            // Neat!
            });
        });

        education.map(function(value) { 
            console.log(value);
            var post  = {Level: value.level, School_Name: value.school , Degree: value.course, Year_Grad: value.yg, Highest_GLUE: value.hg, IDA_From: value.from, IDA_To: value.to, SAHR: value.scholarship, PI_ID: result.insertId};
            var query = connection.query('INSERT INTO eb SET ?', post, function (error, results, fields) {
            if (error) throw error;
            // Neat!
            });
        });

        res.send(data);
        
    });
});
 

    app.post('/addPDS2',function(req,res){
        var data = {};
        console.log(req.body);
        var civil =  req.body.c;
        var work =  req.body.w;
        console.log(req.body.id);

        civil.map(function(value) { 
            var post  = {CS: value.cs , Rating: value.rating, DoEC: value.doe, 	PoEC: value.poe, License_Num: value.ln, License_DoR: value.dor, PI_ID: req.body.id };
            var query = connection.query('INSERT INTO cse SET ?', post, function (error, results, fields) {
            if (error) throw error;
            });
        });

        work.map(function(value) { 
        if(value.to == "") value.to = null;
            var post  = { _from: value.from, _to: value.to, position: value.position, salary: value.salary, sg: value.sg, status: value.status, gov_service: value.gs, PI_ID: req.body.id };
            var query = connection.query('INSERT INTO we SET ?', post, function (error, results, fields) {
            if (error) throw error;
            });
        });
        data["data"] = 1;
        res.send(data);
        
    });

    app.post('/addPDS3',function(req,res){
        var data = {};
        console.log(req.body);
        var voluntaries =  req.body.v;
        var trainings =  req.body.t;
        var skills =  req.body.s;
        var nonacademics =  req.body.n;
        var membership =  req.body.m;
        console.log(req.body.id);

        voluntaries.map(function(value) { 
            var post  = {Org_Name: value.name , IDA_From: value.from, IDA_To: value.to, Hours: value.hours, PosNoW: value.position, PI_ID: req.body.id };
            var query = connection.query('INSERT INTO vwi SET ?', post, function (error, results, fields) {
            if (error) throw error;
            });
        });

        trainings.map(function(value) { 
            var post  = { Title: value.title , IDA_From: value.from, IDA_To: value.to, Hours: value.hours, Conducted_By: value.conducted, PI_ID: req.body.id };
            var query = connection.query('INSERT INTO tp SET ?', post, function (error, results, fields) {
            if (error) throw error;
            });
        });

        skills.map(function(value) { 
            var post  = {sp_name: value , PI_ID: req.body.id };
            var query = connection.query('INSERT INTO specail_skills SET ?', post, function (error, results, fields) {
            if (error) throw error;
            });
        });

        nonacademics.map(function(value) { 
            var post  = {na_name: value , PI_ID: req.body.id };
            var query = connection.query('INSERT INTO non_academic SET ?', post, function (error, results, fields) {
            if (error) throw error;
            });
        });

        membership.map(function(value) { 
            var post  = {m_name: value , PI_ID: req.body.id };
            var query = connection.query('INSERT INTO membership SET ?', post, function (error, results, fields) {
            if (error) throw error;
            });
        });


        data["data"] = 1;
        res.send(data);
        
    });

    app.post('/addPDS4',function(req,res){
        var data = {};
        console.log(req.body);
        var post  = req.body.q;
        var query = connection.query('INSERT INTO q SET ?', post, function (error, results, fields) {
            if (error) throw error;
        });
        data["data"] = 1;
        res.send(data);
        
    });

    app.post('/employee',function(req,res){
        var data = {};
        var ctr=0;
        connection.query('SELECT * FROM pi where PI_ID in (SELECT DISTINCT PI_ID FROM `we` WHERE `_to` IS NULL) order by sname, fname, mname', function (error, results, fields) {
            if (error) throw error;
            data["data"] = results;
            var cr=0;
            data["data"].map(function(value){
                function compute_lb(val){
                    //1 month = 1.25
                    var m_el =1.25;
                    var date =new Date(val);
                    var todate =new Date();
                    var y1 = date.getFullYear();
                    var m1 = date.getMonth()+1;
                    var d1 = date.getDate();

                    var y2 = todate.getFullYear();
                    var m2 = todate.getMonth()+1;
                    
                    d1 = (Math.round(((m_el/30)*((30-d1)+1))*1000))/1000;

                    m1 = (Math.round((m_el*(12-m1))*1000))/1000;

                    y1 = (Math.round(((m_el*12)*((y2-y1)-1))*1000))/1000;

                    m2 = (Math.round((m_el*(m2))*1000))/1000;
                    
                    return d1+m1+y1+m2;
                }
                function compute_lb_ded(value){
                    //1 day = 8 hrs
                    var d_h = 1/8;
                    var d_m = (1/8)/60;
                    value.m = (Math.round((value.m * d_m)*1000))/1000;
                    value.h = (Math.round((value.h * d_h)*1000))/1000;
                    return (value.d+value.h+value.m);
                }
                var id = value.PI_ID;
                var dat;
                value.index = cr;
                cr++;
                value.lb = 0;
                value.vlded = 0;
                value.slded = 0;
                    //que of first_day_of_service
                    connection.query('SELECT _from as dat FROM `we` WHERE `status` LIKE "%per%" AND `PI_ID` = ? and gov_service like ("%es") and office in (SELECT DISTINCT office FROM `we` WHERE office like ("D%A%RF%XIII%") or office like ("D%A%RF%13%") or office like ("D%A%Re%XIII%") or office like ("D%A%Re%13%")or office like ("D%A%Caraga%")) ORDER BY `we`.`_from` ASC LIMIT 1', [id], function (error, results, fields) {
                    if (error) throw error;
                       value.dates={};
                        ctr++;
                        value.dates= results;
                        if(results[0]!=undefined)
                            value.lb = compute_lb(results[0].dat);
                    });
                    //que of vl_deduction
                    connection.query('SELECT IFNULL(sum(vl),0) as vl, IFNULL(sum(sl),0) as sl from l_e where p_id = ? and id not in (SELECT id FROM `l_e` WHERE `transaction` = 0 AND `type_of_leave` in (2,4,5,6,7))', [id], function (error, results, fields) {
                        if (error) throw error;
                        value.vlded = (Math.round((results[0].vl)*1000))/1000;
                        value.slded = (Math.round((results[0].sl)*1000))/1000;
                        ctr++;
                        //console.log("id = "+id+" => vl = "+results[0].vl+" => sl = "+results[0].sl)
                        if(data["data"].length===(ctr/2)){
                            res.send(data);
                        }
                    });
                    /*connection.query('SELECT IFNULL(sum(dd),0) as d, IFNULL(sum(hh),0) as h, IFNULL(sum(mm),0) as m from l_e where p_id = ? and id not in (SELECT id FROM `l_e` WHERE `transaction` = 0 AND `type_of_leave` = 0) and id not in (SELECT id FROM `l_e` WHERE `transaction` = 0 AND `type_of_leave` in (2,4,5,6,7))', [id], function (error, results, fields) {
                        function roundup(results){
                            var remh=0;
                            var remd=0;
                            if(results[0].m>=60){
                                remh = parseInt((results[0].m/60));
                                results[0].m = results[0].m%60;
                            }
                            results[0].h = results[0].h+remh;
                            if(results[0].h>=8){
                                remd = parseInt((results[0].h/8));
                                results[0].h = results[0].h%8;
                            }
                            results[0].d = results[0].d+remd;
                            return results;

                        }



                        if (error) throw error;
                        value.vl={};
                        ctr++;
                        value.vl= roundup(results);
                        value.vlded = compute_lb_ded(value.vl[0]);
                        
                    });
                    //que of sl_deduction
                    //connection.query('SELECT IFNULL(sum(dd),0) as d, IFNULL(sum(hh),0) as h, IFNULL(sum(mm),0) as m from l_e where p_id = ? and transaction != 2 and id in (SELECT id FROM `l_e` WHERE `transaction` = 0 AND `type_of_leave` = 0) and id not in (SELECT id FROM `l_e` WHERE `transaction` = 0 AND `type_of_leave` in (2,4,5,6,7))', [id], function (error, results, fields) {
                    connection.query('SELECT (IFNULL(sum(dd),0))+(IFNULL(sum(sl),0)) as d, IFNULL(sum(hh),0) as h, IFNULL(sum(mm),0) as m from l_e where p_id = ? and transaction != 2 and id in (SELECT id FROM `l_e` WHERE `transaction` = 0 AND `type_of_leave` = 0) and id not in (SELECT id FROM `l_e` WHERE `transaction` = 0 AND `type_of_leave` in (2,4,5,6,7))', [id], function (error, results, fields) {
                        function roundup(results){
                            var remh=0;
                            var remd=0;
                            if(results[0].m>=60){
                                remh = parseInt((results[0].m/60));
                                results[0].m = results[0].m%60;
                            }
                            results[0].h = results[0].h+remh;
                            if(results[0].h>=8){
                                remd = parseInt((results[0].h/8));
                                results[0].h = results[0].h%8;
                            }
                            results[0].d = results[0].d+remd;
                            return results;

                        }
                        if (error) throw error;
                        value.sl={};
                        ctr++;
                        if(data["data"].length===(ctr/3)){
                            value.sl= roundup(results);
                            value.slded = compute_lb_ded(value.sl[0]);
                            res.send(data);
                        }
                        else{
                            value.sl= roundup(results);
                            value.slded = compute_lb_ded(value.sl[0]);
                        }
                    });*/
               
            });
            //res.send(data);
        });
        
    });

 app.post('/update',function(req,res){
        var data = {};
        var pi  = req.body.p;
        var c  = req.body.c;
        var e  = req.body.e;
        var cs  = req.body.cs;
        var we  = req.body.we;
        var v  = req.body.v;
        var tp  = req.body.tp;
        var s  = req.body.s;
        var n  = req.body.n;
        var m  = req.body.m;
        connection.query('UPDATE pi SET ? where PI_ID = ?', [pi, pi.PI_ID], function (error, results, fields) {
            if (error) throw error;
             data["data"] = 1;
             res.send(data);
        });
        c.map(function(value){
            var child_id = value.FB_Child_ID;
            if(child_id){ //if existing
                connection.query('UPDATE fb_child SET ? where FB_Child_ID = ?', [value, child_id], function (error, results, fields) {
                if (error) throw error;
                });
            }else{
               value.PI_ID = pi.PI_ID; //adding values to object
                connection.query('INSERT INTO fb_child SET ?', value, function (error, results, fields) {
                if (error) throw error;
                });
            }
            
        });
        e.map(function(value){
            var ed_id = value.EB_ID;
            if(ed_id){ //if existing
                connection.query('UPDATE eb SET ? where EB_ID = ?', [value, ed_id], function (error, results, fields) {
                if (error) throw error;
                });
            }else{
               value.PI_ID = pi.PI_ID; //adding values to object
                connection.query('INSERT INTO eb SET ?', value, function (error, results, fields) {
                if (error) throw error;
                });
            }
            
        });
        cs.map(function(value){
            var cs_id = value.CSE_ID;
            if(cs_id){ //if existing
                connection.query('UPDATE cse SET ? where CSE_ID = ?', [value, cs_id], function (error, results, fields) {
                if (error) throw error;
                });
            }else{
               value.PI_ID = pi.PI_ID; //adding values to object
                connection.query('INSERT INTO cse SET ?', value, function (error, results, fields) {
                if (error) throw error;
                });
            }
            
        });

        we.map(function(value){
            var id = value.id;
            if(id){ //if existing
                connection.query('UPDATE we SET ? where id = ?', [value, id], function (error, results, fields) {
                if (error) throw error;
                });
            }else{
               value.PI_ID = pi.PI_ID; //adding values to object
                connection.query('INSERT INTO we SET ?', value, function (error, results, fields) {
                if (error) throw error;
                });
            }
            
        });

        v.map(function(value){
            var id = value.VWI_ID;
            if(id){ //if existing
                connection.query('UPDATE vwi SET ? where VWI_ID = ?', [value, id], function (error, results, fields) {
                if (error) throw error;
                });
            }else{
               value.PI_ID = pi.PI_ID; //adding values to object
                connection.query('INSERT INTO vwi SET ?', value, function (error, results, fields) {
                if (error) throw error;
                });
            }
            
        });

        tp.map(function(value){
            var id = value.TP_ID;
            if(id){ //if existing
                connection.query('UPDATE tp SET ? where TP_ID = ?', [value, id], function (error, results, fields) {
                if (error) throw error;
                });
            }else{
               value.PI_ID = pi.PI_ID; //adding values to object
                connection.query('INSERT INTO tp SET ?', value, function (error, results, fields) {
                if (error) throw error;
                });
            }          
        });

        s.map(function(value){
            var id = value.sp_id;
            if(id){ //if existing
                connection.query('UPDATE specail_skills SET ? where sp_id = ?', [value, id], function (error, results, fields) {
                if (error) throw error;
                });
            }else{
               value.PI_ID = pi.PI_ID; //adding values to object
                connection.query('INSERT INTO specail_skills SET ?', value, function (error, results, fields) {
                if (error) throw error;
                });
            }          
        });

        n.map(function(value){
            var id = value.na_id;
            if(id){ //if existing
                connection.query('UPDATE non_academic SET ? where na_id = ?', [value, id], function (error, results, fields) {
                if (error) throw error;
                });
            }else{
               value.PI_ID = pi.PI_ID; //adding values to object
                connection.query('INSERT INTO non_academic SET ?', value, function (error, results, fields) {
                if (error) throw error;
                });
            }          
        });

        m.map(function(value){
            var id = value.m_id;
            if(id){ //if existing
                connection.query('UPDATE membership SET ? where m_id = ?', [value, id], function (error, results, fields) {
                if (error) throw error;
                });
            }else{
               value.PI_ID = pi.PI_ID; //adding values to object
                connection.query('INSERT INTO membership SET ?', value, function (error, results, fields) {
                if (error) throw error;
                });
            }          
        });
        
    });


      app.post('/details',function(req,res){
        var id = req.body.id;
        var data = {};
        connection.query(`SELECT * FROM pi where PI_ID = ?; SELECT * FROM fb_child where PI_ID = ?; SELECT * FROM eb where PI_ID = ?;
        SELECT * FROM cse where PI_ID = ?; SELECT * FROM we where PI_ID = ?; SELECT * FROM vwi where PI_ID = ?;
        SELECT * FROM tp where PI_ID = ?; SELECT * FROM specail_skills where PI_ID = ?; SELECT * FROM non_academic where PI_ID = ?;
        SELECT * FROM membership where PI_ID = ?;`, [id, id, id, id, id, id, id, id, id, id], function (error, results, fields) {
            if (error) throw error;
            //results[0][child] = results[1];
            data["data"] = results[0];
            data["child"] = results[1];
            data["education"] = results[2];
            data["cse"] = results[3];
            data["we"] = results[4];
            data["vwi"] = results[5];
            data["tp"] = results[6];
            data["skills"] = results[7];
            data["na"] = results[8];
            data["mem"] = results[9];
            res.send(data);
        });
    });

    app.post('/addLeaveEntry',function(req,res){
    var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
    var data = {};
    //console.log(req.body);
    var pi = req.body;
    //var year = new Date().getFullYear();
    //console.log(year)
    
    //console.log(pi.t);
    if(pi.t===0){
        pi.dd = pi.d.length;
    }else if(pi.t==1){
        var str_date="Late "+monthNames[pi.em-1];
        console.log(pi);
        console.log(str_date);
        //1 day = 8 hrs
        /*var d_h = 1/8;
        var d_m = (1/8)/60;
        pi.v = pi.v+(Math.round((pi.mm * d_m)*1000))/1000;
        pi.v = pi.v+(Math.round((pi.hh * d_h)*1000))/1000;
        pi.v = pi.v+pi.dd;
        console.log("t = 1 => "+pi.v);*/
        /*var rnd=[];
        console.log(`SELECT round(l_c_t4b.equi_day+l_c_t4a.equi_day,3) as rnd FROM l_c_t4b,l_c_t4a where minutes = `+pi.mm+` and hours = `+pi.hh+` limit 1`);
        connection.query("SELECT round(l_c_t4b.equi_day+l_c_t4a.equi_day,3) as rnd FROM l_c_t4b,l_c_t4a where minutes = ? and hours = ?",
            [pi.mm,pi.hh],function(err, results, fields){
            if (err) throw err;
                console.log(results);
            });*/
        if(pi.dd==undefined){
            pi.dd=0;
        }
        
        var sql = `INSERT INTO l_e(remarks,month, transaction, type_of_leave, dd, hh, mm, p_id, year,vl,sl) 
            SELECT ?,?,?,?,?,?,?,?,?, round(?+l_c_t4b.equi_day+l_c_t4a.equi_day,3),? FROM l_c_t4b,l_c_t4a where minutes = ? and hours = ? limit 1`; 
             
        console.log(`INSERT INTO l_e(remarks,month, transaction, type_of_leave, dd, hh, mm, p_id, year,vl,sl) 
            SELECT `+str_date+`,`+pi.em+`,`+pi.t+`,null,`+pi.dd+`,`+pi.hh+`,`+pi.mm+`,`+pi.id+`,`+pi.ey+`, round(`+pi.dd+`+l_c_t4b.equi_day+l_c_t4a.equi_day,3),`+pi.s+` FROM l_c_t4b,l_c_t4a where minutes = `+pi.mm+` and hours = `+pi.hh+` limit 1`);
        connection.query(String(sql),[
        str_date,pi.em,pi.t,null,pi.dd,pi.hh,pi.mm,pi.id,pi.ey,pi.dd,pi.s,pi.mm,pi.hh
        ],function(err, result){
            if (err) throw err;
            data["error"] = 0;
            data["acc"] = [];
            data["data"] = result;
                //console.log(result)
                //console.log("Select vl, sl from l_e where id = "+data["data"].insertId);
                connection.query("Select vl, sl from l_e where id = ?",[data["data"].insertId],
                function(err, rows, fields){
                    if (err) throw err;
                    data.acc = rows;
                    console.log(rows);
                    res.send(data);
                });
        });
        /*if(data.data!=undefined){
            console.log("Select vl, sl from l_e where id =");
            data.data.map(function(value){
                connection.query("Select vl, sl from l_e where id = ?",[value.insertId],
                function(err, result){
                    if (err) throw err;
                    data.vl = result[0].vl;
                    data.sl = result[0].sl;
                })
            });
            res.send(data);
        }*/
    }
    if(pi.t!=1){
        var str_date="";
        if(pi.t==="0"){
            str_date="";
            pi.d.map(function(value) {
                var c_date = new Date(value,ind);
                var addtl="";
                if(pi.cto[ind]!=undefined){
                    addtl=addtl+" "+pi.cto[ind];
                }
                str_date= str_date+(c_date.getMonth()+1)+"/";
                str_date = str_date+""+c_date.getDate()+" "+addtl+",";
            });
        }else if(pi.t==2){
            str_date="Monetization "+pi.dd;
        }
        console.log(str_date);
        var sql = `INSERT INTO l_e(month, transaction, type_of_leave, dd, hh, mm, p_id, year,vl,sl,remarks) VALUES 
        (?,?,?,?,?,?,?,?,?,?,?)`;  
        connection.query(String(sql),[
        pi.em,pi.t,pi.l,pi.dd,pi.hh,pi.mm,pi.id,pi.ey,pi.v,pi.s,str_date
        ],function(err, result){
            if (err) throw err;
            data["error"] = 0;
            data["data"] = result;
            if(pi.t==="0"){
            
                pi.d.map(function(value) { console.log(value);
                    var query = connection.query('INSERT INTO l_e_dates (l_e_id,date) values (?,?)', [result.insertId,value], function (error, results, fields) {
                    if (error) throw error;
                    // Neat!
                    });
                });
            }

            res.send(data);
            
        });
    }
});


app.post('/getLeaveBalance',function(req,res){
        var id = req.body.id;
        console.log(id)
        var data = {};
        var query = `SELECT sname,fname,mname,_from,position FROM pi,we WHERE status LIKE '%per%' AND 
            pi.PI_ID = we.PI_ID and pi.PI_ID = ? and gov_service like ("%es") and office in 
            (SELECT DISTINCT office FROM we WHERE office like ("D%A%RF%XIII%") or office like ("D%A%RF%13%") or office like ("D%A%Re%XIII%") or office like ("D%A%Re%13%")or office like ("D%A%Caraga%")) ORDER BY we._from ASC`;
        connection.query(query, [id], function (error, results, fields) {
            if (error) throw error;
            data["data"] = results;
            console.log(results);
            res.send(data);
        });
    });


app.get('/change',function(req,res){
        /*var notToDate="SELECT * FROM `we` WHERE `_from` NOT LIKE '%2017%' AND `_to` LIKE '%to%'";

        connection.query(notToDate, [], function (error, results, fields) {
            if (error) throw error;
            res.send(results);

            results.map(function(value){
                var we_id = value.id;
                var str_from = value._from;
                var str_to = "12/31/"+(str_from.substring(6,10));
                console.log('UPDATE we SET _from = "'+str_from+'", _to = '+str_to+' where id = '+we_id);
                connection.query('UPDATE we SET _from = ?, _to = ? where id = ?', [str_from, str_to, we_id], function (error, results, fields) {
                    if (error) throw error;
                });
            });
        });*/

        connection.query("SELECT pi_id,dob FROM `pi`", [], function (error, results, fields) {
            if (error) throw error;
            // /console.log(results);
            res.send(results);

            results.map(function(value){
                var we_id = value.pi_id;
                //(value._from).toString.substr();
                var str_from = value.dob;
                //str_from = (str_from.substring(0,4)+"-"+str_from.substring(8,10)+"-"+str_from.substring(5,7));
                var dit = new Date(str_from);
                console.log(dit.getFullYear()+"-"+(dit.getMonth()+1)+"-"+dit.getDate());
                var year=dit.getFullYear();
                var month = dit.getMonth()+1;
                var day= dit.getDate();
                if(month<10){
                    month = "0"+month;
                }
                if(day<10){
                    day = "0"+day;
                }
                 /*if(value.dob===null){
                     var str_from = null;
                 }else{
                     var str_from = value.dob;
                         //console.log(str_to.length);
                     if(str_from.length>10||str_from.length<10){
                         //console.log(we_id+"    "+str_to);
                         str_from = str_from+"*";
                    }else{
                         str_from = (str_from.substring(6,10)+"-"+str_from.substring(0,2)+"-"+str_from.substring(3,5));
                         //console.log(value.dob);
                         //console.log(str_from);
                     }
                 }*/
                   /* console.log('UPDATE pi SET dob = "'+year+"-"+month+"-"+day+'" where pi_id = '+we_id);
                    connection.query('UPDATE pi SET dob = "'+year+"-"+month+"-"+day+'" where pi_id = ?', [we_id], function (error, results, fields) {
                        if (error) throw error;
                    });*/
                
            });
        });

        /*
        connection.query("SELECT id,_from,_to FROM `we`", [], function (error, results, fields) {
            if (error) throw error;
            // /console.log(results);
            res.send(results);

            results.map(function(value){
                var we_id = value.id;
                //(value._from).toString.substr();
                var str_from = value._from;
                //str_from = (str_from.substring(0,4)+"-"+str_from.substring(8,10)+"-"+str_from.substring(5,7));
                
                 if(value._to===null){
                     var str_to = null;
                 }else{
                     var str_to = value._to;
                         //console.log(str_to.length);
                     if(!(str_to.substring(10,11)==="*")){
                         //console.log(we_id+"    "+str_to);
                         //str_to = str_to+"*";
                    }else{
                         str_to = (str_to.substring(6,10)+"-"+str_to.substring(0,2)+"-"+str_to.substring(3,5));
                         console.log(value._to);
                         console.log(str_to);
                     }
                 }
                    console.log('UPDATE we SET _from = "'+str_from+'", _to = '+str_to+' where id = '+we_id);
                    connection.query('UPDATE we SET _from = ?, _to = ? where id = ?', [str_from, str_to, we_id], function (error, results, fields) {
                        if (error) throw error;
                    });
                
            });
        });
        */

        
    });


app.post('/getMaleFemale',function(req,res){
        var data = {};
        var ctr=0;
        var query = connection.query("SELECT count(Pi_id) as m FROM `pi` WHERE pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL) and sex='Male' order by sname, fname", [], function (error, results, fields) {
            if (error) throw error;
            data["m"] = results[0].m;
            ctr++;
            var query = connection.query("SELECT count(Pi_id) as f FROM `pi` WHERE pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL) and sex='Female' order by sname, fname", [], function (error, results, fields) {
                if (error) throw error;
                data["f"] = results[0].f;
                ctr++;
                res.send(data);
            });
        });
    });

app.post('/getAgeBracket',function(req,res){
        var data = {};
        var ctr=0;
        var query = connection.query("SELECT count(pi_id) as c FROM `pi` where pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL) and (YEAR(curdate())-YEAR(dob))<30", [], function (error, results, fields) {
            if (error) throw error;
            data["two"] = results[0].c;
            ctr++;
            var query = connection.query("SELECT count(pi_id) as c FROM `pi` where pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL) and (YEAR(curdate())-YEAR(dob))>=30 and (YEAR(curdate())-YEAR(dob))<40", [], function (error, results, fields) {
                if (error) throw error;
                data["three"] = results[0].c;
                ctr++;
                var query = connection.query("SELECT count(pi_id) as c FROM `pi` where pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL) and (YEAR(curdate())-YEAR(dob))>=40 and (YEAR(curdate())-YEAR(dob))<50", [], function (error, results, fields) {
                    if (error) throw error;
                    data["four"] = results[0].c;
                    ctr++;
                    var query = connection.query("SELECT count(pi_id) as c FROM `pi` where pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL) and (YEAR(curdate())-YEAR(dob))>=50", [], function (error, results, fields) {
                        if (error) throw error;
                        data["five"] = results[0].c;
                        ctr++;
                        var query = connection.query("SELECT AVG((YEAR(curdate())-YEAR(dob))) as c FROM `pi` where pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL)", [], function (error, results, fields) {
                            if (error) throw error;
                            var r = (Math.round((results[0].c)*100)/100)
                            data["ave"] = r;
                            ctr++;
                            res.send(data);
                        });
                    });
                });
            });
        });
    });

app.post('/getMaritalStatus',function(req,res){
        var data = {};
        var ctr=0;
        var ctr2=0;
        var query = connection.query("SELECT distinct civil_status as cs FROM `pi` WHERE pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL)", [], function (error, results, fields) {
            data["data"]=[];
            if (error) throw error;
            //console.log(results);
            ctr2=results.length;
            results.map(function(value){
                //console.log(value.cs);
                var query = connection.query("SELECT count(pi_id) as c FROM `pi` WHERE pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL) and civil_status=? order by sname, fname", [value.cs], function (error, results, fields) {
                    if (error) throw error;
                    data["data"].push({'cs':value.cs,'num':results[0].c});
                    ctr++;
                    //console.log(ctr);
                    if(ctr==ctr2)
                        res.send(data);
                });
            });
        });
    });

app.post('/getSalaryGrade',function(req,res){
        var d = [];
        var data = {};
        data["data"]=[];
        var label={};
        label["label"]=[];
        var ctr=4;
        for(var si=4; si<=27; si++){
            var query = connection.query("SELECT count(pi_id) as n FROM `we` WHERE `_to` IS NULL and sg LIKE \"?-%\"", [si], function (error, results, fields) {
                if(results[0].n>0){
                    data["data"].push(results[0].n);
                    label["label"].push("SG "+ctr);
                }
                if (error) throw error;
                if(ctr==27){
                    d.push(data);
                    d.push(label);
                    res.send(d);
                }
                ctr++;
            });
        }
        
    });

app.post('/getStepIncrement',function(req,res){
        var data = {};
        data["data"]=[];
        var ctr=1;
        for(var si=1; si<=8; si++){
            var query = connection.query("SELECT count(pi_id) as n FROM `we` WHERE `_to` IS NULL and sg LIKE \"%-?\"", [si], function (error, results, fields) {
                data["data"].push(results[0].n)
                if (error) throw error;
                if(ctr==8)
                    res.send(data);
                ctr++;
            });
        }
        
    });

    app.post('/getBirthday',function(req,res){
        var data = {};
        var ctr=0;
        var ctr2=0;
        var query = connection.query("SELECT sname, fname, mname, dob FROM `pi` WHERE pi_id in (SELECT pi_id FROM `we` WHERE `_to` IS NULL) and DATE_FORMAT(dob, '%m') = DATE_FORMAT(curdate(), '%m') order by MONTH(dob), DAY(dob), sname, fname", [], function (error, results, fields) {
            data["data"]=[];
            if (error) throw error;
            //res.send(data);
            //console.log(results);
            results.map(function(value){
                //console.log(value.cs);
                data["data"].push(value);
                    if(data["data"].length==results.length)
                        res.send(data);
            });
        });
    });

app.post('/getStmt',function(req,res){
    var id=req.body.id;
    var _from=new Date(req.body.date);
    var _to=new Date();
    var data=[];
    var arr={};
    var years=[];
    var b_sl=0;
    var b_vl=0;
    // for(var yr = _from.getFullYear(); yr <= _to.getFullYear(); yr++){
    //     years.push(yr);
    // }
    // res.send(years);
    connection.query("SELECT * from l_e where p_id = ? ORDER BY year,month,transaction  ASC", [id], function (error, results, fields) {
        if (error) throw error;
        arr=results;
        var yrisfromyear=false;
        var c=0;
        var start_month_el=0;
        
            console.log("once");
                    
                    var days = 30-(_from.getDate()-1);
                    var earned = 0;
                    connection.query("SELECT * FROM `l_c_t2` where number_of_days = ?", [days], function (error, results, fields) {
                        earned = results[0].vl_earned;
                        start_month_el = earned;
                    });

        var myVar = setInterval(function(){
            //console.log("hello");
        
        for(var yr = _from.getFullYear(); yr <= _to.getFullYear(); yr++){
            var d={};
            d["year"] = yr;
            d["month"] = [];
            d["b_vl"] = b_vl;
            d["b_sl"] = b_sl;
            var month=1;
            var month_end=12;
            if(yr == _from.getFullYear()){
                month = _from.getMonth()+1;
                yrisfromyear=true;
            }
            if(yr == _to.getFullYear()){
                month_end = _to.getMonth()+1;
            }
            var ctr=0;
            for(var mo = month;mo<=month_end;mo++){
                var m={};
                m["mo"] = mo;
//----------------------------
                if(yrisfromyear && ctr==0){
                    yrisfromyear=false;
                        m["earned"] = start_month_el;
                        console.log("b_vl "+b_vl);
                        b_sl=b_sl + start_month_el;
                        b_vl=b_vl + start_month_el;
                        m["b_vl"] = b_vl;
                        m["b_sl"] = b_sl;
                        ctr++;
                }else{
                        //1 month = EL 1.25
                        m["earned"] = 1.25;
                        b_sl=b_sl+1.25;
                        b_vl=b_vl+1.25;
                        m["b_vl"] = b_vl;
                        m["b_sl"] = b_sl;
                }
//---------------------------------
                    m["entries"] = [];
                    var i=0;
                    if(arr.length>0){
                        arr.map(function(value){
                            if(value.year == yr && value.month == mo){
                                b_sl=b_sl-value.sl;
                                b_vl=b_vl-value.vl;
                                value["b_vl"] = b_vl;
                                value["b_sl"] = b_sl;
                                m["entries"].push(value);
                            }
                            i++;
                            if(i==arr.length){
                                d["month"].push(m);

                                if(mo==month_end){
                                    data.push(d);
                                    console.log("mo "+d);
                                    c++;
                                    
                                    console.log("send "+ctr);
                                    
                                    
                                        if(c == (_to.getFullYear()+1)-_from.getFullYear()){
                                            res.send(data);
                                        }
                                    
                                }
                            }
                            
                            
                        });
                    }
                    else{
                                d["month"].push(m);

                                if(mo==month_end){
                                    data.push(d);
                                    console.log("mo "+d);
                                    c++;
                                    
                                    console.log("send "+ctr);
                                    
                                    
                                        if(c == (_to.getFullYear()+1)-_from.getFullYear()){
                                            res.send(data);
                                        }
                                    
                                }
                    }
               
                
            }
        }
        
            clearInterval(myVar);
        },1000);
    });

});


