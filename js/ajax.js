// Js, JQuery, Ajax

// set Public Variable
var Alert         = new CustomAlert(),
    Confirm       = new CustomConfirm(),
    winW          = window.innerWidth,
    winH          = window.innerHeight,
    body          = document.body,
    html          = document.documentElement,
    dialogoverlay = document.getElementById('dialogoverlay'),
    dialogbox     = document.getElementById('dialogbox'),
    dialogboxhead = document.getElementById('dialogboxhead'),
    dialogboxbody = document.getElementById('dialogboxbody'),
    dialogboxfoot = document.getElementById('dialogboxfoot'),
    height        = Math.max( body.scrollHeight,
                              body.offsetHeight,
                              html.clientHeight,
                              html.scrollHeight,
                              html.offsetHeight
                            );

//show meta status when mouse hover each status
$(document).on('mouseenter','.status',function(){
  var id = $(this).attr('data-id');
  $('#'+id).css('display','inline');
});

//hide meta status when mouse move each status
$(document).on('mouseleave','.status',function(){
  var id = $(this).attr('data-id');
  $('#'+id).css('display','none');
});

//hide meta komen when mouse hover each komentar
$(document).on('mouseenter','.post-komen',function(){
  var id = $(this).attr('data-id');
  $('#'+id).css('display','block');
});

//show meta komen when mouse move each komentar
$(document).on('mouseleave','.post-komen',function(){
  var id = $(this).attr('data-id');
  $('#'+id).css('display','none');
});

//klik komentar set focus to textarea
$(document).on('click','.komen_link',function(){
  var id_stts = $(this).attr('id');
  $('.textarea_komen_'+id_stts).focus();
});

//klik suka rubah class ke unsuka_link
$(document).on('click','.suka_link',function(){
  var id_stts = $(this).attr('id');
  $(this).attr('class', 'unsuka_link');
  $('#suka_'+id_stts).attr('class', 'unsuka_status');
  $('#hasil_'+id_stts).css('display','block')
});

//klik suka rubah class ke suka_link
$(document).on('click','.unsuka_link',function(){
  var id_stts = $(this).attr('id');
  $(this).attr('class', 'suka_link');
  $('#suka_'+id_stts).attr('class', 'suka_status');
  $('#hasil_'+id_stts).css('display','none')
});

//confirmAlert before hapus status
$(document).on('click','.hapus_status',function(){
  var id_stts = $(this).attr('id');
  Confirm.render('Apakah anda yakin akan hapus status ini?','delete_status','status_'+id_stts);
});

//confirmAlert before edit status
$(document).on('click','.edit_status',function(){
  Alert.render('Belum berfungsi');
});

//confirmAlert before hapus komen
$(document).on('click','.hapus_komen',function(){
  var id_komen = $(this).attr('data-id'),
      id_stts  = $(this).attr('data-status');
  Confirm.render('Apakah anda yakin akan hapus komen ini?','delete_komentar','komentar_'+id_komen,id_stts)
});

//confirmAlert before balas komen
$(document).on('click','.suka_komen',function(){
  var id_komen = $(this).attr('data-id');
  $(this).attr('class', 'unsuka_komen');
  $(this).text('Unsuka');
  // $('#suka_'+id_stts).attr('class', 'unsuka_status');
  $('#suka_balas_'+id_komen).css('display','inline')
});

//confirmAlert before balas komen
$(document).on('click','.unsuka_komen',function(){
  var id_komen = $(this).attr('data-id');
  $(this).attr('class', 'suka_komen');
  $(this).text('Suka');
  // $('#suka_'+id_stts).attr('class', 'unsuka_status');
  $('#suka_balas_'+id_komen).css('display','none')
});

//confirmAlert before balas komen
$(document).on('click','.balas_komen',function(){
  Alert.render('Belum berfungsi');
});

