
function generateDotsBtns(dots, embla) {
  var scrollSnaps = embla.scrollSnapList()
  var dotsFrag = document.createDocumentFragment()
  var dotsArray = scrollSnaps.map(function () {
    return document.createElement('button')
  })
  dotsArray.forEach(function (dotNode) {
    return dotsFrag.appendChild(dotNode)
  })
  dots.appendChild(dotsFrag)
  return dotsArray
}




function addPrevNextBtnClickListeners(prevBtn, nextBtn, embla) {
  prevBtn.addEventListener('click', embla.scrollPrev, false)
  nextBtn.addEventListener('click', embla.scrollNext, false)
}

function togglePrevAndNextBtns(prevBtn, nextBtn, embla) {
  return function () {
    if (embla.canScrollPrev()) {
      prevBtn.removeAttribute('disabled')
    } else {
      prevBtn.setAttribute('disabled', 'disabled')
    }
    if (embla.canScrollNext()) {
      nextBtn.removeAttribute('disabled')
    } else {
      nextBtn.setAttribute('disabled', 'disabled')
    }
  }
}

function setupEmblaCarousel(wrap, options) {
  var view = wrap.querySelector('.embla__viewport')
  var nextBtn = wrap.querySelector('.embla__nav--next')
  var prevBtn = wrap.querySelector('.embla__nav--prev')
  var embla = EmblaCarousel(view, options)
  var disablePrevAndNextBtns = togglePrevAndNextBtns(
    prevBtn,
    nextBtn,
    embla,
  )
  addPrevNextBtnClickListeners(prevBtn, nextBtn, embla)
  if (!options.loop) {
    embla.on('select', disablePrevAndNextBtns)
    embla.on('init', disablePrevAndNextBtns)
  }
  return embla
}

var optionsArray = [
  { loop: true }
]
setTimeout(function () {
  var emblas = document.querySelectorAll('.embla')
  var emblasArray = [].slice.call(emblas)
  var emblaInstances = emblasArray.map(function (e, i) {
    return setupEmblaCarousel(e, optionsArray[i])
  })
  var bodyClass = document.body.classList
  var userIsTabbing = false
  document.addEventListener('keyup', function (evt) {
    if (!userIsTabbing && evt.keyCode === 9) {
      bodyClass.add('user-is-tabbing')
      userIsTabbing = true
    }
  })
  document.addEventListener('mousedown', function () {
    bodyClass.remove('user-is-tabbing')
    userIsTabbing = false
  })
}, 100);


function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}