// ===== PERFORMANCE OPTIMIZED PORTFOLIO SCRIPT =====

class PortfolioEngine {
  constructor() {
    this.init()
  }

  init() {
    this.setupCursor()
    this.setupTypingAnimation()
    this.setupScrollEffects()
    this.setupInteractions()
    this.setupPerformanceOptimizations()
  }

  // ===== CURSOR SYSTEM =====
  setupCursor() {
    const cursorDot = document.querySelector("[data-cursor-dot]")
    const cursorOutline = document.querySelector(".cursor-outline")
    const cursorTrail = document.querySelector(".cursor-trail")

    if (!cursorDot || !cursorOutline) return

    let mouseX = 0,
      mouseY = 0
    let outlineX = 0,
      outlineY = 0

    // Mouse movement handler with throttling
    const handleMouseMove = this.throttle((e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`

      if (cursorTrail) {
        cursorTrail.style.transform = `translate(${mouseX}px, ${mouseY}px)`
        cursorTrail.style.opacity = "1"
      }
    }, 16)

    // Smooth outline animation
    const animateOutline = () => {
      const dx = mouseX - outlineX
      const dy = mouseY - outlineY

      outlineX += dx * 0.15
      outlineY += dy * 0.15

      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`
      requestAnimationFrame(animateOutline)
    }

    // Hover effects
    const hoverElements = document.querySelectorAll("a, button, .btn, .social-link, .stat-item")

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform += " scale(2)"
        cursorOutline.style.transform += " scale(1.5)"
        cursorOutline.style.borderColor = "var(--primary-400)"
      })

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = cursorDot.style.transform.replace(" scale(2)", "")
        cursorOutline.style.transform = cursorOutline.style.transform.replace(" scale(1.5)", "")
        cursorOutline.style.borderColor = "var(--primary-400)"
      })
    })

    document.addEventListener("mousemove", handleMouseMove)
    animateOutline()

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
      cursorDot.style.opacity = "0"
      cursorOutline.style.opacity = "0"
      if (cursorTrail) cursorTrail.style.opacity = "0"
    })

    document.addEventListener("mouseenter", () => {
      cursorDot.style.opacity = "1"
      cursorOutline.style.opacity = "0.6"
    })
  }

  // ===== TYPING ANIMATION =====
  setupTypingAnimation() {
    const typingElement = document.querySelector(".typing-text")
    if (!typingElement) return

    const texts = [
      "Data Science Engineer",
      "AI Enthusiast",
      "Machine Learning Developer",
      "Statistical Analyst",
      "Innovation Driver",
    ]

    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typeSpeed = 100

    const typeText = () => {
      const currentText = texts[textIndex]

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
        typeSpeed = 50
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1)
        charIndex++
        typeSpeed = 100
      }

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        typeSpeed = 500
      }

      setTimeout(typeText, typeSpeed)
    }

    typeText()
  }

  // ===== SCROLL EFFECTS =====
  setupScrollEffects() {
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll(".neural-network, .geometric-shapes")

    const handleScroll = this.throttle(() => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5

      parallaxElements.forEach((el) => {
        el.style.transform = `translateY(${rate}px)`
      })
    }, 16)

    window.addEventListener("scroll", handleScroll)

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const animateElements = document.querySelectorAll(".profile-frame, .hero-text, .social-network")
    animateElements.forEach((el) => observer.observe(el))
  }

  // ===== INTERACTIONS =====
  setupInteractions() {
    // Ripple effect for buttons and links
    const rippleElements = document.querySelectorAll(".btn, .social-link")

    rippleElements.forEach((el) => {
      el.addEventListener("click", (e) => {
        const ripple = el.querySelector(".link-ripple") || this.createRipple(el)
        const rect = el.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
