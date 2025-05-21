document.addEventListener('DOMContentLoaded', () => {
    // ナビゲーションメニューのトグル機能
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // スクロール時のヘッダースタイル変更
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // スクロールアニメーション制御
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初期チェック
    
    // アコーディオン機能
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const question = item.querySelector('.question');
        if (question) {
            question.addEventListener('click', () => {
                // 他のアコーディオンを閉じる
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // クリックされたアイテムの状態を切り替え
                item.classList.toggle('active');
            });
        }
    });
    
    // ナビゲーションリンクのスムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // モバイルメニューを閉じる
            if (menuToggle && navLinks) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // お問い合わせフォーム送信処理
    const contactForm = document.querySelector('.animated-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 実際のプロジェクトではここでデータ送信処理を実装
            // 現在はアラートで確認メッセージを表示
            alert(`${name}様、お問い合わせありがとうございます。\n24時間以内にご返信いたします。`);
            
            // フォームをリセット
            contactForm.reset();
        });
    }
    
    // フォーム入力フィールドのフォーカス効果
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            if (field.value === '') {
                field.parentElement.classList.remove('focused');
            }
        });
        
        // ページ読み込み時に値が入っている場合の処理
        if (field.value !== '') {
            field.parentElement.classList.add('focused');
        }
    });
    
    // プロフィール画像のホバーエフェクト
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.05)';
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1)';
        });
    }
    
    // 背景色のアニメーション
    const animatedBackground = document.querySelector('.animated-background');
    
    if (animatedBackground) {
        let hue = 200; // 初期色相値
        
        function animateBackground() {
            hue = (hue + 0.1) % 360;
            animatedBackground.style.background = `linear-gradient(135deg, 
                hsl(${hue}, 50%, 40%) 0%, 
                hsl(${(hue + 60) % 360}, 50%, 50%) 100%)`;
            requestAnimationFrame(animateBackground);
        }
        
        animateBackground();
    }
});
