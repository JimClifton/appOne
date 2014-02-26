$(document).ready(function() {

	$("#delete").click(function() {
		var id = $(this).val();
		var confirm = window.confirm("Are you sure you want to delete this?");
		if (confirm == true) {
			jQuery.ajax({
			    url: "/posts/" + id,
			    type: "DELETE",
			    success: function (data, textStatus, jqXHR) { 
			        console.log("Success:");
			        window.location.href = "/posts";
			    }
			});
		} else {
			event.preventDefault();
		}
		
	});

	$("#update").click(function() {
		var id = $(this).val();
		var title = $('#title').val();
		var content = $('#content').val();
		jQuery.ajax({
		    url: "/posts/update/" + id,
		    type: "PUT",
		    data: {
		    	"title": title,
		    	"content": content
		    },
		    success: function (data, textStatus, jqXHR) { 
		        console.log("Success:");
		        window.location.href = "/posts";
		    }
		});
	});

});