//submit status use
$('#submit_status').on('click',function(){
  var isi = $('#textarea_status').val().trim();
  if(isi == ''){
    $('#textarea_status').focus();
  }else{
    $.ajax({
            method  : "POST",
            url     : "./function/komentar_ajax.php",
            data    : { isi_status : isi,
                        type:"status"
                      },
            success : function(data){
                      if(data == '0'){
                        Alert.render('Anda harus login dulu!');
                      }else{
                        $('#textarea_status').val("");
                        $('#daftar_status').prepend(data);
                      }
                    }
          });
  }
});

//submit komentar use ajax
$(document).on('keypress','#textarea_komen',function(event){
  var id   = $(this).attr('class'),
      id_a = id.replace('textarea_komen_', '');
  // console.log(id_a);

  if(event.keyCode == 13 != (event.keyCode == 13 && event.shiftKey)) {
    var id_a    = $(this).attr('class'),
        id      = id_a.replace("textarea_komen_", ""), //ambil id komentar
        jml_kom = $('#jml_kom_'+id).attr('class'),
        isi     = $('.textarea_komen_'+id).val().trim();

    if(isi == ''){
      (event.keyCode == 13 && event.shiftKey);
    }else{
      var jml_kom     = Number(jml_kom)+1,
          jml_kom_new = $(document.createElement('div')).attr({
                        'id':'jml_kom_'+id,
                        'class':jml_kom
                        });
      $.ajax({
              method  : "POST",
              url     : "./function/komentar_ajax.php",
              data    : {
                          isi_komentar : isi,
                          id_status:id,
                          jml_kom:jml_kom,
                          type:"insert"
                        },
              success : function(data)
                        {
                          if(data == '0'){
                            Alert.render('Anda harus login dulu!');
                          }else{
                            $('.textarea_komen_'+id).val("");
                            $('#jml_kom_'+id).replaceWith(jml_kom_new);
                            $('#daftar_komentar_'+id).append(data);
                          }
                        }
            });
    }
  }
});

//edit then update komentar use ajax
$(document).on('click','.edit_komen',function(){
  var id        = $(this).attr('data-id'),
      isi       = $('#par_'+id).text().trim(),
      textbox   = $(document.createElement('textarea')).attr({
                  'id':'textarea_'+id,
                  'class':'textarea_edit',
                  'data-id':id
                  }),
      btn_cancel = $(document.createElement('a')).attr({
                  'class':'cancel_komen',
                  'data-id':id
                  }).text('Cancel');

  $(this).replaceWith(btn_cancel);
  $('#par_'+id).replaceWith(textbox);
  $('#textarea_'+id).val(isi).select();
  $('.cancel_komen').on('click',function(){
    var par1      = $(document.createElement('p')).attr({
                    'id':'par_'+id,
                    'class':'komentar_text',
                    'data-id':id
                    }).text(isi),
        btn_edit1 = $(document.createElement('a')).attr({
                    'class':'edit_komen',
                    'data-id':id
                    }).text('Edit');

    $('.cancel_komen').replaceWith(btn_edit1);
    $('#textarea_'+id).replaceWith(par1);
  });

  $('#textarea_'+id).keypress(function(event) {
    if(event.keyCode == 13 != (event.keyCode == 13 && event.shiftKey)) {
      var isi      = $('#textarea_'+id).val().trim(),
          par      = $(document.createElement('p')).attr({
                      'id':'par_'+id,
                      'class':'komentar_text',
                      'data-id':id
                      }).text(isi),
          btn_edit = $(document.createElement('a')).attr({
                      'class':'edit_komen',
                      'data-id':id
                      }).text('Edit');

      if(isi == ''){
        (event.keyCode == 13 && event.shiftKey);
      }else{
        $('.cancel_komen').replaceWith(btn_edit);
        $.ajax({
                method  : "POST",
                url     : "./function/komentar_ajax.php",
                data    : {
                            id_komen:id,
                            isi_komen:isi,
                            type:"update"
                          },
                success : function(data){
                            if(data == '0'){
                              Alert.render("Anda harus login dulu!");
                            }else if(data == '1'){
                              $('#textarea_'+id).replaceWith(par);
                            }
                          }
              });
      }
    }
  });
});

