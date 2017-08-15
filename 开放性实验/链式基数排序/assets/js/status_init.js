	$('status').click(function(e) {
	    e.preventDefault();//
	    var url = $(this).attr('href'), 
	      view_status = "true",
	      name = $('input[name="name"]').val(),
	      sno = $('input[name="sno"]').val(),
	      requestData = {'name': name, 'sno': sno};

	    $.get(url, requestData, function(data) {
	    $('#show_status').html(data);
	    });
	  });