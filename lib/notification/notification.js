let pba_notification_container = null;
function showNotification(message, type = 'info', permanent=false) {
	if (pba_notification_container == null) {
		if ((pba_notification_container = document.getElementById('pba-notification-container')) == null) {
			pba_notification_container = document.createElement('div');
			pba_notification_container.id = 'pba-notification-container';
			document.body.appendChild(pba_notification_container);
		}
	}
	const notif_element = document.createElement('div');
	notif_element.classList.add('pba-notification');
	notif_element.innerHTML = message.replace("\n", "<br>");
	notif_element.classList.add('t-'+type);
	notif_element.setAttribute('permanent', permanent);
	notif_element.addEventListener('click', () => {
		notif_element.classList.remove('shown');
		setTimeout(() => {
			notif_element.remove();
		}, 500);
	});
	pba_notification_container.appendChild(notif_element);
	setTimeout(() => {
		notif_element.classList.add('shown');
		if (notif_element.getAttribute('permanent') != 'true') {
			setTimeout(() => {
				notif_element.classList.remove('shown');
				setTimeout(() => {
					notif_element.remove();
				}, 500);
			}, 5000);
		}
	}, 100);
}
