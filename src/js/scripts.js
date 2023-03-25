window.addEventListener('load', () => {
    popup();
    menuAndSmoothScroll();
    animBlockInScroll();
});

function menuAndSmoothScroll() {
    const header = document.querySelector('.header');
    const iconMenu = document.querySelector('.menu-icon');
    const homeMenuLinks = document.querySelectorAll(".scroll-to");
    const menuBody = document.querySelector('.menu-body');

    let lastScrollTop = 0;

    function navMenuBackground() {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            header.classList.add("header-hidden");
        } else {
            header.classList.remove("header-hidden");
        }
        lastScrollTop = st <= 0 ? 0 : st;

    }

    window.addEventListener(`scroll`, navMenuBackground);

    if (iconMenu) {
        iconMenu.addEventListener("click", function (e) {
            document.body.classList.toggle('lock');
            iconMenu.classList.toggle("open-menu");
            menuBody.classList.toggle("open-menu");
        });

    }

    if (homeMenuLinks.length > 0) {
        homeMenuLinks.forEach(link => {
            link.onclick = function (event) {
                if (!link.hasAttribute('data-link')) {
                    event.preventDefault();
                    onMenuLinkClick(this.getAttribute("href"));
                }
            }
        });

        function onMenuLinkClick(href) {
            if (document.querySelector(href)) {
                const target = document.querySelector(href);
                let targetLocation = target.getBoundingClientRect().top + window.pageYOffset;

                if (!header.classList.contains("header-hidden") && targetLocation < window.pageYOffset) {
                    targetLocation = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
                }

                if (iconMenu.classList.contains("open-menu")) {
                    document.body.classList.remove('lock');
                    iconMenu.classList.remove("open-menu");
                    menuBody.classList.remove("open-menu");
                }
                // scrollToBlock(href);
                window.scrollTo({
                    top: targetLocation,
                    behavior: "smooth"
                });
            }
        }
    }
}
function popup() {
    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll(".lock-padding");
    let unlock = true;
    const timeout = 800;
    if (popupLinks.length) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener("click", function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            });
        }
    }

    const popupCloseIcon = document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener('click', function (e) {
                popupClose(el.closest('.popup'));
                e.preventDefault();
            });
        }
    }

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener("click", function (e) {
                if (!e.target.closest('.popup_content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock && popupActive) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('section').offsetWidth + 'px';
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');
        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);
        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }
    document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });
}

function animBlockInScroll() {
    const animItems = document.querySelectorAll(`.anim-items`);

    if (animItems.length > 0) {
        window.addEventListener(`scroll`, animOnScroll);
        window.addEventListener(`touchmove`, animOnScroll);
        window.addEventListener(`wheel`, animOnScroll);
        function animOnScroll() {
            animItems.forEach(element => {
                const animItem = element;
                const animItemHeight = animItem.offsetHeight;
                const animItemOffSet = offset(animItem).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                if ((window.pageYOffset > animItemOffSet - animItemPoint) && window.pageYOffset < (animItemOffSet + animItemHeight)) {
                    animItem.classList.add(`active-anim`);
                    console.log((window.pageYOffset > animItemOffSet - animItemPoint) && window.pageYOffset < (animItemOffSet + animItemHeight));
                } 
            });
        }

        function offset(el) {
            const rect = el.getBoundingClientRect();
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
        setTimeout(() => {
            animOnScroll();
        }, 300)
    }
}
