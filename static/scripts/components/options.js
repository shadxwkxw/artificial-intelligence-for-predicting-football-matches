document.addEventListener("DOMContentLoaded", () => {
    const customSelect = document.querySelector(".custom-select");
    const selectItem = document.querySelector(".select-item");
    const optionsContainer = document.querySelector(".options-container");

    const teamData = [
        { id: 1, name: "1 – Arsenal" },
        { id: 2, name: "2 – Aston Villa" },
        { id: 3, name: "3 – Bournemouth" },
        { id: 4, name: "4 – Brentford" },
        { id: 5, name: "5 – Brighton" },
        { id: 6, name: "6 – Burnley" },
        { id: 7, name: "7 – Chelsea" },
        { id: 8, name: "8 – Crystal Palace" },
        { id: 9, name: "9 – Everton" },
        { id: 10, name: "10 – Fulham" },
        { id: 11, name: "11 – Ipswich" },
        { id: 12, name: "12 – Leeds" },
        { id: 13, name: "13 – Leicester" },
        { id: 14, name: "14 – Liverpool" },
        { id: 15, name: "15 – Luton" },
        { id: 16, name: "16 – Man City" },
        { id: 17, name: "17 – Man United" },
        { id: 18, name: "18 – Newcastle" },
        { id: 19, name: "19 – Norwich" },
        { id: 20, name: "20 – Nott'm Forest" },
        { id: 21, name: "21 – Sheffield United" },
        { id: 22, name: "22 – Southampton" },
        { id: 23, name: "23 – Tottenham" },
        { id: 24, name: "24 – Watford" },
        { id: 25, name: "25 – West Brom" },
        { id: 26, name: "26 – West Ham" },
        { id: 27, name: "27 – Wolves" },
    ];

    teamData.forEach((team) => {
        const option = document.createElement("div");
        option.classList.add("option");
        option.textContent = team.name;
        option.dataset.value = team.id;

        option.addEventListener("click", () => {
            selectItem.textContent = team.name;
            optionsContainer.classList.remove("open");
            customSelect.classList.remove("open");
        });

        optionsContainer.appendChild(option);
    });

    customSelect.addEventListener("click", () => {
        optionsContainer.classList.toggle("open");
        customSelect.classList.toggle("open");
      
        if (optionsContainer.classList.contains("open")) {
            optionsContainer.style.display = 'block';
            setTimeout(() => {
                optionsContainer.style.opacity = '1';
            }, 10);
        } else {
            optionsContainer.style.opacity = '0';
            setTimeout(() => {
                optionsContainer.style.display = 'none';
            }, 300);
        }
    });
});