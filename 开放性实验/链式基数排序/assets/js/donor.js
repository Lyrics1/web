jQuery(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "http://api.xiyounet.org/index.php/donate/donator",
                dataType: "json",
                success:function(data){
                    var str = "";
                    data.forEach(function(item,i,arr){
                        str+="<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].graduate_year+"</td><td>"+data[i].donate_number+"</td><td></tr>"
                    })
                    $('tbody').html(str);
                }

            })
        })
