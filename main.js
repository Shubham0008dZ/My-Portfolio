/* main.js */

// ================= THEME TOGGLE =================
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconSun = 'uil-sun'
const iconMoon = 'uil-moon'
const selectedTheme = localStorage.getItem('selected-theme')

const updateIcon = (isLight) => {
    const icon = themeButton.querySelector('i')
    if(isLight){
        icon.classList.remove(iconSun)
        icon.classList.add(iconMoon)
    } else {
        icon.classList.remove(iconMoon)
        icon.classList.add(iconSun)
    }
}

if (selectedTheme === 'light') {
  document.body.classList.add(lightTheme)
  updateIcon(true)
} else {
  document.body.classList.remove(lightTheme)
  updateIcon(false)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme)
    const isLight = document.body.classList.contains(lightTheme)
    updateIcon(isLight)
    localStorage.setItem('selected-theme', isLight ? 'light' : 'dark')
})


// ================= MOBILE MENU TOGGLE (NEW) =================
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle')

// Show Menu
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.toggle('show-menu')
    })
}

// Hide Menu when clicking any link
const navLink = document.querySelectorAll('.nav a')
const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


// ================= TABS LOGIC =================
const tabs = document.querySelectorAll('[data-tab]'),
      tabContents = document.querySelectorAll('[data-kind]')
const qualTitle = document.getElementById('qualTitle')
const qualSub = document.getElementById('qualSub')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const targetKind = tab.dataset.tab
        const targetContent = document.querySelector(`[data-kind="${targetKind}"]`)
        
        tabContents.forEach(tc => tc.style.display = 'none')
        targetContent.style.display = 'block'
        
        if(targetKind === 'work'){
            qualTitle.innerText = "Experience"
            qualSub.innerText = "My Professional Journey"
        } else {
            qualTitle.innerText = "Qualification"
            qualSub.innerText = "My Personal Journey"
        }

        tabs.forEach(t => t.classList.remove('active'))
        tab.classList.add('active')
    })
})


// ================= CV BUTTON LOGIC =================
const cvBtn = document.getElementById('heroCvBtn')
const cvModal = document.getElementById('cvModal')
const cvModalClose = document.getElementById('cvModalClose')

if(cvBtn && cvModal){
    cvBtn.addEventListener('click', () => {
        cvModal.classList.add('active')
    })
}

if(cvModalClose){
    cvModalClose.addEventListener('click', () => {
        cvModal.classList.remove('active')
    })
}


// ================= TIMELINE VIEW MORE LOGIC =================
const viewBtns = document.querySelectorAll('.timeline__more')

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.timeline__item')
        const kind = btn.closest('.timeline').dataset.kind
        const title = item.dataset.title, sub = item.dataset.sub, duration = item.dataset.duration, body = item.dataset.body
        const modalId = kind === 'education' ? 'eduModal' : 'workModal';
        
        document.getElementById(`${modalId}Title`).innerText = title
        document.getElementById(`${modalId}Meta`).innerText = `${sub} • ${duration}`
        document.getElementById(`${modalId}Body`).innerHTML = body
        
        if(kind === 'education'){
            const imagesStr = item.dataset.images || ""
            const imagesContainer = document.getElementById('eduModalImages')
            imagesContainer.innerHTML = ""

            if(imagesStr){
                const list = imagesStr.split(';').filter(s=>s.trim())
                list.forEach(entry => {
                    const [label, url] = entry.split('|')
                    if(label && url){
                        const a = document.createElement('a')
                        a.className = "modal-doc-link"; a.target = "_blank";
                        const params = new URLSearchParams({title, docName: label.trim(), subtitle: sub, duration, img: url.trim()})
                        a.href = `result.html?${params.toString()}`
                        a.innerHTML = `<i class="uil uil-file-alt"></i> ${label.trim()}`
                        imagesContainer.appendChild(a)
                    }
                })
            } else {
                 imagesContainer.innerHTML = "<p class='small muted'>No documents attached.</p>"
            }
        }
        openModal(modalId)
    })
})


// ================= MODAL HELPERS =================
function openModal(modalId){
    const modal = document.getElementById(modalId)
    if(modal) modal.classList.add('active')
}

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay')
        if(modal) modal.classList.remove('active')
    })
})

document.getElementById('heroContactBtn').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'})
})


// ================= CONTACT FORM =================
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm('service_3xc1idj', 'template_xapvluo', '#contact-form', 'kBbE_NuFi3OaB4RfE')
        .then(() => {
            contactMessage.textContent = 'Message sent successfully ✅'
            setTimeout(() => { contactMessage.textContent = '' }, 5000)
            contactForm.reset()
        }, () => {
            contactMessage.textContent = 'Message not sent (service error) ❌'
        })
}
contactForm.addEventListener('submit', sendEmail)


// ================= FOOTER YEAR & SCROLL ACTIVE LINK =================
document.getElementById('year').innerText = new Date().getFullYear()
const sections = document.querySelectorAll('section[id]')
function scrollActive(){
    const scrollY = window.pageYOffset
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight, sectionTop = current.offsetTop - 58, sectionId = current.getAttribute('id')
        const navLink = document.querySelector('.nav a[href*=' + sectionId + ']')
        if(navLink) {
             if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){ navLink.classList.add('active-link') }
             else { navLink.classList.remove('active-link') }
        }
    })
}
window.addEventListener('scroll', scrollActive)

// ================= SERVICE CARD TOGGLE (Show/Hide) =================
const serviceBtns = document.querySelectorAll('.service-card__toggle')
serviceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const body = btn.nextElementSibling;
        body.classList.toggle('show');
        if(body.classList.contains('show')){
            btn.innerHTML = 'View Less <i class="uil uil-angle-up"></i>'
        } else {
            btn.innerHTML = 'View More <i class="uil uil-arrow-right"></i>'
        }
    })
})

// ================= UPDATED TYPING ANIMATION =================
document.addEventListener('DOMContentLoaded', function() {
    const typingTextElement = document.querySelector('.typing-text');
    if (!typingTextElement) return;

    // "Consultant - " static hai, ye words uske aage type honge
    const words = ["Technical Support (A2) ", "Implementation ", "Maintenance "];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const displayedText = isDeleting 
            ? currentWord.substring(0, charIndex--) 
            : currentWord.substring(0, charIndex++);

        typingTextElement.textContent = displayedText;

        // FASTER typing speed
        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 300;
        }
        setTimeout(type, typeSpeed);
    }
    type(); 
});
