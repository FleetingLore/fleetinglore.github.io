document.addEventListener('click', function(e) {
    if (e.target.closest('.code-box')) {
        const codeBox = e.target.closest('.code-box');
        const codeElement = codeBox.querySelector('code');
        const codeText = codeElement.textContent;
        
        navigator.clipboard.writeText(codeText).then(() => {
            codeBox.classList.add('copied');
            setTimeout(() => {
                codeBox.classList.remove('copied');
            }, 2000);
        });
    }
});
