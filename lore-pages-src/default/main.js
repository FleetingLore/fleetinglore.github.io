(function () {
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.head.appendChild(script);
    }

    loadScript('https://fleetinglore.github.io/lore-pages-src/default/styles.js');
    loadScript('https://fleetinglore.github.io/lore-pages-src/default/foldable.js');
})();