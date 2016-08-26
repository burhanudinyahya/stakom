// Ajax

$('#submit_status').on('click',function(){
  var isi = $('#textarea_status').val().trim();
    if(isi == ''){
      // alert("Harus di Isi bro!");
      $('#textarea_status').focus();
    }else{
      $.ajax({
        method: "POST",
        url: "./function/komentar_ajax.php",
        data: { isi_status : isi, type:"status" },
        success: function(data){
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
// Jika submit di klik
// $('#submit_komen').on('click',function(){
// Jika text area di enter, boleh shift enter
// $('#textarea_komen').focus(function() {


$(document).on('keypress','#textarea_komen',function(event){
  // var id_a = '';
  var id_a = $(this).attr('class');
  // console.log(id_a);


  if(event.keyCode == 13 != (event.keyCode == 13 && event.shiftKey)) {
  var id = $(this).attr('class');
  var jml_kom = $('#jml_kom_'+id).attr('class');
  var isi = $('.'+id).val().trim();
  // console.log(jml_kom);
    if(isi == ''){
      (event.keyCode == 13 && event.shiftKey);
      // Alert.render("Komen harus diisi!");
      // $('#textarea_komen').focus();
    }else{
      // var jml_kom = jml_kom + 1;
      var jml_kom = Number(jml_kom)+1;
      var jml_kom_new = $(document.createElement('div')).attr({'id':'jml_kom_'+id,'class':jml_kom});
      // console.log(jml_kom);
      $.ajax({
        method: "POST",
        url: "./function/komentar_ajax.php",
        data: { isi_komentar : isi, id_status:id, jml_kom:jml_kom,type:"insert" },
        success: function(data){
          if(data == '0'){
            Alert.render('Anda harus login dulu!');
          }else{
            $('.'+id).val("");
            $('#jml_kom_'+id).replaceWith(jml_kom_new);
            $('#daftar_komentar_'+id).append(data);
          }
        }
      });
    }
  }
});


$(document).on('click','.edit_komen',function(){
  var id = $(this).attr('data-id');
  var isi = $('#par_'+id).text().trim();
  // console.log(isi);
  var textbox = $(document.createElement('textarea')).attr({'id':'textarea_'+id,'class':'textarea_edit','data-id':id});
  var btn_cancel = $(document.createElement('a')).attr({
    'href':'#',
    'class':'cancel_komen',
    'data-id':id
    // 'type':'button'
  }).text('Cancel');

  $(this).replaceWith(btn_cancel);
  $('#par_'+id).replaceWith(textbox);
  $('#textarea_'+id).val(isi).select();

  $('.cancel_komen').on('click',function(){
    // console.log(id);
    // console.log(isi);
    var par1 = $(document.createElement('p')).attr({
      'id':'par_'+id,
      'class':'komentar_text',
      'data-id':id
    }).text(isi);
    // console.log(par);
    var btn_edit1 = $(document.createElement('a')).attr({
      'href':'#',
      'class':'edit_komen',
      'data-id':id
    }).text('Edit');

    $('.cancel_komen').replaceWith(btn_edit1);
    $('#textarea_'+id).replaceWith(par1);
  });

  // $(document).on('click','.update_komen',function(){
  $('#textarea_'+id).keypress(function(event) {
    if(event.keyCode == 13 != (event.keyCode == 13 && event.shiftKey)) {
      // var id = $(this).attr('data-id');
      var isi = $('#textarea_'+id).val().trim();
      // console.log(isi);
      var par = $(document.createElement('p')).attr({
        'id':'par_'+id,
        'class':'komentar_text',
        'data-id':id
      }).text(isi);
      // console.log(par);
      var btn_edit = $(document.createElement('a')).attr({
        'href':'#',
        'class':'edit_komen',
        'data-id':id
      }).text('Edit');

      if(isi == ''){
        (event.keyCode == 13 && event.shiftKey);
        // Alert.render("Komen harus diisi!");
        // $('#textarea_'+id).focus();
      }else{
        $('.cancel_komen').replaceWith(btn_edit);
        $.ajax({
          method: "POST",
          url: "./function/komentar_ajax.php",
          data: { id_komen:id, isi_komen:isi, type:"update" },
          success: function(data){
            // console.log(data);
            if(data == '0'){
              Alert.render("Anda harus login dulu!");
            }else if(data == '1'){
              // $(this).replaceWith(btn_edit);
              $('#textarea_'+id).replaceWith(par);
            }
          }
        });
      }
    }
  });


});

// CustomAlert
function CustomAlert(){
	this.render = function(dialog){
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
		var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
		dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (450 * .5)+"px";
		dialogbox.style.top = "200px";
		dialogbox.style.display = "block";
		document.getElementById('dialogboxhead').innerHTML = "Peringatan!";
		document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxfoot').innerHTML = '<button class="btn_alert" onclick="Alert.ok()">Ok</button>';
    $('.btn_alert').focus();
	}
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
    // $(textarea).focus();
	}
}

var Alert = new CustomAlert();

// end of CustomAlert
// ============================================================
// Delete ConfirmAlert
function deleteStatus(id){
	var id = id.replace("status_", "");
  $.ajax({
    method: "POST",
    url: "./function/komentar_ajax.php",
    data: { id_status:id, type:"del_status" },
    success: function(data){
      // console.log(data);
      if(data == '0'){
        Alert.render("Anda harus login dulu dulu!");
      }else if(data == '11'){
        $("#isi_daftar_status_"+id).fadeOut();
      }
    }
  });
	// document.body.removeChild(document.getElementById(id));
}

function deleteKomentar(id){
	var id = id.replace("komentar_", "");
  // var jml_kom = $('#jml_kom_'+id).attr('class');
  $.ajax({
    method: "POST",
    url: "./function/komentar_ajax.php",
    data: { id_komen:id, type:"del_komentar" },
    success: function(data){
      // console.log(data);
      if(data == '0'){
        Alert.render("Anda harus login dulu dulu!");
      }else if(data == '1'){
        $("#komen_"+id).fadeOut();
      }
    }
  });
	// document.body.removeChild(document.getElementById(id));
}

function CustomConfirm(){
	this.render = function(dialog,op,id){
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
		var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
		dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (450 * .5)+"px";
		dialogbox.style.top = "200px";
		dialogbox.style.display = "block";

		document.getElementById('dialogboxhead').innerHTML = "Informasi!";
		document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxfoot').innerHTML = '<button class="btn_alert" onclick="Confirm.yes(\''+op+'\',\''+id+'\')">Hapus</button><button class="btn_alert_cancel" onclick="Confirm.no()">Batal</button>';
    $('.btn_alert_cancel').focus();
	}
	this.no = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.yes = function(op,id){
		if(op == "delete_komentar"){
			deleteKomentar(id);
		}else if (op == "delete_status") {
		  deleteStatus(id);
		}
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}

var Confirm = new CustomConfirm();
//End of Delete ConfirmAlert

// auto hide meta status & komen
//===============Status====================
// $('.status').mouseenter(function(){
$(document).on('mouseenter','.status',function(){
  var id = $(this).attr('data-id');
  // console.log(id);
  $('#'+id).css('display','inline');
});

// $('.status').mouseleave(function(){
$(document).on('mouseleave','.status',function(){
  var id = $(this).attr('data-id');
  // console.log(id);
  $('#'+id).css('display','none');
});
//================Komen=====================
// $('.post-komen').mouseenter(function(){
$(document).on('mouseenter','.post-komen',function(){
  var id = $(this).attr('data-id');
  // console.log(id);
  $('#'+id).css('display','block');
});

// $('.post-komen').mouseleave(function(){
$(document).on('mouseleave','.post-komen',function(){
  var id = $(this).attr('data-id');
  // console.log(id);
  $('#'+id).css('display','none');
});
//End of Autohide
