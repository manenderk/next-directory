// =========================================================
// Material Kit 2 - v3.0.4
// =========================================================

// Product Page: https://www.creative-tim.com/product/soft-ui-design-system
// Copyright 2021 Creative Tim (https://www.creative-tim.com)

// Coded by Creative Tim

// =========================================================

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// initialization of Popovers

import "/assets/js/core/bootstrap.min.js";
import "/assets/js/core/jquery.min.js";
//import "/assets/js/core/popper.min.js";
import "/assets/js/plugins/perfect-scrollbar.min.js";
import "/assets/js/plugins/slick/slick.min.js";

// let popoverTriggerList = [].slice.call(
//   document.querySelectorAll('[data-bs-toggle="popover"]')
// );
// let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//   return new window.bootstrap.Popover(popoverTriggerEl);
// });

// // initialization of Tooltips
// let tooltipTriggerList = [].slice.call(
//   document.querySelectorAll('[data-bs-toggle="tooltip"]')
// );
// let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new window.bootstrap.Tooltip(tooltipTriggerEl);
// });

// // helper for adding on all elements multiple attributes
// function setAttributes(el, options) {
//   Object.keys(options).forEach(function (attr) {
//     el.setAttribute(attr, options[attr]);
//   });
// }

// // activate popovers
// popoverTriggerList = [].slice.call(
//   document.querySelectorAll('[data-toggle="popover"]')
// );
// popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//   return new window.bootstrap.Popover(popoverTriggerEl);
// });

// // activate tooltips
// tooltipTriggerList = [].slice.call(
//   document.querySelectorAll('[data-toggle="tooltip"]')
// );
// tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new window.bootstrap.Tooltip(tooltipTriggerEl);
// });

// Tabs navigation

let total = document.querySelectorAll(".nav-pills");

total.forEach(function (item, i) {
  let moving_div = document.createElement("div");
  let first_li = item.querySelector("li:first-child .nav-link");
  let tab = first_li.cloneNode();
  tab.innerHTML = "-";

  moving_div.classList.add("moving-tab", "position-absolute", "nav-link");
  moving_div.appendChild(tab);
  item.appendChild(moving_div);

  let list_length = item.getElementsByTagName("li").length;

  moving_div.style.padding = "0px";
  moving_div.style.width =
    item.querySelector("li:nth-child(1)").offsetWidth + "px";
  moving_div.style.transform = "translate3d(0px, 0px, 0px)";
  moving_div.style.transition = ".5s ease";

  item.onmouseover = function (event) {
    let target = getEventTarget(event);
    let li = target.closest("li"); // get reference
    if (li) {
      let nodes = Array.from(li.closest("ul").children); // get array
      let index = nodes.indexOf(li) + 1;
      item.querySelector("li:nth-child(" + index + ") .nav-link").onclick =
        function () {
          moving_div = item.querySelector(".moving-tab");
          let sum = 0;
          if (item.classList.contains("flex-column")) {
            for (let j = 1; j <= nodes.indexOf(li); j++) {
              sum += item.querySelector("li:nth-child(" + j + ")").offsetHeight;
            }
            moving_div.style.transform = "translate3d(0px," + sum + "px, 0px)";
            moving_div.style.height = item.querySelector(
              "li:nth-child(" + j + ")"
            ).offsetHeight;
          } else {
            for (let j = 1; j <= nodes.indexOf(li); j++) {
              sum += item.querySelector("li:nth-child(" + j + ")").offsetWidth;
            }
            moving_div.style.transform = "translate3d(" + sum + "px, 0px, 0px)";
            moving_div.style.width =
              item.querySelector("li:nth-child(" + index + ")").offsetWidth +
              "px";
          }
        };
    }
  };
});

// Tabs navigation resize

window.addEventListener("resize", function (event) {
  total.forEach(function (item, i) {
    item.querySelector(".moving-tab").remove();
    let moving_div = document.createElement("div");
    let tab = item.querySelector(".nav-link.active").cloneNode();
    tab.innerHTML = "-";

    moving_div.classList.add("moving-tab", "position-absolute", "nav-link");
    moving_div.appendChild(tab);

    item.appendChild(moving_div);

    moving_div.style.padding = "0px";
    moving_div.style.transition = ".5s ease";

    let li = item.querySelector(".nav-link.active").parentElement;

    if (li) {
      let nodes = Array.from(li.closest("ul").children); // get array
      let index = nodes.indexOf(li) + 1;

      let sum = 0;
      if (item.classList.contains("flex-column")) {
        for (let j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector("li:nth-child(" + j + ")").offsetHeight;
        }
        moving_div.style.transform = "translate3d(0px," + sum + "px, 0px)";
        moving_div.style.width =
          item.querySelector("li:nth-child(" + index + ")").offsetWidth + "px";
        moving_div.style.height = item.querySelector(
          "li:nth-child(" + j + ")"
        ).offsetHeight;
      } else {
        for (let j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector("li:nth-child(" + j + ")").offsetWidth;
        }
        moving_div.style.transform = "translate3d(" + sum + "px, 0px, 0px)";
        moving_div.style.width =
          item.querySelector("li:nth-child(" + index + ")").offsetWidth + "px";
      }
    }
  });

  if (window.innerWidth < 991) {
    total.forEach(function (item, i) {
      if (!item.classList.contains("flex-column")) {
        item.classList.add("flex-column", "on-resize");
      }
    });
  } else {
    total.forEach(function (item, i) {
      if (item.classList.contains("on-resize")) {
        item.classList.remove("flex-column", "on-resize");
      }
    });
  }
});

function getEventTarget(e) {
  return e.target || e.srcElement;
}

// End tabs navigation

document.addEventListener(
  "focus",
  function (e) {
    if (e.target.tagName === "INPUT") {
      e.target.parentElement.classList.add("is-focused");
    }
  },
  true
);

document.addEventListener("keyup", function (e) {
  if (e.target.tagName === "INPUT") {
    if (e.target.value != "") {
      e.target.parentElement.classList.add("is-filled");
    } else {
      e.target.parentElement.classList.remove("is-filled");
    }
  }
});

document.addEventListener(
  "focusout",
  function (e) {
    if (e.target.tagName === "INPUT") {
      if (e.target.value != "") {
        e.target.parentElement.classList.add("is-filled");
      }
      e.target.parentElement.classList.remove("is-focused");
    }
  },
  true
);

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    let targetEl = e.target;
    let rippleDiv = targetEl.querySelector(".ripple");

    rippleDiv = document.createElement("span");
    rippleDiv.classList.add("ripple");
    rippleDiv.style.width = rippleDiv.style.height =
      Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + "px";
    targetEl.appendChild(rippleDiv);

    rippleDiv.style.left = e.offsetX - rippleDiv.offsetWidth / 2 + "px";
    rippleDiv.style.top = e.offsetY - rippleDiv.offsetHeight / 2 + "px";
    rippleDiv.classList.add("ripple");
    setTimeout(function () {
      rippleDiv.parentElement.removeChild(rippleDiv);
    }, 600);
  }
});

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}
