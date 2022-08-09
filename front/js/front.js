var menu = document.getElementById('menu');
menu.addEventListener('click',
	function () {
    	var header = document.getElementsByTagName('header')[0];
        var main = document.getElementsByTagName('main')[0];
        header.classList.toggle('open');
        main.classList.toggle('open');
        // menu.classList.toggle('open');
    }
);