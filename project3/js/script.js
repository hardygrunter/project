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
        modalTriggers = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (modal.classList.contains('show')) return;
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';
      document.body.style.overflow = 'hidden';
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target !== modal) return;
    closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Escape' || !modal.classList.contains('show')) return;
    closeModal();
  });

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.paddingRight = 0;
    document.body.style.overflow = '';
  }
});