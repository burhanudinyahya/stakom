<?php
require_once ('load.php');
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Latian Komentar Ajax</title>
  <link rel="stylesheet" href="./css/style.css" media="screen" charset="utf-8">
</head>
<body>
<div id="dialogoverlay"></div>
<div id="dialogbox">
	<div>
		<div id="dialogboxhead"></div>
		<div id="dialogboxbody"></div>
		<div id="dialogboxfoot"></div>
	</div>
</div>
<h1>Status</h1>
<div class="kolom_status">
  <img src="./img/burhan.jpg"/>
  <textarea style="font-size:14px;" name="textarea_status" id="textarea_status" placeholder="What's on your mind?"></textarea>
</div>
<div class="btn_post">
  <button type="submit" name="submit_status" id="submit_status">Post</button>
</div>
<!-- Mulai sini -->
<div id="daftar_status">
  <?php
  // include_once './core/init.php';
  $query = "SELECT * FROM tb_status ORDER BY id DESC";
  $status = mysqli_query($link, $query);
  foreach ($status as $stts) {
    $id_status = $stts['id'];
    $jml_kmn = $stts['jumlah_komentar'];
    $date_in = date('d F \a\t H:i', strtotime($stts['tanggal_status']));
    $title_date = date('l, d F Y \a\t H:i', strtotime($stts['tanggal_status']));
  ?>
  <div id="jml_kom_<?= $id_status; ?>" class="<?=$jml_kmn;?>"></div>
  <div id="isi_daftar_status_<?= $id_status; ?>">
  <div class="status" data-id="<?= $id_status; ?>">
    <a href="#"><img src="./img/burhan.jpg"></a>
    <p class="author"><a href="#">Burhaudin Yahya</a></p>
    <p class="date">
      <a style="color:#90949c;" title="<?= $title_date ?>"><?= $date_in ?></a>
      <span id="<?= $id_status ?>" class="rei"> . <a id="<?= $id_status ?>" class="hapus_status" href="#" onclick="Confirm.render('Apakah anda yakin akan hapus status ini?','delete_status','status_<?= $id_status; ?>')">Hapus</a> . <a id="<?= $id_status ?>" class="edit_status" href="#">Edit</a></span>
    </p>
    <p><?= $stts['isi_status']; ?></p>
  </div>
  <div class="komentar">
    <div id="daftar_komentar_<?= $id_status ?>">
      <?php
      // include_once './core/init.php';
      $query = "SELECT * FROM tb_komentar WHERE id_status='$id_status'";
      $comments = mysqli_query($link, $query);
      foreach ($comments as $comment) {
        $date_kom = date('d F \a\t H:i', strtotime($comment['tanggal_komentar']));
        $title_date_kom = date('l, d F Y \a\t H:i', strtotime($comment['tanggal_komentar']));
      ?>

      <div id="komen_<?= $comment['id']; ?>">
        <div class="post-komen" data-id="<?= $comment['id']; ?>">
          <div class="img-author">
            <a href="#"><img src="./img/burhan.jpg"></a>
          </div>
          <div class="komen-author">
            <a href="#" class="author-komentar">Burhaudin Yahya</a>
            <div class="meta" id = "<?= $comment['id']; ?>">
            <a href="#" class="hapus_komen" data-id="<?= $comment['id']; ?>" onclick="Confirm.render('Apakah anda yakin akan hapus komen ini?','delete_komentar','komentar_<?= $comment['id']; ?>')">Hapus</a>
            <a href="#" class="edit_komen" data-id="<?= $comment['id']; ?>">Edit</a>
            </div>
            <p id="par_<?= $comment['id']; ?>" class="komentar_text" data-id="<?= $comment['id']; ?>">
              <?= $comment['isi_komentar']; ?>
            </p>
            <a href="#" class="balas_komen" data-id="<?= $comment['id']; ?>">Balas</a> . <a class="balas_komen" style="color:#90949c;" title="<?= $title_date_kom ?>" class="date"><?= $date_kom ?></a>
          </div>
        </div>
      </div>
      <?php } ?>
    </div>
    <div class="post-komen">
      <div class="img-author">
        <img src="./img/burhan.jpg" alt="" />
      </div>
      <div class="komen-author">
      <textarea class="<?= $id_status; ?>" name="textarea_komentar" id="textarea_komen" placeholder="Write a comment..."></textarea>
      </div>
    </div>
  </div>
  </div
  <?php } ?>
</div>
<script src="./jquery/jquery.min.js"></script>
<script src="./js/ajax.js"></script>

</body>
</html>
