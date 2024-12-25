document.addEventListener("DOMContentLoaded", () => {
    const technologies = document.querySelectorAll(".technology");
    const body = document.body;
    let activeTechnology = null; 
    const mobileBreakpoint = 768;

    function isMobile() {
        return window.innerWidth < mobileBreakpoint;
    }

    technologies.forEach(technology => {
        technology.addEventListener("click", (event) => {
             event.stopPropagation();

            if (technology.classList.contains("active")) {
                technology.classList.remove("active");
                body.classList.remove("modal-active");
                activeTechnology = null;
            } else {
                technologies.forEach(tech => {
                    if (tech !== technology) {
                        tech.classList.remove("active");
                    }
                });
                technology.classList.add("active");
                body.classList.add("modal-active");
                activeTechnology = technology; 
            }
        });
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.technology')) {
            technologies.forEach(tech => {
                tech.classList.remove("active")
                body.classList.remove("modal-active");
                activeTechnology = null;
            });
        }
    });

    window.addEventListener('scroll', () => {
          if (isMobile() && activeTechnology) {
              activeTechnology.classList.remove("active");
              body.classList.remove("modal-active");
              activeTechnology = null;
          }
    });
});