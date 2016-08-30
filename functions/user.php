<?php

function cek_user($user, $pass)
{
	global $link;
	$u = mysqli_escape_string($link, $user);
	$p = mysqli_escape_string($link, $pass);
	$p = md5($p);

	$query = "SELECT * FROM tb_user
						WHERE username='$u' AND password='$p'";
	if($result = mysqli_query($link, $query))
	{
		if(mysqli_num_rows($result) != 0) return true;
			else return false;
	}
}

function cek_user_exist($user, $email)
{
	global $link;
	$u = mysqli_escape_string($link, $user);
	$e = mysqli_escape_string($link, $email);

	$query = "SELECT username, email FROM tb_user
						WHERE username='$u' OR email='$e'";

	if($result = mysqli_query($link, $query))
	{
		if(mysqli_num_rows($result) != 0) return $result;
			else return false;
	}
}

function add_user($user, $email, $pass, $name){
	global $link;
	$u = mysqli_escape_string($link, $user);
	$e = mysqli_escape_string($link, $email);
	$p = mysqli_escape_string($link, $pass);
	$p = md5($p);
  $n = mysqli_escape_string($link, $name);

	$query = "INSERT INTO tb_user (username, email, password, nama)
						VALUES ('$u', '$e', '$p', '$n')";

	if(mysqli_query($link, $query)) return true;
	else return false;

}


?>
