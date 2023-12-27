async function generateLinks(sectionId, filterObject) {
    return new Promise((resolve) => {
        const section = document.getElementById(sectionId);

        for (const key in filterObject) {
            if (filterObject.hasOwnProperty(key)) {
                const link = document.createElement("a");
                link.href = "javaScript:;";
                link.textContent = filterObject[key];
                link.classList.add("selecter_2_op");
                link.id = key;
                section.appendChild(link);
            }
        }

        resolve(); // Resolve the promise after creating links
    });
}

async function fetchData() {
    try {
        const response = await fetch('../homework/resources/filterRule.js');
        const data = await response.text();
        eval(data);

        // Generate links for the "区域" section
        await generateLinks("areaSection", area);

        // Generate links for the "版本" section
        await generateLinks("versionSection", verison);
    } catch (error) {
        console.error('Error fetching filterRule.js:', error);
    }
}

fetchData();
