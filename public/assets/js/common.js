$(document).ready(function(){
  show();

  $('input[name=url').keyup(function(e){
    if(e.keyCode == 13){
      e.preventDefault();
      $('input[name=create_link]').click();
    }
  });

  $("input[name=create_link]").click(function(e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "urls.json",
      dataType: "json",
      timeout: 30000,
      data: {
        url: {
          nm: $("input[name=nm]").val(),
          url: $("input[name=url]").val(),
          created_by: 'glaresky',
          updated_by: 'glaresky'
        }
      },
      success: function(res, stt, err){
        alert("SUCCESS");
        $("input[name=nm]").val("");
        $("input[name=url]").val("");
        show();
      },
      error: function(res, stt, err){
        alert("ERROR");
      }
    });
  });

  $("input[name=delete_all]").click(function(e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "api/urls_delete_all",
      dataType: "json",
      timeout: 30000,
      success: function(res, stt, err){
        alert("SUCCESS");
        show();
      },
      error: function(res, stt, err){
        alert("ERROR");
      }
    });
  });

  function show() {
    $.ajax({
      type: "GET",
      url: "urls.json",
      dataType: "json",
      timeout: 30000,
      data: {},
      success: function(res, stt, err){
        var success = res.success;
        var result = res.result;
        if(success == "YES") {
          $(".table").empty();
          for(var i = 0; i < result.length; i++) {
            var html = "<tr>";
            html += "<td><a href='" + result[i].url + "' class='list-group-item' target='_blank'>" + result[i].nm + "</a></td>";
            html += "<td><a href='javascript:' class='list-group-item del' value='" + result[i].id + "'>Delete</a></td>";
            html += "</tr>";
            var jhtml = $(html);
            jhtml.on('click', '.del', function(e) {
              e.preventDefault();

              $.ajax({
                type: "DELETE",
                url: "urls/" + $(this).attr("value") + ".json",
                dataType: "json",
                timeout: 30000,
                success: function(res, stt, err){
                  alert("SUCCESS");
                  show();
                },
                error: function(res, stt, err){
                  alert("ERROR");
                }
              });
            });
            $(".table").append(jhtml);
          }
        }
      },
      error: function(res, stt, err){
        alert("ERROR");
      }
    });
  }
});