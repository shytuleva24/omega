function sendForm() {

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = form.querySelector('.name').value;
      const email = form.querySelector('.email').value;
      const phone = form.querySelector('.phone').value;
      const message = form.querySelector('.message').value;
      const successMessage = form.querySelector('.success-message');
      const sendButton = form.querySelector('.send-button');
      sendButton.classList.add('loading');
      const data = {
        name: name,
        email: email,
        phone: phone,
        message: message
      };

      const jsonData = JSON.stringify(data);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'php/index.php');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        console.log(xhr.responseText);
        sendButton.classList.remove('loading');
        successMessage.style.display = 'block';
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 2500);
      };
      xhr.send(jsonData);

      form.reset();
    });
  });
}

