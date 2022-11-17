$(document).ready(function () {
  const enumerateDaysBetweenDates = function (startDate, endDate) {
    const now = startDate,
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("dddd, DD MMM"));
      now.add(1, "days");
    }
    return dates;
  };

  const dateSelect = document.getElementById("date");

  const fromDate = moment();
  const toDate = moment().add(1, "month");
  const results = enumerateDaysBetweenDates(fromDate, toDate);
  for (let i = 0; i < results.length; i++) {
    const opt = results[i];
    const el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    dateSelect.appendChild(el);
  }

  const discount = sessionStorage.getItem("discount");
  if (!discount) {
    setTimeout(function () {
      $("#discount-open").click();
      sessionStorage.setItem("discount", true);
    }, 17000);
  }
});

$(function () {
  setTimeout(function () {
    var preloader = document.getElementById("page-preloader");
    if (!preloader.classList.contains("done")) {
      preloader.classList.add("done");
    }
  }, 1000);

  $(".btn_mnu").click(function () {
    $(this).toggleClass("active");
    $(".menu").toggleClass("open");
    $(".menu__bg").toggleClass("open");
  });

  $(".menu li a").click(function () {
    $(".menu").removeClass("open");
    $(".menu__bg").removeClass("open");
    $(".btn_mnu").removeClass("active");
  });

  $(".menu__bg").click(function () {
    $(".menu").removeClass("open");
    $(".menu__bg").removeClass("open");
    $(".btn_mnu").removeClass("active");
  });

  $(".menu li .menu__link").click(function (e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $("html,body").animate({ scrollTop: $(aid).offset().top - 165 }, "slow");
  });

  $(".before-after-carousel").slick({
    swipe: false,
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 165) {
      $(".header").addClass("active");
    } else {
      $(".header").removeClass("active");
    }
  });

  Cocoen.parse(document.body);
  $(".app-carousel").slick({
    dots: false,
    arrow: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });

  Fancybox.bind('[data-fancybox="price"]', {
    groupAttr: false,
  });

  ymaps.ready(init);

  function init() {
    var suggestView1 = new ymaps.SuggestView("suggest");
  }
});

function sendMail() {
  const params = {
    from_name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("suggest").value,
    apt: document.getElementById("apt").value,
    entrance: document.getElementById("entrance").value,
    floor: document.getElementById("floor").value,
    intercom: document.getElementById("intercom").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_gk0a39c", "template_v3u5ybd", params)
    .then(function (res) {
      Fancybox.show([{ src: "#success", type: "inline" }]);
      document.getElementById("name").value = null;
      document.getElementById("phone").value = null;
      document.getElementById("suggest").value = null;
      document.getElementById("apt").value = null;
      document.getElementById("entrance").value = null;
      document.getElementById("floor").value = null;
      document.getElementById("intercom").value = null;
      document.getElementById("date").value = "";
      document.getElementById("time").value = "";
      document.getElementById("message").value = null;
    });
}
