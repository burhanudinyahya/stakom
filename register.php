<?php
require_once ('load.php');

if(isset($_SESSION['user'])){
  header('Location: '.$base_url.'/');
}

$message = '';
if(isset($_POST['submit'])){
  $user   = htmlentities(strip_tags(trim($_POST['username'])));
  $user   = str_replace(" ", "", strtolower($user));
  $email  = trim($_POST['email']);
  $pass   = trim($_POST['password']);
  $name   = htmlentities(strip_tags(trim($_POST['name'])));

  if(!empty($user) && !empty($email) && !empty($pass) && !empty($name)){
    if($user_exist = !(cek_user_exist($user, $email))){
      if(add_user($user, $email, $pass, $name)){
        $message = 'Silahkan Login';
        $_SESSION['message'] = $message;
        header('Location: '.$base_url.'/login.php');
      }else{
        $message = 'Ada kesalahan saat menambahkan user';
      }
    }elseif($user_exist = cek_user_exist($user, $email)){
      while($row = mysqli_fetch_assoc($user_exist)){
        $user_e = $row['username'];
        $email_e = $row['email'];
      }
      if($user == $user_e){
        $message = 'Username sudah terpakai';
      }elseif($email == $email_e){
        $message = 'Email ini sudah terdaftar';
      }
    }
  }else{
    $message = 'Semua harus diisi';
  }
}

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Stakom Mini</title>
<link rel="stylesheet" href="./assets/css/style.css" media="screen" charset="utf-8">
</head>
<body>

<h1 class="header-login">Stakom Mini 1.0.7</h1>
<div class="login">
  <?php if(isset($message)) : ?>
  <p style="text-align:center;color:red;margin-bottom:10px"><?= $message; ?></p>
  <?php endif; ?>
  <form action="" method="post">
    <input type="text" name="username" placeholder="Username" autofocus>
    <input type="password" name="password" placeholder="Password">
    <input type="email" name="email" placeholder="Email">
    <input type="text" name="name" placeholder="Nama Lengkap">
    <input class="btn-login" type="submit" name="submit" value="Daftar">
  </form>
</div>
<div class="panel">
  <a href="login.php">Login</a>
</div>

</body>
</html>
