<?php

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$message = 'Name:   ' . $name . "\r\n" .
            'From:   ' . $email . "\r\n" .
            'Phone:   ' . $phone . "\r\n" .
            'Message:   ' . $data['message'] . "\r\n";
$hash = $data['hash'];

if (empty($name) || empty($email) || empty($message)) {
  echo 'Error: please fill in all fields of the form!';
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo 'Error: Please enter correct email!';
  exit;
}

$to = 'shytuleva@gmail.com';
$subject = 'New post from the site';
$headers = 'From: ' . $email . "\r\n" .
           'Reply-To: ' . $email . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $message, $headers)) {
  echo 'Thank you! Your message has been sent.';
} else {
  echo 'Error: Failed to send message.';
}
