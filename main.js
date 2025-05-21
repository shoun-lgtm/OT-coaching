// メイン JavaScript ファイル

document.addEventListener('DOMContentLoaded', function () {
    // ローディングアニメーション
    setTimeout(function () {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function () {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // カスタムカーソル
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
        
        setTimeout(function () {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
            cursorFollower.style.opacity = '1';
        }, 100);
    });

    document.addEventListener('mouseout', function () {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    // クリック効果
    document.addEventListener('click', function () {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        
        setTimeout(function () {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
    });

    // リンクホバー効果
    const links = document.querySelectorAll('a, button, .pricing-card, .service-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', function () {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(217, 179, 100, 0.2)';
        });
        
        link.addEventListener('mouseleave', function () {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });

    // スクロール時のヘッダーアニメーション
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // スクロール要素のリビール
        revealOnScroll();
    });

    // ハンバーガーメニュー
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.querySelector('body');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('menu-active');
            mobileNav.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    // モバイルナビのリンククリック時にメニューを閉じる
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('menu-active');
            mobileNav.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });

    // FAQ アコーディオン
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function () {
            // 他のアコーディオンをすべて閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // 現在のアコーディオンを開閉する
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                const answerHeight = answer.scrollHeight;
                answer.style.maxHeight = answerHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // テスティモニアルスライダー
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // 初期スライド表示
    showSlide(currentSlide);
    
    // 次のスライド
    document.querySelector('.next-btn').addEventListener('click', function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
    
    // 前のスライド
    document.querySelector('.prev-btn').addEventListener('click', function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    // ドットクリック
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // 自動スライド
    setInterval(function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 6000);

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // カウントアップアニメーション
    function animateStats() {
        const statElements = document.querySelectorAll('.stat-number');
        
        statElements.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2秒間かけてアニメーション
            const steps = Math.abs(target) / 50; // アニメーションのステップ数
            let current = 0;
            const increment = target / steps;
            const interval = duration / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, interval);
        });
    }

    // スクロール時に要素を表示するアニメーション
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal-text, .reveal-element');
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
                
                // カウントアップアニメーション（一度だけ実行）
                if (element.querySelector('.stat-number') && !element.hasAttribute('data-animated')) {
                    animateStats();
                    element.setAttribute('data-animated', 'true');
                }
            }
        });
    }

    // コンタクトフォーム検証
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 簡易フォーム検証
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // 本番では実際にフォームを送信
                alert('お問い合わせありがとうございます。担当者より折り返しご連絡いたします。');
                contactForm.reset();
            } else {
                alert('必須項目をすべて入力してください。');
            }
        });
    }

    // 初期表示時のアニメーション
    setTimeout(function() {
        revealOnScroll();
    }, 2100); // ローディングアニメーションの直後
});

// パララックス効果
window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    const scrollValue = window.scrollY;
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollValue * 0.3}px)`;
    }
    
    // 背景のパララックス
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollValue > sectionTop - window.innerHeight && scrollValue < sectionTop + sectionHeight) {
            const bg = section.querySelector('.hero-bg');
            if (bg) {
                const speed = 0.2;
                bg.style.transform = `translateY(${(scrollValue - sectionTop) * speed}px)`;
            }
        }
    });
});
