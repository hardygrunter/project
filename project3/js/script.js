'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // Tabs

  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParrent = document.querySelector('.tabheader__items');

  const hideTabContent = () => {
    tabsContent.forEach(tab => {
      tab.classList.add('hide');
      tab.classList.remove('show', 'fade');
    });
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  };
  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent();

  tabsParrent.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (tab === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer
  const deadline = '2022-02-06';

  function getTimeRemaining(endTime) {
    const diff = Date.parse(endTime) - Date.now(),
      days = Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours = Math.floor(diff / (1000 * 60 * 60) % 24),
      minutes = Math.floor(diff / (1000 * 60) % 60),
      seconds = Math.floor(diff / 1000 % 60);

    return {
      total: diff,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function getZero(num) {
    return num <= 0 || isNaN(num) ? '0' : num < 10 ? `0${num}` : `${num}`;
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const remainingTime = getTimeRemaining(endTime);

      if (remainingTime <= 0) {
        clearInterval(timeInterval);
      }

      days.textContent = getZero(remainingTime.days);
      hours.textContent = getZero(remainingTime.hours);
      minutes.textContent = getZero(remainingTime.minutes);
      seconds.textContent = getZero(remainingTime.seconds);
    }
  }

  setClock('.timer', deadline);

  // Modal

  const modal = document.querySelector('.modal'),
    modalTriggers = document.querySelectorAll('[data-modal]');

  const modalTimerId = setTimeout(openModal, 50000); // Timeout

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (modal.classList.contains('show')) {
        return;
      }
      openModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Escape' || !modal.classList.contains('show')) {
      return;
    }
    closeModal();
  });


  window.addEventListener('scroll', showModalByScroll);

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.paddingRight = 0;
    document.body.style.overflow = '';
  }

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  // Cards
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 27;
      this.classes = classes.length ? classes : ['menu__item'];
      this.parent = document.querySelector(parentSelector);
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = Math.round(this.price * this.transfer);
    }

    render() {
      const elem = document.createElement('div');
      this.classes.forEach(className => elem.classList.add(className));
      elem.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(elem);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    8.48,
    '.menu .container'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20.37,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    15.92,
    '.menu .container',
    'menu__item'
  ).render();

  // Forms
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(form => {
    postData(form);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
      statusMessage.src = message.loading;
      form.after(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

      const formData = new FormData(form);

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          form.reset();
          showThanksModal(message.success);
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          showThanksModal(message.failure);
        }
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
});