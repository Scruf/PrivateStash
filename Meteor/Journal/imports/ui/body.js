//metor imports
import {Template} from 'meteor/templating'
import {Entry} from '../api/message.js';

//end of meteor imports

//file imorts
import './body.html'

import './templates/main_template.html'
import './static/styles/main.css'
import './routes.js'
//end of file imports


Template.register.events({
	'submit .register_form'(event){
		event.preventDefault()
		const target = event.target
		const register_email = target.login_email.value;
		const registrer_password = target.login_password.value;
		const register_cell = target.cell_phone.value;
		Accounts.createUser({
			email:register_email,
			password:registrer_password,
			cell:register_cell
		});

	}

})
Template.login.events({
	'submit .login_form'(event){
		event.preventDefault()
		const target = event.target
		const login_email = target.email.value;
		const login_password = target.password.value;
		Meteor.loginWithPassword(login_email,login_password,(error)=>{
			if(error)
				alert(error.reason);
			else{
				Router.go('/egor')
			}
		});
	}
})
Template.entry.events({
	'click .send'(event){
		event.preventDefault()
		const text = $('.Entry').get(0).value;
		Entry.insert({
			message:text,
			createAt: new Date()
		});
	
	}

})

