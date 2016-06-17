$(document).ready(function(){
	$('.calculate').click(function(){
		var money_to_deposit = $('.money').val();
		var data = {
    		"ammount":money_to_deposit,
    		"date":new Date()
		};
		$('.money').val('');
		$.ajax({
			type:'POST',
			data:JSON.stringify(data),
			contentType:'application/json',
			url:'/money',
			
			success:function(){
			
			}
		})
	})
})