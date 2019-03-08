$(document).ready(function () {
    $('#form').submit(false);
    var i = 1;

    $('#add').click(function() {
        i++;
        $('#campos_dinamicos').append('<tr id="linha'+i+'"><td><input type="text" class="form-control" id="key'+i+'" placeholder="Parâmetro"></td><td><input type="text" class="form-control" id="value'+i+'" placeholder="Valor"></td><td><button id="'+i+'" type"button" class="btn btn-danger remove">X</button></td></tr>');
    });

    $(document).on('click', '.remove', function() {
        var id_botao = $(this).attr('id');
        $('#linha'+id_botao).remove();
    });

    $('#form').submit(function() {
        var url = $('#url').val();

        if (!url) {
            alert('URL inválida.');
            return false;
        }

        $('#inputs').html('');
        for (var j = 1; j <= i; j++) {
            $('#inputs').append('<input type="hidden" id="novo'+j+'" name="' + $('#campos_dinamicos input#key'+j+'').val() + '" value="' + $('#campos_dinamicos tr td input#value'+j+'').val() + '" />');
            $('#campos_dinamicos input#key'+j, '#campos_dinamicos input#value'+j).attr('name', null);   
        }
        
        $.ajax({
            url: "http://" + url.replace("http://", ""),
            type: $('#metodo').children("option:selected").val(),
            data: $(this).serialize(),
            dataType: "json",
            success: function (resposta) {       
                try {
                    $('#resultado').html('<pre><code>' + JSON.stringify(resposta, null, 4) + '</code></pre>');
                } catch (e) {
                    alert("deu ruim: " + e);
                }
                // console.log(resposta);
            },
            error: function (e) {
                alert('Error: ' + e);
            }
        });
    });
});