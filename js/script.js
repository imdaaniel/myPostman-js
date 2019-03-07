$(document).ready(function () {
    $('#form').submit(false);
    var i = 1;

    $('#add').click(function() {
        i++;
        $('#campos_dinamicos').append('<tr id="linha'+i+'"><td><input type="text" class="form-control" id="key'+i+'" placeholder="Parâmetro"></td><td><input type="text" class="form-control" id="value'+i+'" placeholder="Valor"></td><td><button class="btn btn-danger remove">X</button></td></tr>');
    });

    $(document).on('click', '.remove', function() {
        var id_botao = $(this).attr('id');
        $('#linha'+id_botao).remove();
    });

    $('#form').submit(function() {
        var urlInput = $('#url').val();
        var tipo = $('#metodo').children("option:selected").val();
        var form = $(this);
       
        $.ajax({
            url: "http://" + urlInput.replace("http://", ""),
            type: tipo,
            data: form.serialize(),
            dataType: "json",
            success: function (resposta) {            
                $('#resultado').html('<pre><code>' + JSON.stringify(resposta, null, 4) + '</code></pre>');
                // console.log(resposta);
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
    });
});