function deleteStatus(id){
	var id = id.replace("status_", "");
  $.ajax({
          method  : "POST",
          url     : "./function/komentar_ajax.php",
          data    : {
                      id_status:id,
                      type:"del_status"
                    },
          success : function(data){
                    if(data == '0'){
                      Alert.render("Anda harus login dulu dulu!");
                    }else if(data == '11'){
                      $("#isi_daftar_status_"+id).fadeOut();
                    }
                  }
        });
}

function deleteKomentar(id,id_stts){
	var id          = id.replace("komentar_", ""), //ambil id komentar
      jml_kom     = $('#jml_kom_'+id_stts).attr('class'), //ambil jumlah komentar saat ini
      jml_kom     = Number(jml_kom)-1, //jumlah komentar-1
      jml_kom_new = $(document.createElement('div')).attr({'id':'jml_kom_'+id_stts,'class':jml_kom}); //bikin elemen jml_kom_id_stts baru dg class yg sudah -1

  $.ajax({
          method: "POST",
          url: "./function/komentar_ajax.php",
          data: {
                  id_komen:id,
                  id_status:id_stts,
                  jml_kom:jml_kom,
                  type:"del_komentar"
                },
          success: function(data){
                    if(data == '0'){
                      Alert.render("Anda harus login dulu dulu!");
                    }else if(data == '1'){
                      $('#jml_kom_'+id_stts).replaceWith(jml_kom_new); //ganti elemen jml_kom_id_stts(ini saja) dg jml_kom_id_stts(yang baru)
                      $("#komen_"+id).fadeOut(); // hilangkan elemen komen_id(ini aja)
                    }
                  }
        });
}

//confirm function
function CustomConfirm(){
	this.render = function(dialog,op,id,id_stts){
		dialogoverlay.style.display = "block";
    dialogoverlay.style.height  = height+"px";
		dialogbox.style.left        = (winW/2) - (450 * .5)+"px";
		dialogbox.style.top         = (winH/2) - (400 * .5)+"px";
		dialogbox.style.display     = "block";
		dialogboxhead.innerHTML     = "Informasi!";
		dialogboxbody.innerHTML     = dialog;
		dialogboxfoot.innerHTML     = '<button class="btn_alert" onclick="Confirm.yes(\''+op+'\',\''+id+'\',\''+id_stts+'\')">Hapus</button><button class="btn_alert_cancel" onclick="Confirm.no()">Batal</button>';
    $('.btn_alert_cancel').focus();
    $("body").addClass("alert-open");
	}
	this.no = function(){
    $("body").removeClass("alert-open");
		dialogbox.style.display     = "none";
		dialogoverlay.style.display = "none";
	}
	this.yes = function(op,id,id_stts){
		if(op == "delete_komentar"){
			deleteKomentar(id,id_stts);
		}else if (op == "delete_status") {
		  deleteStatus(id);
		}
    $("body").removeClass("alert-open");
		dialogbox.style.display     = "none";
		dialogoverlay.style.display = "none";
	}
}

// Alert function
function CustomAlert(){
	this.render = function(dialog){
		dialogoverlay.style.display = "block";
		dialogoverlay.style.height  = height+"px";
		dialogbox.style.left        = (winW/2) - (450 * .5)+"px";
		dialogbox.style.top         = (winH/2) - (400 * .5)+"px";
		dialogbox.style.display     = "block";
		dialogboxhead.innerHTML     = "Peringatan!";
		dialogboxbody.innerHTML     = dialog;
		dialogboxfoot.innerHTML     = '<button class="btn_alert" onclick="Alert.ok()">Ok</button>';
    $("body").addClass("alert-open");
    $('.btn_alert').focus();
	}
	this.ok = function(){
    $("body").removeClass("alert-open");
		dialogbox.style.display = "none";
		dialogoverlay.style.display = "none";
	}
}
