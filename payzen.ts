import * as CryptoJS from 'crypto-js';
import moment from 'moment';

SoapRequest() {
   this.soap();
 }


 gen_uuid() {
   function s4() {
     return Math.floor((1 + Math.random()) * 0x10000)
       .toString(16)
       .substring(1);
   }
   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
 }

 requestId = this.gen_uuid();
 timestamp = moment().utc().format();
 shopKey = 'CHAVE_PAYZEN';
 shopId = 'ID_PAYZEN';
 authToken = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(this.requestId + this.timestamp, this.shopKey));

 soap() {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.open('POST', 'https://secure.payzen.com.br/vads-ws/v5?wsdl', true);

   var sr =
     `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:v5="http://v5.ws.vads.lyra.com/">
           <soap:Header xmlns:soapHeader="http://v5.ws.vads.lyra.com/Header">
               <soapHeader:shopId>${this.shopId}</soapHeader:shopId>
               <soapHeader:requestId>${this.requestId}</soapHeader:requestId>
               <soapHeader:timestamp>${this.timestamp}</soapHeader:timestamp>
               <soapHeader:mode>TEST</soapHeader:mode>
               <soapHeader:authToken>${this.authToken}</soapHeader:authToken>
           </soap:Header>
           <soap:Body>
               <v5:createToken>
                   <commonRequest>
                       <submissionDate>2015-04-01T12:24:56Z</submissionDate>
                   </commonRequest>
                   <cardRequest>
                       <number>4970100000000003</number>
                       <scheme>VISA</scheme>
                       <expiryMonth>12</expiryMonth>
                       <expiryYear>2018</expiryYear>
                       <cardSecurityCode>123</cardSecurityCode>
                   </cardRequest>
                   <customerRequest>
                       <billingDetails>
                           <email>john.smith@example.com</email>
                       </billingDetails>
                   </customerRequest>
               </v5:createToken>
           </soap:Body>
       </soap:Envelope>`;

   console.log(sr);
   xmlhttp.onreadystatechange = () => {
     if (xmlhttp.readyState == 4) {
       if (xmlhttp.status == 200) {
         var xml = xmlhttp.responseXML;
         console.log(xml) //retorno
       }
     }
   }
   // Send the POST request
   xmlhttp.setRequestHeader('Content-Type', 'text/xml');
   xmlhttp.responseType = "document";
   xmlhttp.send(sr);
 }
