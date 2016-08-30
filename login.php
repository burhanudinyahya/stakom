<?php
//Silent is golden
require_once ('load.php');

if(isset($_SESSION['user'])){
  header('Location: '.$base_url.'/');
}

if(isset($_GET['action'])){
    if($_GET['action'] === 'logout'){
        if(isset($_SESSION['user'])){
            session_destroy();
            header('Location: '.$base_url.'/login.php');
        }else{
            header('Location: '.$base_url.'/login.php');
        }
    }
}

$message = '';
if(isset($_POST['submit'])){
  $user = trim($_POST['username']);
  $pass = trim($_POST['password']);
  if(!empty($user) && !empty($pass)){
    if(cek_user($user, $pass)){
      $_SESSION['user'] = $user;
      header('Location: '.$base_url.'/');
    }else{
      $message = 'Username dan Password tidak cocok';
    }
  }else{
    $message = 'User dan Password Harus diisi';
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
  <p style="text-align:center;color:red;margin-bottom:10px"><?=$message; ?></p>
  <?php endif; ?>
  <form action="" method="post">
    <input type="text" name="username" placeholder="Username" autofocus>
    <input type="password" name="password" placeholder="Password">
    <input class="btn-login" type="submit" name="submit" value="Masuk">
  </form>
</div>
<div class="panel">
  <a href="register.php">Register</a>
</div>

</body>
</html>
