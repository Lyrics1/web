jQuery(document).ready(function () {
    var Donor = {};
    var checkItem = {
        checkPhone: function (strPhone) {
            var reg = /^1[34578]\d{9}/;
            return !reg.test(strPhone);


        },

        checkName: function (str) {
            if (str == "") return true;
            var regu = "^[ ]+$";
            var re = new RegExp(regu);
            return re.test(str);

        },
        checkEmail: function (str) {
            var emailReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/;
            if (emailReg.test(str)) {
                return false;
            } else {
                return true;
            }
        },
        checkGrate: function (str) {
            var regu = /^[-]{0,1}[0-9]{1,3}$/;
            return regu.test(str);
        }

    }

    $('#postBtn').click(function () {
        $('.form-group').removeClass(' has-error');
        $('.err_tip').remove();
        $('.modal-content').empty();
        Donor.name = $('#DonorName').val();

        Donor.graduate_year = $('#DonorGraduate').val();
        Donor.mail = $('#DonorEmail').val();
        Donor.tel = Number($('#DonorTel').val());
        Donor.keep_secert = $("input[name='DonorKeepSecert']:checked").val();

        console.log(Donor);
        if (checkItem.checkName(Donor.name)) {
            $('#DonorName').parent().addClass('has-error');
            $('#DonorName').after("<p class='err_tip'>您的姓名格式有错误</p>")
            return false;
        };
        if (checkItem.checkGrate(Donor.graduate_year)) {
            $('#DonorGraduate').parent().addClass('has-error');
            $('#DonorGraduate').after("<p class='err_tip'>您的格式有错误</p>");
            return false;
        };
        if (checkItem.checkPhone(Donor.tel)) {
            $('#DonorTel').parent().addClass('has-error');
            $('#DonorTel').after("<p class='err_tip'>您的格式有错误</p>");
            return false;
        };
        if (Donor.mail == "" || checkItem.checkEmail(Donor.mail)) {
            $('#DonorEmail').parent().addClass('has-error');
            $('#DonorEmail').after("<p class='err_tip'>您的格式有错误</p>");
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'http://api.xiyounet.org/index.php/donate/savecontact',
            data: Donor,
            dataType: "json",
            success: function (data) {
                var str = "error";

                if (data.code == 9527) {
                    str = "graduate year error";
                };
                if (data.code == 9528) {
                    str = "mail error";
                };
                if (data.code == 9529) {
                    str = "tel error";
                };
                if (data.code == 9530) {
                    str = "fill the full list";
                };
                if (data.code == 200) {
                    $(".modal-content").append('<h3 class="model-title">信息验证成功</h3>');
                    $(".modal-content").append('<img class="erweima" src="../assets/images/wechat.png"/>')
                    $(".modal-content").append('<p class="model-tip">感谢您的帮助，我们会尽快更新记录，积极反馈</p>');
                    $(".modal-content").append('<a class="model-href" href="donorList.html">点击查看协会收支记录</p>');
                    $('#mymodal').modal({
                        keyboard: true
                    });
                    $('#mymodal').on('hidden.bs.modal', function (e) {
                        window.location.href = "/";
                    })
                } else {
                    $(".modal-content").append('<h3 class="model-title">添加信息有误</h3>');
                    $(".modal-content").append('<hr/>');
                    $(".modal-content").append('<p class="model-text">' + str + '</p>');
                    $('#mymodal').modal({
                        keyboard: true
                    });
                }


            },
            error: function (xhr, textStatus, errorThrown) {}
        })
    })

})
