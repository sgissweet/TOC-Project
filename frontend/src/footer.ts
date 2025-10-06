export function createFooter() {
    const footer = document.createElement("footer");
    footer.className = "footerBox";

    const exportcsv = document.createElement("button");
    exportcsv.id = "exportcsv";
    exportcsv.textContent = "export .csv";
    exportcsv.disabled = true;

    exportcsv.addEventListener("click", async () => {

        const response = await fetch("https://backend-toc-c7i6.onrender.com/download-csv");
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "series_titles.csv";
        link.click();

        URL.revokeObjectURL(url);
    });

    const linkdiv = document.createElement("div");  
    const sourcecode = document.createElement("a");
    sourcecode.textContent = "source code";    
    sourcecode.href = "https://github.com/17punchisama/TOC-Project.git";
    const presentation = document.createElement("a");
    presentation.textContent = "นำเสนอ";
    presentation.href = "https://youtu.be/s6Xpro2PT4o?si=pBtgxcdr3DyRlYxf";
    const members = document.createElement("a");
    members.textContent = "สมาชิกกลุ่ม";
    members.href = "members.html";
    const ref = document.createElement("a");
    ref.textContent = "อ้างอิง";   
    ref.href = "https://yflix.me/";
    linkdiv.appendChild(sourcecode);
    linkdiv.appendChild(presentation);
    linkdiv.appendChild(members);
    linkdiv.appendChild(ref);

    footer.appendChild(exportcsv);
    footer.appendChild(linkdiv);

    document.body.appendChild(footer);
}