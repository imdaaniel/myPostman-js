var qtd = 1;

$(document).ready(function () {
    $('form').submit(false);

    $('#btn_add').click(function () {
        qtd++;
        $('#inputs').append('<div><input type="text" name="key' + qtd + '" class="form-control"><input type="text" name="value' + qtd + '" class="form-control"></div>');
    });

    $('#btn_call').click(function () {
        var urlInput = $('#url').val();
        //var form = $(this);
        var tipo = $('#metodo').children("option:selected").val();
        var texto;
        $.ajax({
            url: "http://" + urlInput.replace("http://", ""),
            //data: '',//form.serialize(),
            type: tipo,
            dataType: "json",
            success: function (resp) {
                // if (resp.code == 200) {
                //     for (i in resp.dados) {
                //         texto += resp.dados[i];
                //         if (typeof(resp.dados[i]) == Object) {
                //             for (j in resp.dados[i]) {
                //                 texto += resp.dados[i][j];
                //                 if (typeof(resp.dados[i][j]) == Object) {
                //                     for (k in resp.dados[i][j]) {
                //                         texto += resp.dados[i][j][k];
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // } else {
                //     for (i in resp.erros) {
                //         for (j in resp.erros[i]) {
                //             texto += resp.erros[i][j];
                //         }
                //     }
                // }
                
                $('#resultado').html("<pre><code>" + JSON.stringify(resp, null, 4) + "</code></pre>");
                console.log(resp);
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
    });
});