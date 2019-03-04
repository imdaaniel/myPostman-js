var qtd = 1;
$(document).ready(function () {
    $('#btn_add').click(function () {
        qtd++;
        $('#inputs').append('<p><input type="text" id="input' + qtd + '" name="input' + qtd + '"></p>');
    });

    $('#form').submit(function (e) {
        enviaRequisicao();
        return false;
    });

    function enviaRequisicao() {
        var urlInput = $('#url').val();
        //var form = $(this);
        var tipo = $('#metodo').children("option:selected").val();

        $.ajax({
            url: "http://" + urlInput,
            //data: '',//form.serialize(),
            type: tipo,
            dataType: "json",
            success: function (resp) {
                $('#resultado').html(JSON.stringify(resp, null, 4));
                /*
                for (var _i in resp.dados) {
                    for (var _r in resp.dados[_i]) {
                        $('#resultado').append(resp.dados[_i][_r] + '</br>');
                    }
                    $('#resultado').append('</br>');
                }
                */
                console.log(resp);
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
    }
});