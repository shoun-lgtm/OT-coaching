// シンプルなアニメーション制御
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーのスクロール効果
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // フェードインアニメーションの制御
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-animation]');
        
        elements.forEach(function(element) {
            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (position < windowHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    }
    
    // スクロールイベントの監視
    window.addEventListener('scroll', animateOnScroll);
    
    // ページ読み込み時に実行
    setTimeout(animateOnScroll, 300);
    
    // メニューの開閉
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // アコーディオン機能
    const questions = document.querySelectorAll('.question');
    
    questions.forEach(function(question) {
        question.addEventListener('click', function() {
            const accordion = this.parentElement;
            accordion.classList.toggle('active');
        });
    });
    
    // お問い合わせフォーム
    const form = document.querySelector('.animated-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('お問い合わせありがとうございます。近日中にご連絡いたします。');
        });
    }
});

// ページ読み込み完了時にアニメーション開始
window.addEventListener('load', function() {
    // ヒーローセクションのアニメーション
    document.querySelector('.animated-title')?.classList.add('visible');
    document.querySelector('.animated-subtitle')?.classList.add('visible');
    document.querySelector('.cta-button')?.classList.add('visible');
    
    // 背景色のアニメーション
    const footer = document.querySelector('.animated-background');
    if (footer) {
        let hue = 200;
        
        function animateBackground() {
            hue = (hue + 0.1) % 360;
            footer.style.background = `linear-gradient(135deg, 
                hsl(${hue}, 50%, 40%) 0%, 
                hsl(${(hue + 60) % 360}, 50%, 50%) 100%)`;
            requestAnimationFrame(animateBackground);
        }
        
        animateBackground();
    }
});
