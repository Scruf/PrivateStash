"use strict"
const soap = require('soap')
const url = 'https://elstestserver.endicia.com/LabelService/EwsLabelService.asmx?wsdl'
const args = {
	AccountID:"747049",
	RequesterID:"Clickgoandbuy",
	PassPhrase:"lsll"
}
soap.createClient(url,(err,client)=>{
	console.log(client.httpClient)
});