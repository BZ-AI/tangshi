// 音频管理类
export class AudioManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.isPlaying = false;
        
        // 音效配置
        this.sounds = {
            click: new Audio('/sounds/click.mp3'),
            success: new Audio('/sounds/success.mp3'),
            complete: new Audio('/sounds/complete.mp3')
        };
        
        // 设置语音参数
        this.voiceSettings = {
            lang: 'zh-CN',
            pitch: 1,
            rate: 0.8,
            volume: 1
        };
    }

    // 朗读诗词
    readPoem(poemText) {
        if (this.isPlaying) {
            this.stop();
        }

        try {
            const utterThis = new SpeechSynthesisUtterance(poemText);
            Object.assign(utterThis, this.voiceSettings);

            // 获取中文语音
            const voices = this.synth.getVoices();
            const chineseVoice = voices.find(voice => voice.lang.includes('zh'));
            if (chineseVoice) {
                utterThis.voice = chineseVoice;
            }

            // 朗读开始和结束的处理
            utterThis.onstart = () => {
                this.isPlaying = true;
                this.updateReadButton(true);
            };

            utterThis.onend = () => {
                this.isPlaying = false;
                this.updateReadButton(false);
            };

            this.synth.speak(utterThis);
        } catch (error) {
            console.error('朗读失败:', error);
            alert('抱歉，朗读功能暂时不可用');
        }
    }

    // 停止朗读
    stop() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        this.isPlaying = false;
        this.updateReadButton(false);
    }

    // 播放音效
    playSound(type) {
        const sound = this.sounds[type];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.warn('音效播放失败:', error);
            });
        }
    }

    // 更新朗读按钮状态
    updateReadButton(isPlaying) {
        const readButton = document.querySelector('.read-btn');
        if (readButton) {
            readButton.textContent = isPlaying ? '停止朗读' : '朗读诗词';
            readButton.classList.toggle('playing', isPlaying);
        }
    }

    // 初始化音频设置
    init() {
        // 预加载音效
        Object.values(this.sounds).forEach(sound => {
            sound.load();
        });

        // 等待语音列表加载
        if (this.synth.getVoices().length === 0) {
            this.synth.addEventListener('voiceschanged', () => {
                console.log('语音列表已加载');
            });
        }
    }
}

// 创建并导出音频管理器实例
const audioManager = new AudioManager();
audioManager.init();
export default audioManager; 