function sendMail(){
  let parms = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value   
  }
  emailjs.send('service_3ir25lx', 'template_zxr521q', parms).then(alert('Email sent successfully!'));
}

document.getElementById('themeToggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    this.textContent = 'Light Mode';
  } else {
    this.textContent = 'Dark Mode';
  }
});

const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.addEventListener('click', function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});


const RSS_URL = "https://www.google.com/alerts/feeds/11258460990315924617/10740595358276456277"; 

        async function fetchRSSFeed() {
            try {
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`);
                const data = await response.json();
                const parser = new DOMParser();
                const xml = parser.parseFromString(data.contents, "text/xml");
                const entries = xml.querySelectorAll("entry");

                let htmlContent = "";

                entries.forEach(entry => {
                    const title = entry.querySelector("title")?.textContent || "Sans titre";
                    const link = entry.querySelector("link")?.getAttribute("href") || "#";
                    const description = entry.querySelector("content")?.textContent || "Aucune description disponible.";

                    htmlContent += `
                        <div class="col-md-6 mb-3">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${description}</p>
                                    <a href="${link}" class="btn btn-primary" target="_blank">Lire l'article</a>
                                </div>
                            </div>
                        </div>`;
                });

                document.getElementById("alert-container").innerHTML = htmlContent;
            } catch (error) {
                console.error("Erreur lors du chargement du flux RSS :", error);
                document.getElementById("alert-container").innerHTML = "<p class='text-danger'>Erreur de chargement des alertes.</p>";
            }
        }

        // Charger les alertes RSS au chargement de la page
        fetchRSSFeed();