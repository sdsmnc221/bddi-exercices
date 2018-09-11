// Prérequis pour le prompteur (pas d'importance pour le cours)

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// La fonction Game a terminer (ça se corse)

const WORD_LIST = ['chevre', 'vache']

class Game {
  constructor() {
    let letters = [], // letters entered by user
      lives = 5, // lives left
      word, // the current word
      missing // number of letters missing

    function init() {
      lives = 5

      // TODO: récupérer un mot random depuis WORD_LIST (1 ligne)
      word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
        letters = []
      // Count without duplicated letters
      missing = Array.prototype.filter.call(word, (letter, i) => {
        return word.indexOf(letter) == i
      }).length
    }

    function addLetter(letter) {
      // TODO: cette fonction doit :
      // - vérifier que la lettre n'a pas déjà été tentée auparavent
      // - si ce n'est pas le cas, l'ajouter dans le tableau `letters`
      // - modifier `lives` et `missing` en conséquence
      // - ne retourne rien
      // - (6 lignes)
      if (!letters.includes(letter)) {
        const matchingPlaces = word.match(letter)
        lives--
        // missing--
        missing -= matchingPlaces ? matchingPlaces.length : 0 
        letters.push(letter)
      }
    }

    function displayWord() {
      // TODO: cette fonction doit:
      // - retourner une chaine de caractère
      // - les lettres trouvées et celles manquantes remplacées par un underscore
      // - exemple : v_ch_e
      // - Utiliser une boucle for et la concaténation
      // - (9 lignes)
      let displayedWord = ''
      for (let i = 0; i < word.length; i++) {
        const currentLetter = word[i]
        displayedWord += letters.includes(currentLetter) ? currentLetter : '_'
      }
      return displayedWord
    }

    function prompt(cb) {
      console.log(Array(lives + 1).join('❤'))
      rl.question(displayWord() + '\r\n', cb)
    }

    function onAnswer(answer) {
      /* TODO: appeler la fonction addLetter 
          en envoyant la première lettre de `answer` 
          (1 ligne) 
      */
      addLetter(answer[0])
      if (missing > 0 && lives > 0) {
        prompt(onAnswer)
        console.log(`Missing letters: ${missing}`)
        console.log(`Lives left: ${lives}`)
        console.log(`Letters tried: ${letters.join(',')}`)
      }
      else {
        console.log(['End of the game.', 'you', missing > 0 ? 'lose' : 'win', '!'].join(' '))
        rl.close()
      }
    }

    return {
      play() {
        init()
        console.log('Vous êtes prêts ? Devinez le mot.')
        prompt(onAnswer)
      }
    }
  }
  play() { }
}

const game = new Game()

game.play()
