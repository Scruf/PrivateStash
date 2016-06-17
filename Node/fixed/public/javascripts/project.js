$(document).ready(function(){
	$('.project_name').submit(function(event){
		event.preventDefault();
		var project_name = $('.name').val();
		var project_price = $('.project_price').val();
		var project_details = $('.project_details').val();
		var data = {
			'name':project_name,
			'price':project_price,
			'details':project_details,
			'date':new Date()
		}
	
		$.ajax({
			type:'POST',
			data:JSON.stringify(data),
			contentType:'application/json',
			url:'/project',
			success: function(){
				alert("Saved");
			}
		})
	})
});