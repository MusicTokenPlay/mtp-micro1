window.modalContents = {
    piano: `
    <div class="piano-container">
        <h3 class="to"><img src="img/n5.png" class="coin-icon" alt="coin">1000</h3>
        <ul class="social-list">
            <li><a href="https://t.me/+9n_dfdZ2Uuo5YTk0" target="_blank" onclick="rewardForSocialLink()">Telegram</a></li>
            <li><a href="https://youtube.com/@SpaceMTP-z3x" target="_blank" onclick="rewardForSocialLink()">YouTube</a></li>
            <li><a href="https://x.com/MusicTokenPlay" target="_blank" onclick="rewardForSocialLink()">Twitter</a></li>
            <li><a href="https://www.facebook.com/share/nW87agqn7PG93ygv/" target="_blank" onclick="rewardForSocialLink()">Facebook</a></li>
        </ul>
    </div>
    `,
    disk: `
    <div class="record-modal-container">
    <div class="result-container" id="result">
        <img id="result-icon" src="img/n1.png" alt="fat11">
        <span id="result-text">0</span>
    </div>
    <div class="record-container">
        <div class="record" id="record"></div>
    </div>
    <div class="control-buttons">
        <button id="start-btn">Go</button>
        <button id="stop-btn">Stop</button>
    </div>
</div>
    `,
    flip: `
    <div class="gamez-container">
        <div class="win-container" id="flip-win">
            <img src="img/n5.png" class="coin-icon" alt="coin" id="ms1-win-icon" style="display: none;"> 
            <span id="ms1-win-amount" style="display: none;">0</span>
            <img src="img/n1.png" class="coin-icon" alt="coin" id="ms2-win-icon" style="display: none;"> 
            <span id="ms2-win-amount" style="display: none;">0</span>
        </div>
        <div class="memory-game"></div>
        <div class="cost-container">
            <img src="img/n5.png" class="coin-icon" alt="coin">500
        </div>
    </div>
    `
};

function rewardForSocialLink() {
    const ms1Counter = document.getElementById('ms1-counter');
    let ms1Value = parseInt(ms1Counter.textContent);
    ms1Value += 1000;
    ms1Counter.textContent = ms1Value;
    saveCurrencyProgress();
}
