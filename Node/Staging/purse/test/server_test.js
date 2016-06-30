"use strict"
const request = require('request'),
	  assert = require('assert');
let base_url = "http://localhost:3000/"

//testint server routes
describe("Testing server base routes",()=>{
	describe("Testing root url GET/",()=>{
		it("Shoudl return 200 code",(done)=>{
			request.get(base_url,(err,response,body)=>{
				assert.equal(200,response.statusCode);
				done();
			})
		})
	}),
	describe("Testing /user GET/",()=>{
		it("Should return 200 code",(done)=>{
			request.get(base_url+"users",(err,response,body)=>{
				assert.equal(200,response.statusCode);
				done();
			})
		})
	})
	describe("Testing /project GET api",()=>{
		it("Shoudl return 200 code",(done)=>{
			request.get(base_url+"project",(err,response,body)=>{
				assert.equal(200,response.statusCode);
				done();
			})
		})
	})

	describe("Testing content of /project GET api",()=>{
		it("Should return something",(done)=>{
			request.get(base_url+"project",(err,response,body)=>{
				assert.notEqual(0,body.length);
				console.log(typeof body)
				done();
			})
		})
	})
})