jQuery(document).ready(function () {

    var operation = {
        confirmNumber: function (e) {
            var donate_number = $(e.target).parent().prev('td').find('input').val().trim();
            if (this.isInteger(donate_number)) {
                if (confirm("捐款金额为" + donate_number + "元,是否确认?")) {
                    var obj = $(e.target).parent().parent().find('td');
                    var id = obj.eq(0).html();
                    var name = obj.eq(1).html();
                    var data = {
                        "id": id,
                        "name": name,
                        "donate_number": donate_number
                    }
                    this.postData(data);
                    $(e.target).parent().parent().remove();
                }
            } else(
                alert("输入金额格式错误,请重新输入")

            );


        },
        isInteger: function (str) {
            var regu = /^[-]{0,1}[0-9]{1,}$/;
            return regu.test(str);
        },
        postData: function (data) {
            $.ajax({
                type: "POST",
                data: data,
                url: "http://api.xiyounet.org/index.php/donate/review_donator",
                dataType: "json",
                success: function (data) {}

            })

        }
    }




    $.ajax({
        type: "GET",
        url: "http://api.xiyounet.org/index.php/donate/donator_admin",
        dataType: "json",
        success: function (data) {
            var str = "";
            data.forEach(function (item, i, arr) {
                console.log(data)
                if (!Number(data[i].feedback)) {
                    str += "<tr><td>" +
                        data[i].id + "</td><td>" +
                        data[i].name + "</td><td>" +
                        data[i].graduate_year + "</td><td>" +
                        data[i].mail + "</td><td>" +
                        data[i].tel + "</td><td><input type='text' id='donate_number'/></td><td><input type='button' value='确认' class='btn-sm btn-primary donorBtn'></td></tr>"
                }

            })
            $('tbody').html(str);
            $('.donorBtn').unbind().bind('click', function (e) {
                operation.confirmNumber(e)
            })
        }

    })
})
