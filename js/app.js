document.addEventListener('DOMContentLoaded', () => {
    const { createApp } = Vue;
    
    createApp({
        data() {
            return {
                animals: [
                    { name: 'Собака', baby: 'Щенок', matched: false, wrongAttempt: false },
                    { name: 'Кошка', baby: 'Котёнок', matched: false, wrongAttempt: false },
                    { name: 'Корова', baby: 'Телёнок', matched: false, wrongAttempt: false },
                    { name: 'Лошадь', baby: 'Жеребёнок', matched: false, wrongAttempt: false },
                    { name: 'Овца', baby: 'Ягнёнок', matched: false, wrongAttempt: false },
                    { name: 'Курица', baby: 'Цыплёнок', matched: false, wrongAttempt: false },
                    { name: 'Утка', baby: 'Утёнок', matched: false, wrongAttempt: false },
                    { name: 'Свинья', baby: 'Поросёнок', matched: false, wrongAttempt: false }
                ],
                babies: [],
                draggedAnimal: null,
                correctMatches: 0,
                totalPairs: 8,
                gameCompleted: false,
                errorMessage: ''
            };
        },
        computed: {
            shuffledBabies() {
                if (this.babies.length === 0) {
                    const babies = this.animals.map(a => ({
                        name: a.baby,
                        parent: a.name,
                        matched: false,
                        wrongAttempt: false
                    }));
                    return this.shuffleArray([...babies]);
                }
                return this.babies;
            }
        },
        methods: {
            getEmoji(name) {
                const emojis = {
                    'Собака': '🐶',
                    'Кошка': '🐱',
                    'Корова': '🐮',
                    'Лошадь': '🐴',
                    'Овца': '🐑',
                    'Курица': '🐔',
                    'Утка': '🦆',
                    'Свинья': '🐷',
                    'Щенок': '🐕',
                    'Котёнок': '🐈',
                    'Телёнок': '🐄',
                    'Жеребёнок': '🐎',
                    'Ягнёнок': '🐏',
                    'Цыплёнок': '🐤',
                    'Утёнок': '🦆',
                    'Поросёнок': '🐖'
                };
                return emojis[name] || '❓';
            },
            shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            },
            dragStart(event, animal) {
                if (animal.matched) {
                    event.preventDefault();
                    return;
                }
                this.draggedAnimal = animal;
                event.dataTransfer.setData('text/plain', animal.name);
                this.clearWrongAttempts();
            },
            clearWrongAttempts() {
                this.animals.forEach(a => a.wrongAttempt = false);
                this.babies.forEach(b => b.wrongAttempt = false);
                this.errorMessage = '';
            },
            drop(event, baby) {
                if (baby.matched) return;
                
                const animal = this.draggedAnimal;
                
                if (animal.baby === baby.name) {
                
                    animal.matched = true;
                    baby.matched = true;
                    this.correctMatches++;
                    this.errorMessage = '';
                    
                    
                    if (this.correctMatches === this.totalPairs) {
                        this.gameCompleted = true;
                    }
                } else {
                  
                    this.errorMessage = 'Ой-ой! Попробуй ещё раз!';
                    animal.wrongAttempt = true;
                    baby.wrongAttempt = true;
                    
                    setTimeout(() => {
                        animal.wrongAttempt = false;
                        baby.wrongAttempt = false;
                    }, 1000);
                }
                
                this.draggedAnimal = null;
            },
            resetGame() {
       
                this.animals.forEach(animal => {
                    animal.matched = false;
                    animal.wrongAttempt = false;
                });
                
                this.babies = [];
                this.correctMatches = 0;
                this.gameCompleted = false;
                this.errorMessage = '';
            }
        },
        created() {
            this.babies = this.shuffledBabies;
        }
    }).mount('#app');
});