<?php
ini_set('date.timezone', 'Asia/Jakarta');

//convert to paragraph
function toPhar($text)
{
  $phar = ucfirst(str_replace('\n', '<br>', $text));
  return $phar;
}

//convert to link
function toLink($text)
{
  $phar = ucfirst(str_replace('http://', '<br>', $text));
  // $text = 'bslabslas http://ansla.com sasasa';
  // $phar = stristr($text,'http://',false);
  // $phar .= stristr($text,'https://',true);

  return $phar;
}


?>
