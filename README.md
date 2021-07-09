# Unique_delivery_system-Server
This is server of my Unique-Delivery-System project using React.

THis is REST API using expressjs and NodeJS.

Libraries I have used :

step 1:Download and Installing MongoDB

step 2:npm install express-generator -g

step 3:express <Server-name> //type in specific folder to make foler 

step 4: npm install

step 5:HTTPS: go to bin folder ans type

       openssl genrsa 1024 > private.key
       
       openssl req -new -key private.key -out cert.csr
       
       openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
       
step 6:mongod --dbpath=data --bind_ip 127.0.0.1

      npm install mongoose@5.1.7 mongoose-currency@0.2.0 --save
      
      const mongoose = require('mongoose');
      
      const url = 'mongodb://localhost:27017/conFusion';
      
      const connect = mongoose.connect(url);
      
      connect.then((db) => {
      
        console.log("Connected correctly to server");
        
      }, (err) => { console.log(err); });
      
step 7:npm install passport@0.4.0 passport-local@1.0.0 passport-local-mongoose@5.0.1 --save

       npm install passport-jwt@4.0.0 jsonwebtoken@8.3.0 --save
       
       npm install multer@1.3.1 --save
