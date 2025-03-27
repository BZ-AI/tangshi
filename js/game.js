// 游戏核心逻辑
import { questions } from './data/questions.js';
import { shareGame } from './share.js';
import audioManager from './audio.js';

class Game {
    constructor() {
        this.currentIndex = 0;
        this.score = 0;
        this.init();
    }

    init() {
        this.showQuestion();
        this.bindEvents();
    }

    showQuestion() {
        const question = questions[this.currentIndex];
        // 使用 HTML 模板渲染问题
        document.getElementById('question-container').innerHTML = this.getQuestionTemplate(question);
    }

    chooseOption(option) {
        audioManager.playSound('click');
        this.updateScore(option);
        this.showResult(questions[this.currentIndex], option);
    }

    updateScore(option) {
        // 根据选择更新分数
        this.score += option === questions[this.currentIndex].correctOption ? 10 : 0;
        document.getElementById('score').textContent = this.score;
    }

    // 其他游戏方法...
}

export default new Game(); 

// 在需要朗读诗词的地方调用
function readPoem() {
    const currentPoem = questions[currentQuestionIndex].poem;
    const poemText = currentPoem.content.join('，');
    audioManager.readPoem(poemText);
} 