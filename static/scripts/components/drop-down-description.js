document.addEventListener("DOMContentLoaded", () => {
    const technologies = document.querySelectorAll(".technology");

    technologies.forEach(technology => {
        technology.addEventListener("click", (event) => {

          if(technology.classList.contains("active")){
              technology.classList.remove("active");
          }
          else{
               technologies.forEach(tech =>{
                   if(tech !== technology){
                       tech.classList.remove("active");
                   }
               });
               technology.classList.add("active");
          }
        });

      document.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.closest('.technology')) {
                technologies.forEach(tech =>{
                     tech.classList.remove("active")
                });
            }
      });
    });
});