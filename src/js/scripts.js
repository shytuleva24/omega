window.addEventListener('load', () => {
    menuMobile();

    document.querySelectorAll('.animated').forEach(element => {
        createScrollListener(element, function () {
            element.classList.add(`fadeInDown`);
        }, function () {
            element.classList.remove(`fadeInDown`);
        }, 0.3);
    });
    
});
function menuMobile() {
    const iconMenu = document.querySelector('.menu-icon');
    const homeMenuLinks = document.querySelectorAll(".scroll-to");
    const menuBody = document.querySelector('.menu-body');
    
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
                event.preventDefault();
                onMenuLinkClick(this.getAttribute("href"));
            }
        });
    
        function onMenuLinkClick(href) {
            if (document.querySelector(href)) {
                const target = document.querySelector(href);
                let targetLocation = target.getBoundingClientRect().top + window.pageYOffset;
    
                if (iconMenu.classList.contains("open-menu")) {
                    document.body.classList.remove('lock');
                    iconMenu.classList.remove("open-menu");
                    menuBody.classList.remove("open-menu");
                }
                window.scrollTo({
                    top: targetLocation,
                    behavior: "smooth"
                });
            }
        }
    }
    
}

function createScrollListener(elementSelector, visibleCallback, hiddenCallback, threshold) {
    const element = elementSelector;

    function handleIntersection(entries) {
        if (entries[0].isIntersecting) {
            visibleCallback();
        } else {
            hiddenCallback();
        }
    }

    const options = {
        threshold: threshold || 0.5
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(element);
}

