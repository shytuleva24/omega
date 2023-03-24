<?php
// if (isset($_POST)) {
    // $to = 'shytuleva@gmail.com';
    // $subject = 'From account@dropex.net';
    // $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=' . PHP_EOL;
    // $message = '<table cellpadding=\'0\' cellspacing=\'0\' border=\'0\'>';
    // foreach($_POST as $key => $value) {
    //     $message .= '<tr><td align=\'right\'>'.$key.':</td><td>&nbsp;<b>'.Trim(stripslashes($value)).'</b></td></tr>';
    // }
    // $message .= '</table>';
    // var_dump($message);
    // $headers = 'From: account@dropex.net' . PHP_EOL . 'Reply-To: account@dropex.net' . PHP_EOL . 'Content-Type: text/html; charset=UTF-8' . PHP_EOL . 'MIME-Version: 1.0' . PHP_EOL . 'Content-Transfer-Encoding: 8bit ' . PHP_EOL;

    // // обмеження на кількість відправлених повідомлень з одного IP-адреси
    // $ip_address = $_SERVER['REMOTE_ADDR'];
    // $file_path = 'messages_sent.txt';
    // $messages_sent = array();
    // if (file_exists($file_path)) {
    //     $messages_sent = unserialize(file_get_contents($file_path));
    // }
    // $current_time = time();
    // $hour_ago = $current_time - 3600; // 1 година тому
	// $formatted_time = date('Y-m-d H:i:s', $current_time);
    // $messages_sent_within_hour = array_filter($messages_sent, function($message) use ($ip_address, $hour_ago) {
    //     return ($message['ip_address'] == $ip_address && $message['time'] > $hour_ago);
    // });
    // // if (count($messages_sent_within_hour) >= 5) { // було відправлено більше 5 повідомлень з цього IP-адреси за годину
    // //     print_r(429); // повертаємо HTTP код 429 (Too Many Requests)
    // //     exit;
    // // }
    // // додаємо інформацію про відправлене повідомлення до масиву і зберігаємо його в файл
    // $messages_sent[] = array(
    //     'ip_address' => $ip_address,
    //     'time' => $formatted_time
	// );
	// file_put_contents($file_path, serialize($messages_sent));
	// // відправка повідомлення
	// if (mail($to, $subject, $message, $headers)) {
	// 	echo 'Message sent';
	// } else {
	// 	echo 'Error sending message';
	// }
// }
// получаем данные формы
// получаем данные из JSON-строки
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// получаем отдельные значения из массива
$name = $data['name'];
$email = $data['email'];
$message = 'Name:   ' . $name . "\r\n" .
            'From:   ' . $email . "\r\n" .
            'Message:   ' . $data['message'] . "\r\n";
$hash = $data['hash'];
// проверяем наличие пустых полей
if (empty($name) || empty($email) || empty($message)) {
  echo 'Error: please fill in all fields of the form!';
  exit;
}

// проверяем валидность email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo 'Error: Please enter correct email!';
  exit;
}

// настройки почтового сервера
$to = 'shytuleva@gmail.com';
$subject = 'New post from the site';
$headers = 'From: ' . $email . "\r\n" .
           'Reply-To: ' . $email . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

// отправляем письмо
if (mail($to, $subject, $message, $headers)) {
  echo 'Thank you! Your message has been sent.';
} else {
  echo 'Error: Failed to send message.';
}
