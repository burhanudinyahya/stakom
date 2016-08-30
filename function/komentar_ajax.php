<?php
include_once ('../load.php');

if(!isset($_SESSION['user'])){
  die('0');
}

//====POST STATUS===============
if($_POST['type'] == 'status' && $_POST["isi_status"] != ''){
  $isi =  htmlspecialchars(trim($_POST["isi_status"]));
  $status = mysqli_real_escape_string($link,  ucfirst($isi));
  $status = toPhar($status);

  $query = "INSERT INTO tb_status (isi_status, id_user,tanggal_status) VALUES ('$status', 1,now())";

  if(mysqli_query($link, $query)){
    $last_id =  mysqli_insert_id($link);
    $date = date('d F \a\t H:i', time());
    $title = date('l, d F Y \a\t H:i', time());

    echo "<div id='jml_kom_$last_id' class='0'></div>
          <div id='isi_daftar_status_$last_id'>
            <div class='status' data-id='$last_id'>
              <a href='#'><img src='./img/burhan.jpg'></a>
              <p class='author'><a href='#'>Burhaudin Yahya</a></p>
              <p class='meta_status'>
                <a class='meta_date' title='$title'>$date</a>
                <span id='$last_id' class='rei'> .
                <a id='$last_id' class='hapus_status'>Hapus</a> .
                <a id='$last_id' class='edit_status'>Edit</a>
                </span>
              </p>
              <p>$status</p>
              <div class='action_status'>
                <div id='suka_$last_id' class='suka_status'><a id='$last_id' class='suka_link'>Suka</a></div>
                <div id='komen_$last_id' class='komen_status'><a id='$last_id' class='komen_link'>Komentar</a></div>
              </div>
            </div>
            <div class='komentar'>
              <div class='hasil_suka' id='hasil_$last_id' >
                <span id='suka_$last_id' class='jumlah_suka'>
                <a id='$last_id' class='nama_link'>Burhanudin Yahya</a>
                </span>
              </div>
              <div id='daftar_komentar_$last_id'></div>
              <div class='post-komen'>
                <div class='img-author'><img src='./img/burhan.jpg'></div>
                <div class='komen-author'>
                  <textarea class='textarea_komen_$last_id' name='textarea_komentar' id='textarea_komen' placeholder='Write a comment...'></textarea>
                </div>
              </div>
            </div>
          </div>";
  }else{
    echo "errrrror bro";
  }

}

//===========DELETE STATUS =================
if($_POST['type'] == 'del_status'){

  $query = "SELECT * FROM tb_komentar WHERE id_status=".$_POST['id_status'];
  $result = mysqli_query($link, $query);

  if(mysqli_num_rows($result) != 0){
    $query2 = "DELETE FROM tb_komentar WHERE id_status=".$_POST['id_status'];
    if(mysqli_query($link, $query2)){
      echo "1";
    }else{
      echo "-1";
    }
    $query3= "DELETE FROM tb_status WHERE id=".$_POST['id_status'];
    if(mysqli_query($link, $query3)){
      echo "1";
    }else{
      echo "-1";
    }
  }else{
    $query3= "DELETE FROM tb_status WHERE id=".$_POST['id_status'];
    if(mysqli_query($link, $query3)){
      echo "11";
    }else{
      echo "-1-1";
    }
  }

}

//=========POST KOMENTAR===============
if($_POST['type'] == 'insert' && $_POST["isi_komentar"] != ''){
  $isi =  htmlspecialchars(trim($_POST["isi_komentar"]));
  $id_stts = $_POST["id_status"];
  $jml_kom = (int)$_POST["jml_kom"];
  // $jml_kom = (int)$jml_kom + 1;
  $komentar = mysqli_real_escape_string($link,  $isi);
  $komentar = toPhar($komentar);

  mysqli_query($link, "UPDATE tb_status SET jumlah_komentar='$jml_kom' WHERE id='$id_stts'");

  $query = "INSERT INTO tb_komentar (isi_komentar,id_status,tanggal_komentar, id_user)
            VALUES ('$komentar', '$id_stts', now() ,1)";

  if(mysqli_query($link, $query)){
    $last_id =  mysqli_insert_id($link);
    $date_k = date('d F \a\t H:i', time());
    $title_dk = date('l, d F Y \a\t H:i', time());

    echo "<div id='komen_$last_id'>
            <div class='post-komen' data-id='$last_id'>
              <div class='img-author'>
                <a href='#'><img src='./img/burhan.jpg'/></a>
              </div>
              <div class='komen-author'>
                <a href='#' class='author-komentar'>Burhaudin Yahya</a>
                <div class='meta_komen' id='$last_id'>
                  <a class='hapus_komen' data-status='$id_stts' data-id='$last_id'>Hapus</a>
                  <a class='edit_komen' data-id='$last_id'>Edit</a>
                </div>
                <p id='par_$last_id' class='komentar_text' data-id='$last_id'>$komentar</p>
                <a class='suka_komen' data-id='$last_id'>Suka</a> .
                <a class='balas_komen' data-id='$last_id'>Balas</a> .
                <span id='suka_balas_$last_id' class='jumlah_suka_balas'>
                  <a class='suka_balas' data-id='$last_id'>1 . </a>
                </span>
                <a title='$title_dk' class='date'>$date_k</a>
              </div>
            </div>
          </div>";
  }else{
    printf("Error: %s\n", mysqli_error($link));
  }

}

//===========DELETE KOMENTAR =================
if($_POST['type'] == 'del_komentar'){
  // Update jumlah_komentar yang sudah dikurangi 1
  mysqli_query($link, "UPDATE tb_status SET jumlah_komentar=".$_POST['jml_kom']." WHERE id=".$_POST['id_status']);
  // Delete komentar
  $query = "DELETE FROM tb_komentar WHERE id=".$_POST['id_komen'];
  //jika berhasil keluarkan 1 else -1
  if(mysqli_query($link, $query)){
    echo "1";
  }else{
    echo "-1";
  }

}

//=============EDIT UPDATE KOMENTAR=============
if($_POST['type'] == 'update' && $_POST["isi_komen"] != ''){

  $isi = htmlspecialchars(trim($_POST['isi_komen']));
  $isi = mysqli_real_escape_string($link,  $isi);
  $isi = toPhar($isi);

  $query = "UPDATE tb_komentar
            SET isi_komentar ='$isi', tanggal_update = now()
            WHERE id=".$_POST['id_komen'];

  if(mysqli_query($link, $query)){
    echo "1";
  }else{
    echo "-1";
  }

}

?>
