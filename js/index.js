$(document).ready(() => {
	// Проверка, с чего зашел посетитель
	const isMobile = window.matchMedia("only screen and (max-width: 640px)");

	// Переменная для смены изображений
	let arrayOfImages = 1;

	// Показывает всплывающее окно с формой для звонка
	$("#callOrder").on("click", () => {
		$("#formContainer").fadeIn("fast");
	});

	// Если клик был вне всплывающего окна, то окно закрывается
	$(document).on("mouseup", e => {
		let formContainer = $("#formContainer");
		if (
			!formContainer.is(e.target) &&
			formContainer.has(e.target).length === 0
		)
			formContainer.hide();
	});

	// Маска для поля с номером телефона
	$("#phone").mask("+7(999)999-9999");

	// Добавляет сообщение об ошибке, при неправильном вводе номера
	const requiredInput = () => {
		$("#phone").val("Неверный номер");
		$("#phone").addClass("requiredInput");
	};

	// Выводит сообщение с именем или без
	const checkName = () => {
		let name = $("#name").val();
		name === ""
			? alert("Вам перезвонят в ближайшее время.")
			: alert(`${name}, с Вами свяжутся в ближайщее время.`);
		$("#formContainer").hide("fast");
	};

	// При клике на инпут с телефоном очищает от ошибок
	$("#phone").on("click", () => $("#phone").removeClass("requiredInput"));

	// При отправке формы проверяет корректность номера телефона
	$("#submitBtn").on("click", e => {
		$(e.currentTarget);
		let phoneShablone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		let phone = $("#phone").val();
		phoneShablone.test(phone) && phone.length >= 14
			? checkName()
			: requiredInput();
		return false;
	});

	// Меняет изображение
	const changeImage = () => {
		$("#mainImage")
			.children("div")
			.css("background", `url(img/${arrayOfImages}.jpg)`);
	};

	// Проверяет переменную, что бы менять изображения
	const checkNumber = value => {
		value === "plus" ? (arrayOfImages += 1) : (arrayOfImages -= 1);
		arrayOfImages > 5 || arrayOfImages <= 0
			? (arrayOfImages = 1)
			: arrayOfImages;
	};

	// Меняет изображение по порядку
	$("#nextImage").on("click", () => {
		checkNumber("plus");
		changeImage();
	});

	// Меняет изображение в обратном порядке
	$("#prevImage").on("click", () => {
		checkNumber("minus");
		changeImage();
	});

	// Автоматически меняет изображения раз в 5 секунд
	const changeImageWithInterval = () =>
		setInterval(() => {
			changeImage();
			checkNumber("plus");
		}, 5000);

	changeImageWithInterval();

	// На телефонах скрывает/показывает меню
	$("#menuBtn").on("click", () =>$("#menuBtn").siblings("ul").toggle(300));

	// На телефонах скрывает/показывает новости
	$("#newsBtn").on("click", () => {
		if (isMobile.matches) {
			$("#news")
				.children("div")
				.toggle(300);
			$('hr').toggle();
		}
	});
});
